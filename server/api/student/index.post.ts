import { saveStudent } from "~~/server/db-action";

let mockStudents = []

//create student
export default defineEventHandler(async (event) => {
    const newStudentData = await readBody(event);

    if (!newStudentData.name || !newStudentData.age) {
        throw createError({ statusCode: 400, statusMessage: 'Missing required student fields (name, age).' });
    }

    const student = await saveStudent(newStudentData);
    
    event.node.res.statusCode = 201;
    return student;
})