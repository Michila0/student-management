import { fetchAllStudents } from "~~/server/db-action";

//get students
export default defineEventHandler(async (event) => {
    return await fetchAllStudents();
});
