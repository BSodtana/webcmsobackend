// src/api/students/studentServices.js (or your path: /usr/src/app/v2.1/manage/account/users/studentServices.js)
require('dotenv').config();
const prisma = require('../../../prisma');

const ITEMS_PER_PAGE = 25;

/**
 * @desc Get a paginated list of students
 */
const listStudents = async (filters = {}, page = 1) => {

    const { year, studentID } = filters;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    let whereClause = {};
    if (year) {
        whereClause.currentYear = parseInt(year);
    }
    if (studentID) {
        whereClause.studentID = {
            contains: studentID
        };
    }

    return await prisma.users.findMany({
        where: whereClause,
        skip: skip,
        take: ITEMS_PER_PAGE,
        orderBy: {
            studentID: 'asc',
        },
        select: {
            studentID: true,
            titleTH: true,
            firstNameTH: true,
            lastNameTH: true,
            nickNameTH: true,
            currentYear: true,
            usercredentials: {
                select: {
                    uuid: true,
                    email: true,
                    role: true,
                    emailVerified: true
                }
            }
        }
    });
};

/**
 * @desc Create a new student record along with credentials.
 */
const createStudent = async (studentData) => {
    const {
        studentID, titleTH, firstNameTH, lastNameTH, nickNameTH,
        titleEN, firstNameEN, lastNameEN, currentYear, admissionCategory,
        phoneNumber, lineID, facebook, instagram, medicalCondition, allergy, specialNeed,
        email,     // For usercredentials table
        password,  // Plain text password, MUST be hashed before storing
        role       // For usercredentials table (e.g., "USER")
    } = studentData;

    if (!studentID || !firstNameTH || !lastNameTH || !email || !password) {
        console.error('[createStudent Validation Fail] Missing fields:', { studentID, firstNameTH, lastNameTH, email_exists: !!email, password_exists: !!password });
        throw { code: 'VALIDATION_ERROR', desc: 'Service: Missing required fields (studentID, firstNameTH, lastNameTH, email, password).' };
    }

    // IMPORTANT: Hash the password here using your hashing utility (e.g., bcrypt)
    // const hashedPassword = await yourHashFunction(password);

    return prisma.$transaction(async (tx) => {
        const newUser = await tx.users.create({
            data: {
                studentID,
                titleTH, firstNameTH, lastNameTH, nickNameTH,
                titleEN, firstNameEN, lastNameEN,
                currentYear: currentYear ? parseInt(currentYear) : null,
                admissionCategory, phoneNumber, lineID, facebook, instagram,
                medicalCondition, allergy, specialNeed,
                // createdDateTime and updatedDateTime have @default(now())
            },
        });

        // In your schema, usercredentials has studentID as @id and uuid as @unique.
        // Let's assume uuid should also be unique and related to studentID.
        // For simplicity, generating a basic uuid based on studentID. Consider a proper UUID library.
        const generatedUuid = `${studentID}-${Date.now()}`;

        await tx.usercredentials.create({ // Model name is lowercase 'usercredentials'
            data: {
                studentID: newUser.studentID,        // This is the @id field in usercredentials
                uuid: generatedUuid,                 // This is a @unique field
                email: email,
                hashPassword: password,              // STORE THE HASHED PASSWORD
                role: role ? role.toUpperCase() : 'USER', // Ensure role matches enum, e.g., usercredentials_role.USER
                emailVerified: 0
            }
        });
        // Return only relevant user data, not sensitive credential info
        const { hashPassword, ...safeUserCredentials } = newUser.usercredentials || {};
        return { ...newUser, usercredentials: safeUserCredentials };
    });
};

/**
 * @desc Get a specific student's personal data by their unique studentID.
 */
const getStudentById = async (studentIDParam) => {
    return prisma.users.findUnique({
        where: { studentID: studentIDParam },
        select: {
            studentID: true, titleTH: true, firstNameTH: true, lastNameTH: true,
            nickNameTH: true, titleEN: true, firstNameEN: true, lastNameEN: true,
            currentYear: true, admissionCategory: true, phoneNumber: true,
            lineID: true, facebook: true, instagram: true,
            medicalCondition: true, allergy: true, specialNeed: true,
            createdDateTime: true, updatedDateTime: true,
            usercredentials: { // Relation name from your 'users' model
                select: {
                    uuid: true, // uuid is unique in usercredentials
                    email: true,
                    role: true,
                    emailVerified: true
                }
            },
            useraffiliation: { // Relation name from your 'users' model
                select: {
                    affiliationID: true,
                    affiliationType: true, // Matches useraffiliation_affiliationType enum
                    organizations: { // Matches relation name in 'useraffiliation' model
                        select: {
                            orgID: true,
                            orgName: true
                        }
                    }
                }
            }
        }
    });
};

