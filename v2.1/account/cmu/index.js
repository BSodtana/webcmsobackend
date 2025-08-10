const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const prisma = require('../../prisma')
// CMU OAuth Callback Route
router.get('/:cmuTokenString/:optionalParams?',async (req, res) => {
    console.log("Received request for CMU OAuth callback with params:", req.params);
    const cmuAccessToken = req.params.cmuTokenString;
    const optionalParams = req.params.optionalParams;

    // Retrieve the stored redirect URL from the session.
    const frontendRedirectUrlAfterAuth = process.env.FRONTEND_URL;

    // Clear the redirect info from the session immediately after retrieval
    console.log("Intended Frontend Redirect URL:", frontendRedirectUrlAfterAuth);
    console.log("Received CMU Access Token:", cmuAccessToken);

    if (!cmuAccessToken) {
        return res.status(400).json({ success: false, message: 'Bad Request: CMU token missing.' });
    }

    try {
        // 1. Fetch student data from CMU's basicinfo API using the received token.
        const cmuBasicInfoUrl = `https://w3.med.cmu.ac.th/cmuoauth/v2/basicinfo?token=${cmuAccessToken}&api=1`;
        const cmuResponse = await axios.get(cmuBasicInfoUrl);
        const cmuStudentData = cmuResponse.data;

        const studentIdFromCmu = cmuStudentData.student_id;
        const cmuEmail = cmuStudentData.cmuitaccount || null;
        const firstnameTH = cmuStudentData.firstname_TH || null;
        const lastnameTH = cmuStudentData.lastname_TH || null;

        if (!studentIdFromCmu) {
            console.error('CMU Basic Info: Student ID not found in response:', cmuStudentData);
            return res.status(500).json({ success: false, message: 'CMU Student ID not found in basic info response.' });
        }

        let user;
        let userUuid;

        // Check if this CMU account is already linked to any user
        const existingExternalAuth = await prisma.user_external_auth.findUnique({
            where: {
                provider_external_user_id: {
                    provider: 'cmu',
                    external_user_id: studentIdFromCmu,
                },
            },
        });
        console.log(`Found existing external auth for CMU user ID ${studentIdFromCmu}:`, existingExternalAuth);

        if (existingExternalAuth) {
            // Case 1: CMU account is already linked.
            userUuid = existingExternalAuth.user_uuid;
            console.log(`Existing CMU account linked to user_uuid: ${userUuid}. Updating token.`);

            // Update the access token
            await prisma.user_external_auth.update({
                where: {
                    id: existingExternalAuth.id,
                },
                data: {
                    access_token: cmuAccessToken,
                },
            });

            // Fetch the core account data for JWT generation
            const existingAccountAuth = await prisma.accountauthendata.findUnique({
                where: { uuid: userUuid },
                select: { uuid: true, email: true, user_role: true, displayName: true },
            });

            if (!existingAccountAuth) {
                throw new Error("Linked accountauthendata record not found for existing external auth.");
            }
            user = { ...existingAccountAuth, id: userUuid, student_id_fk: studentIdFromCmu };

        } else {
            // CMU account not linked. Check if an account with this email exists.
            let existingAccountAuth = null;
            if (cmuEmail) {
                existingAccountAuth = await prisma.accountauthendata.findUnique({
                    where: { email: cmuEmail },
                    select: { uuid: true, email: true, user_role: true, displayName: true },
                });
            }

            if (existingAccountAuth) {
                // Existing user found by email, link CMU account to it.
                userUuid = existingAccountAuth.uuid;
                console.log(`Linking CMU account (ID: ${studentIdFromCmu}) to existing user (UUID: ${userUuid}) by email.`);

                await prisma.user_external_auth.create({
                    data: {
                        id: uuidv4(),
                        user_uuid: userUuid,
                        provider: 'cmu',
                        external_user_id: studentIdFromCmu,
                        access_token: cmuAccessToken,
                    },
                });
                user = { ...existingAccountAuth, id: userUuid, student_id_fk: studentIdFromCmu };
            } else {
                // No existing user. Create a new user.
                userUuid = uuidv4();
                console.log(`Creating new user (UUID: ${userUuid}) from CMU Auth (ID: ${studentIdFromCmu}).`);

                const defaultUserRole = 'student';
                const defaultDisplayName = `CMU User ${studentIdFromCmu}`;

                // Upsert CmuStudentData
                const cmuStudentPayload = {
                    official_cmu_mail: cmuEmail,
                    official_firstNameTH: firstnameTH,
                    official_lastNameTH: lastnameTH,
                    currentYear: 0, // Default value
                };
                await prisma.cmuStudentData.upsert({
                    where: { studentID: studentIdFromCmu },
                    update: cmuStudentPayload,
                    create: {
                        studentID: studentIdFromCmu,
                        ...cmuStudentPayload,
                    },
                });

                // Create new user account
                const newUser = await prisma.accountauthendata.create({
                    data: {
                        uuid: userUuid,
                        email: cmuEmail,
                        cmu_mail: cmuEmail,
                        displayName: defaultDisplayName,
                        isActivated: true,
                        lastUpdatedByUUID: 'cmu-oauth',
                        user_role: defaultUserRole,
                        student_id_fk: studentIdFromCmu,
                        user_external_auth: {
                            create: {
                                id: uuidv4(),
                                provider: 'cmu',
                                external_user_id: studentIdFromCmu,
                                access_token: cmuAccessToken,
                            },
                        },
                    },
                    select: { uuid: true, email: true, user_role: true, displayName: true },
                });

                user = { ...newUser, id: userUuid, student_id_fk: studentIdFromCmu };
            }
        }

        // 3. Generate a JWT token.
        console.log(`Generating JWT for user UUID: ${user.id}`);
        const jwtToken = await generateToken(user.id); // Assuming generateToken is defined elsewhere
        console.log(`Generated JWT for user ${user.id}:`, jwtToken);

        // 4. Redirect to frontend with token.
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${jwtToken}`;
        res.redirect(redirectUrl);

    } catch (error) {
        console.error('Error during CMU OAuth callback process:', error);
        const errorMessage = error.response ? `CMU API Error: ${error.response.data.message || 'Unknown CMU API error'}` : 'Internal server error during CMU OAuth callback.';
        const errorStatus = error.response ? error.response.status : 500;
        res.status(errorStatus).json({ success: false, message: errorMessage, details: error.message });
    } finally {
        await prisma.$disconnect();
    }
});
module.exports = router;