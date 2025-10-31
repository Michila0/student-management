let mockStudents = [{ id: 1, name: "Alice", age: 15, classroom: "9A", address: "123 Lane" }];

import { fetchAllStudents } from "~~/server/db-action";

//get students
export default defineEventHandler(async (event) => {
    return await fetchAllStudents();
});
