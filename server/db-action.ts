interface Student {
  id: number
  name: string
  email: string
  currentGPA: number
  grade: string
}

let studentIdCounter = 4;


let students: Student[] = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", currentGPA: 3.8, grade: "10A"},
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", currentGPA: 3.5, grade: "9B"},
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", currentGPA: 3.9, grade: "10B"},
];

export const fetchAllStudents = async (): Promise<Student[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return students;
};

export const fetchStudentById = async (id: number): Promise<Student | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return students.find(s => s.id === id);
};

export const saveStudent = async (newStudentData: Omit<Student, 'id'>): Promise<Student> => {
  await new Promise(resolve => setTimeout(resolve, 50));

  const newStudent: Student = {
    id: studentIdCounter++,
    ...newStudentData,
  };

  students.push(newStudent);
  return newStudent;
};

export const updateStudent = async (id: number, updatedData: Partial<Student>): Promise<Student | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return undefined;
  }

  // original ID and merge data
  students[index] = { ...students[index], ...updatedData, id };
  return students[index];
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 50));

  const initialLength = students.length;
  
  // Filter out the student with the matching ID
  students = students.filter(s => s.id !== id);

  // Return true if the length changed (meaning a student was deleted)
  return students.length < initialLength;
};
