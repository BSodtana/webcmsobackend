// src/api/students/studentControllers.js
const studentServices = require('./studentServices'); // Ensure this path is correct

// Removed: const { errorCodeToResponse } = require('../../../_helpers/errorCodeToResponse');
// Removed: const { successCodeToResponse } = require('../../../_helpers/successCodeToResponse');

const listStudentsController = async (req, res) => {
    try {
        const { year, studentID, page = 1 } = req.query;
        const filters = {};
        if (year) filters.year = year;
        if (studentID) filters.studentID = studentID;

        console.log('Controller: listStudents with filters:', filters, 'page:', page);
        const students = await studentServices.listStudents(filters, parseInt(page));
        // Direct JSON response for success
        res.status(200).json({
            success: true,
            code: 'LIST_STUDENTS_SUCCESS',
            message: 'Successfully retrieved student list.',
            data: students
        });
    } catch (error) {
        console.error('listStudentsController Error:', error);
        // Direct JSON response for error
        res.status(500).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: error.message || 'Failed to list students.',
                description: error.desc 
            }
        });
    }
};

const createStudentController = async (req, res) => {
    try {
        const studentData = req.body;
        console.log('Controller: createStudent with data:', studentData);
        const newStudent = await studentServices.createStudent(studentData);
        res.status(201).json({
            success: true,
            code: 'CREATE_STUDENT_SUCCESS',
            message: 'Successfully created new student.',
            data: newStudent
        });
    } catch (error) {
        console.error('createStudentController Error:', error);
        const statusCode = error.code === 'VALIDATION_ERROR' ? 400 : (error.code === 'P2002' ? 409 : 500);
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: error.message || 'Failed to create student.',
                description: error.desc
            }
        });
    }
};

const getStudentController = async (req, res) => {
    try {
        const { studentID } = req.params;
        console.log('Controller: getStudent with studentID:', studentID);
        const student = await studentServices.getStudentById(studentID);
        if (!student) {
            return res.status(404).json({
                success: false,
                code: 'STUDENT_NOT_FOUND',
                error: { message: `Student with ID ${studentID} not found.` }
            });
        }
        res.status(200).json({
            success: true,
            code: 'GET_STUDENT_SUCCESS',
            message: 'Successfully retrieved student details.',
            data: student
        });
    } catch (error) {
        console.error('getStudentController Error:', error);
        res.status(500).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: error.message || 'Failed to retrieve student.',
                description: error.desc
            }
        });
    }
};

const updateStudentController = async (req, res) => {
    try {
        const { studentID } = req.params;
        const updateData = req.body;
        console.log('Controller: updateStudent:', studentID, 'with data:', updateData);
        const updatedStudent = await studentServices.updateStudent(studentID, updateData);
        res.status(200).json({
            success: true,
            code: 'UPDATE_STUDENT_SUCCESS',
            message: 'Successfully updated student details.',
            data: updatedStudent
        });
    } catch (error) {
        console.error('updateStudentController Error:', error);
        let statusCode = 500;
        let errorMessage = error.message || 'Failed to update student.';
        if (error.code === 'P2025') {
            statusCode = 404;
            errorMessage = `Student with ID ${req.params.studentID} not found for update.`;
        } else if (error.code === 'VALIDATION_ERROR') {
            statusCode = 400;
        } else if (error.code === 'P2002') {
             statusCode = 409;
             errorMessage = `Update failed due to unique constraint violation (e.g., email already exists). Details: ${error.message}`;
        }
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: errorMessage,
                description: error.desc
            }
        });
    }
};

const deleteStudentController = async (req, res) => {
    try {
        const { studentID } = req.params;
        console.log('Controller: deleteStudent with studentID:', studentID);
        await studentServices.deleteStudent(studentID);
        res.status(200).json({ // Or 204 with res.status(204).send();
            success: true,
            code: 'DELETE_STUDENT_SUCCESS',
            message: `Student with ID ${studentID} deleted successfully.`,
            data: {}
        });
    } catch (error) {
        console.error('deleteStudentController Error:', error);
        let statusCode = 500;
        let errorMessage = error.message || 'Failed to delete student.';
        if (error.code === 'P2025') {
            statusCode = 404;
            errorMessage = `Student with ID ${req.params.studentID} not found for deletion.`;
        }
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: errorMessage,
                description: error.desc
            }
        });
    }
};

