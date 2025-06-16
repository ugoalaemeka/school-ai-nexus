
export interface NigerianStudent {
  id: string;
  fullName: string;
  studentId: string;
  currentClass: string;
  age: number;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  address: string;
  enrollmentDate: string;
  bloodGroup: string;
  genotype: string;
  previousSchool: string;
}

export const sampleNigerianStudents: NigerianStudent[] = [
  {
    id: '1',
    fullName: 'Adebayo Olumide',
    studentId: 'EKO/2024/001',
    currentClass: 'JSS 1A',
    age: 12,
    gender: 'Male',
    dateOfBirth: '2012-03-15',
    parentName: 'Mr. Adebayo Taiwo',
    parentPhone: '+234 803 456 7890',
    parentEmail: 'taiwo.adebayo@gmail.com',
    parentOccupation: 'Engineer',
    address: 'No. 15 Adeniyi Jones Avenue, Ikeja, Lagos',
    enrollmentDate: '2024-09-15',
    bloodGroup: 'O+',
    genotype: 'AA',
    previousSchool: 'Divine Mercy Primary School'
  },
  {
    id: '2',
    fullName: 'Chioma Okafor',
    studentId: 'EKO/2024/002',
    currentClass: 'SSS 2B',
    age: 16,
    gender: 'Female',
    dateOfBirth: '2008-07-22',
    parentName: 'Mrs. Okafor Grace',
    parentPhone: '+234 807 123 4567',
    parentEmail: 'grace.okafor@yahoo.com',
    parentOccupation: 'Doctor',
    address: 'Plot 42 Victoria Garden City, Lagos',
    enrollmentDate: '2022-09-10',
    bloodGroup: 'A+',
    genotype: 'AS',
    previousSchool: 'Grace Land Primary School'
  },
  {
    id: '3',
    fullName: 'Ibrahim Musa',
    studentId: 'EKO/2024/003',
    currentClass: 'Primary 5A',
    age: 10,
    gender: 'Male',
    dateOfBirth: '2014-01-08',
    parentName: 'Alhaji Musa Ibrahim',
    parentPhone: '+234 812 987 6543',
    parentEmail: 'musa.ibrahim@hotmail.com',
    parentOccupation: 'Businessman',
    address: 'No. 8 Alhaji Masha Road, Surulere, Lagos',
    enrollmentDate: '2024-09-15',
    bloodGroup: 'B+',
    genotype: 'AA',
    previousSchool: 'Al-Hikmah Primary School'
  }
];
