let mockStudents = []

//create student
export default defineEventHandler(async (event) => {
    const newStudentData = await readBody(event);

    const newStudent = { id: Date.now(), ...newStudentData };

    mockStudents.push(newStudent);

    event.node.res.statusCode = 201; 
    return newStudent;
})