/**
 * @desc Update a specific student's personal data.
 */
const updateStudent = async (studentIDParam, updateData) => {
    const { email, role, ...userTableFields } = updateData;

    return prisma.$transaction(async (tx) => {
        let updatedUserFromDb;
        if (Object.keys(userTableFields).length > 0) {
            if (userTableFields.currentYear !== undefined) {
                userTableFields.currentYear = userTableFields.currentYear === null ? null : parseInt(userTableFields.currentYear);
            }
            updatedUserFromDb = await tx.users.update({
                where: { studentID: studentIDParam },
                data: {
                    ...userTableFields,
                    updatedDateTime: new Date(),
                },
            });
        } else {
            updatedUserFromDb = await tx.users.findUnique({ where: { studentID: studentIDParam } });
        }

        if (email || role) {
            const credentialsUpdateData = {};
            if (email) credentialsUpdateData.email = email;
            if (role) credentialsUpdateData.role = role.toUpperCase(); // Ensure matches enum

            if (Object.keys(credentialsUpdateData).length > 0) {
                await tx.usercredentials.update({
                    where: { studentID: studentIDParam }, // studentID is the @id in usercredentials
                    data: credentialsUpdateData,
                });
            }
        }
        // Refetch to include relations if needed, or structure the return
        return tx.users.findUnique({
            where: { studentID: studentIDParam },
            select: { // Select desired fields for the response
                studentID: true, firstNameTH: true, lastNameTH: true, currentYear: true,
                usercredentials: { select: { email: true, role: true } }
            }
        });
    });
};

/**
 * @desc Delete a student's data.
 */
const deleteStudent = async (studentIDParam) => {
    // onDelete: Cascade in usercredentials model for 'users' relation will handle dependent record
    // and in useraffiliation for 'users' relation
    return prisma.users.delete({
        where: { studentID: studentIDParam },
    });
};

/**
 * @desc Get organizations a student is affiliated with.
 */
const getStudentAffiliations = async (studentIDParam) => {
    return prisma.useraffiliation.findMany({ // model name 'useraffiliation'
        where: { studentID: studentIDParam },
        select: {
            affiliationID: true,
            affiliationType: true, // This will be of type useraffiliation_affiliationType
            organizations: { // relation field in 'useraffiliation' model that points to 'organizations' model
                select: {
                    orgID: true,
                    orgName: true,
                }
            }
        }
    });
};

/**
 * @desc Assign a student to an organization.
 */
const assignStudentToOrg = async (studentIDParam, orgIDParam, affiliationTypeParam) => {
    const student = await prisma.users.findUnique({ where: { studentID: studentIDParam } });
    if (!student) throw { code: 'STUDENT_NOT_FOUND', desc: `Student ${studentIDParam} not found.` };

    const organization = await prisma.organizations.findUnique({ where: { orgID: orgIDParam } });
    if (!organization) throw { code: 'ORG_NOT_FOUND', desc: `Organization ${orgIDParam} not found.` };

    const affiliationID = `${orgIDParam}-${studentIDParam}-${Date.now()}`; // Simple unique ID

    return prisma.useraffiliation.create({
        data: {
            affiliationID: affiliationID,
            studentID: studentIDParam,
            affiliatedOrg: orgIDParam, // Field name in useraffiliation model
            affiliationType: affiliationTypeParam.toUpperCase(), // Ensure matches enum useraffiliation_affiliationType
        },
        include: { // To return details of the created affiliation
            organizations: true, // Include the organization details
            users: { // Include some user details
                select: { studentID: true, firstNameTH: true, lastNameTH: true }
            }
        }
    });
};

/**
 * @desc Remove a student's affiliation from an organization by affiliationID.
 */
const removeStudentFromOrg = async (studentIDParam_unused, orgIDParam_unused, affiliationIDParam) => {
    // Primary way to delete should be by the affiliationID, which is unique.
    if (!affiliationIDParam) {
        throw { code: 'MISSING_PARAMETER', desc: 'affiliationID is required to remove an affiliation.' };
    }
    return prisma.useraffiliation.delete({
        where: { affiliationID: affiliationIDParam }
    });
};

module.exports = {
    listStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentAffiliations,
    assignStudentToOrg,
    removeStudentFromOrg,
};