const getStudentAffiliationsController = async (req, res) => {
    try {
        const { studentID } = req.params;
        console.log('Controller: getStudentAffiliations for studentID:', studentID);
        const affiliations = await studentServices.getStudentAffiliations(studentID);
        res.status(200).json({
            success: true,
            code: 'GET_STUDENT_AFFILIATIONS_SUCCESS',
            message: 'Successfully retrieved student affiliations.',
            data: affiliations
        });
    } catch (error) {
        console.error('getStudentAffiliationsController Error:', error);
        const statusCode = error.code === 'STUDENT_NOT_FOUND' ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: error.message || 'Failed to get student affiliations.',
                description: error.desc
            }
        });
    }
};

const assignStudentToOrgController = async (req, res) => {
    try {
        const { studentID } = req.params;
        const { orgID, affiliationType } = req.body;
        console.log('Controller: assignStudentToOrg studentID:', studentID, 'orgID:', orgID);
        if (!orgID || !affiliationType) {
            return res.status(400).json({
                success: false,
                code: 'MISSING_PARAMETERS',
                error: { message: 'Organization ID (orgID) and affiliationType are required.' }
            });
        }
        const affiliation = await studentServices.assignStudentToOrg(studentID, orgID, affiliationType);
        res.status(201).json({
            success: true,
            code: 'ASSIGN_STUDENT_TO_ORG_SUCCESS',
            message: 'Successfully assigned student to organization.',
            data: affiliation
        });
    } catch (error) {
        console.error('assignStudentToOrgController Error:', error);
        let statusCode = 500;
        let errorMessage = error.message || 'Failed to assign student to organization.';
        if (error.code === 'STUDENT_NOT_FOUND' || error.code === 'ORG_NOT_FOUND') {
            statusCode = 404;
        } else if (error.code === 'P2002') {
            statusCode = 409; 
            errorMessage = `Student ${req.params.studentID} is already affiliated with organization ${req.body.orgID} in that role or similar unique constraint violation.`;
        }
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: errorMessage,
                description: error.desc
            }
        });
    }
};

const removeStudentAffiliationController = async (req, res) => {
    try {
        const { studentID, orgID, affiliationID } = req.params; 
        console.log('Controller: removeStudentFromOrg studentID:', studentID, 'orgID:', orgID, 'affiliationID:', affiliationID);
        
        let result;
        if (affiliationID) { // If a specific affiliationID is provided (e.g., from a route like /affiliate/:affiliationID)
             result = await studentServices.removeStudentFromOrg(null, null, affiliationID);
        } else if (studentID && orgID) { // If studentID and orgID are provided (e.g., from /:studentID/affiliate/:orgID)
            result = await studentServices.removeStudentFromOrg(studentID, orgID, null);
        } else {
            return res.status(400).json({
                success: false,
                code: 'MISSING_PARAMETERS',
                error: { message: 'Sufficient identifiers (affiliationID or both studentID & orgID) required.'}
            });
        }
        res.status(200).json({
            success: true,
            code: 'REMOVE_STUDENT_FROM_ORG_SUCCESS',
            message: result.message || 'Successfully removed student affiliation.', // Use message from service if available
            data: {}
        });
    } catch (error) {
        console.error('removeStudentAffiliationController Error:', error);
        let statusCode = 500;
        let errorMessage = error.message || 'Failed to remove student from organization.';
        if (error.code === 'P2025' || error.code === 'AFFILIATION_NOT_FOUND') {
            statusCode = 404;
            errorMessage = error.desc || `Affiliation not found.`;
        } else if (error.code === 'STUDENT_NOT_FOUND') {
            statusCode = 404;
        }
        res.status(statusCode).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: errorMessage,
                description: error.desc
            }
        });
    }
};

module.exports = {
    listStudentsController,
    createStudentController,
    getStudentController,
    updateStudentController,
    deleteStudentController,
    getStudentAffiliationsController,
    assignStudentToOrgController,
    removeStudentAffiliationController,
};