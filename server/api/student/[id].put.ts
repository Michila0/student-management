import { updateStudent } from "~~/server/db-action";

export default defineEventHandler(async (event) => {
    const idParam = event.context?.params?.id;
    if (!idParam) {
        throw createError({ statusCode: 400, statusMessage: 'Missing student id' });
    }
    
    const studentId = parseInt(String(idParam), 10);
    if (Number.isNaN(studentId)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid student id' });
    }
    const updatedData = await readBody(event);

    const updatedStudent = await updateStudent(studentId, updatedData);

  if (!updatedStudent) {
    throw createError({ statusCode: 404, statusMessage: `Student with ID ${studentId} not found.` });
  }

  return updatedStudent;
});