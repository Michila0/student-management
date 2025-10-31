import { createError } from 'h3';
import { deleteStudent } from '~~/server/db-action';

export default defineEventHandler(async (event) => {
    const idParam = event.context?.params?.id;
    if (!idParam) {
        throw createError({ statusCode: 400, statusMessage: 'Missing student ID.' });
    }
    const idString = Array.isArray(idParam) ? idParam[0] : idParam;
    const studentId = parseInt(idString, 10);

    if (isNaN(studentId)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid student ID.' });
  }

    const deleted = await deleteStudent(studentId);
    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: `Student ${studentId} not found.` });
    }

    event.node.res.statusCode = 204;
    return { message: `Student ${studentId} deleted successfully` };
});