interface Student {
  id: number;
  name: string;
  age: number;
  classroom: string;
  address: string;
}

let studentIdCounter = 4;


let students: Student[] = [
  { id: 1, name: "Alice Johnson", age: 15, classroom: "10A", address: "45 Oak St" },
  { id: 2, name: "Bob Smith", age: 14, classroom: "9B", address: "10 Pine Rd" },
  { id: 3, name: "Charlie Brown", age: 16, classroom: "10B", address: "77 Elm Ave" },
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
