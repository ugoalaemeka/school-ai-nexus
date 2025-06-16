// Nigerian Education System Data
export interface NigerianClass {
  id: string;
  name: string;
  level: 'nursery' | 'primary' | 'jss' | 'sss';
  grade: string;
  subjects: string[];
  ageRange: string;
}

export interface NigerianSubject {
  id: string;
  name: string;
  code: string;
  levels: string[];
  category: 'core' | 'elective' | 'vocational';
}

export const nigerianClasses: NigerianClass[] = [
  // Nursery Classes
  { id: 'n1', name: 'Nursery 1', level: 'nursery', grade: 'N1', subjects: ['Pre-Reading', 'Pre-Writing', 'Pre-Math', 'Rhymes & Songs', 'Creative Arts', 'Physical Education'], ageRange: '3-4 years' },
  { id: 'n2', name: 'Nursery 2', level: 'nursery', grade: 'N2', subjects: ['Pre-Reading', 'Pre-Writing', 'Pre-Math', 'Rhymes & Songs', 'Creative Arts', 'Physical Education'], ageRange: '4-5 years' },
  
  // Primary Classes
  { id: 'p1', name: 'Primary 1', level: 'primary', grade: 'P1', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '5-6 years' },
  { id: 'p2', name: 'Primary 2', level: 'primary', grade: 'P2', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '6-7 years' },
  { id: 'p3', name: 'Primary 3', level: 'primary', grade: 'P3', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '7-8 years' },
  { id: 'p4', name: 'Primary 4', level: 'primary', grade: 'P4', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '8-9 years' },
  { id: 'p5', name: 'Primary 5', level: 'primary', grade: 'P5', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '9-10 years' },
  { id: 'p6', name: 'Primary 6', level: 'primary', grade: 'P6', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Religion & National Values'], ageRange: '10-11 years' },
  
  // Junior Secondary School (JSS)
  { id: 'jss1', name: 'JSS 1', level: 'jss', grade: 'JSS1', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Basic Technology', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Computer Studies', 'French Language'], ageRange: '11-12 years' },
  { id: 'jss2', name: 'JSS 2', level: 'jss', grade: 'JSS2', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Basic Technology', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Computer Studies', 'French Language'], ageRange: '12-13 years' },
  { id: 'jss3', name: 'JSS 3', level: 'jss', grade: 'JSS3', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Basic Technology', 'Social Studies', 'Civic Education', 'Creative Arts', 'Physical & Health Education', 'Computer Studies', 'French Language'], ageRange: '13-14 years' },
  
  // Senior Secondary School (SSS) - Science
  { id: 'sss1-sci', name: 'SSS 1 Science', level: 'sss', grade: 'SSS1', subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Economics', 'Computer Science'], ageRange: '14-15 years' },
  { id: 'sss2-sci', name: 'SSS 2 Science', level: 'sss', grade: 'SSS2', subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Economics', 'Computer Science'], ageRange: '15-16 years' },
  { id: 'sss3-sci', name: 'SSS 3 Science', level: 'sss', grade: 'SSS3', subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Economics', 'Computer Science'], ageRange: '16-17 years' },
  
  // Senior Secondary School (SSS) - Arts
  { id: 'sss1-arts', name: 'SSS 1 Arts', level: 'sss', grade: 'SSS1', subjects: ['English Language', 'Literature in English', 'Government', 'History', 'Geography', 'Economics', 'Fine Arts', 'French Language'], ageRange: '14-15 years' },
  { id: 'sss2-arts', name: 'SSS 2 Arts', level: 'sss', grade: 'SSS2', subjects: ['English Language', 'Literature in English', 'Government', 'History', 'Geography', 'Economics', 'Fine Arts', 'French Language'], ageRange: '15-16 years' },
  { id: 'sss3-arts', name: 'SSS 3 Arts', level: 'sss', grade: 'SSS3', subjects: ['English Language', 'Literature in English', 'Government', 'History', 'Geography', 'Economics', 'Fine Arts', 'French Language'], ageRange: '16-17 years' },
  
  // Senior Secondary School (SSS) - Commercial
  { id: 'sss1-comm', name: 'SSS 1 Commercial', level: 'sss', grade: 'SSS1', subjects: ['English Language', 'Mathematics', 'Accounting', 'Commerce', 'Economics', 'Business Studies', 'Office Practice', 'Computer Studies'], ageRange: '14-15 years' },
  { id: 'sss2-comm', name: 'SSS 2 Commercial', level: 'sss', grade: 'SSS2', subjects: ['English Language', 'Mathematics', 'Accounting', 'Commerce', 'Economics', 'Business Studies', 'Office Practice', 'Computer Studies'], ageRange: '15-16 years' },
  { id: 'sss3-comm', name: 'SSS 3 Commercial', level: 'sss', grade: 'SSS3', subjects: ['English Language', 'Mathematics', 'Accounting', 'Commerce', 'Economics', 'Business Studies', 'Office Practice', 'Computer Studies'], ageRange: '16-17 years' }
];

export const nigerianSubjects: NigerianSubject[] = [
  // Core Subjects
  { id: 'eng', name: 'English Language', code: 'ENG', levels: ['primary', 'jss', 'sss'], category: 'core' },
  { id: 'math', name: 'Mathematics', code: 'MTH', levels: ['primary', 'jss', 'sss'], category: 'core' },
  { id: 'basic-sci', name: 'Basic Science', code: 'BSC', levels: ['primary', 'jss'], category: 'core' },
  { id: 'social', name: 'Social Studies', code: 'SOS', levels: ['primary', 'jss'], category: 'core' },
  { id: 'civic', name: 'Civic Education', code: 'CIV', levels: ['primary', 'jss', 'sss'], category: 'core' },
  
  // Science Subjects
  { id: 'physics', name: 'Physics', code: 'PHY', levels: ['sss'], category: 'core' },
  { id: 'chemistry', name: 'Chemistry', code: 'CHM', levels: ['sss'], category: 'core' },
  { id: 'biology', name: 'Biology', code: 'BIO', levels: ['sss'], category: 'core' },
  
  // Arts Subjects
  { id: 'literature', name: 'Literature in English', code: 'LIT', levels: ['sss'], category: 'elective' },
  { id: 'government', name: 'Government', code: 'GOV', levels: ['sss'], category: 'elective' },
  { id: 'history', name: 'History', code: 'HIS', levels: ['sss'], category: 'elective' },
  { id: 'geography', name: 'Geography', code: 'GEO', levels: ['jss', 'sss'], category: 'elective' },
  
  // Commercial Subjects
  { id: 'accounting', name: 'Accounting', code: 'ACC', levels: ['sss'], category: 'elective' },
  { id: 'commerce', name: 'Commerce', code: 'COM', levels: ['sss'], category: 'elective' },
  { id: 'economics', name: 'Economics', code: 'ECO', levels: ['sss'], category: 'elective' },
  { id: 'business', name: 'Business Studies', code: 'BUS', levels: ['sss'], category: 'elective' },
  
  // Other Subjects
  { id: 'computer', name: 'Computer Studies', code: 'CMP', levels: ['jss', 'sss'], category: 'elective' },
  { id: 'french', name: 'French Language', code: 'FRE', levels: ['jss', 'sss'], category: 'elective' },
  { id: 'phe', name: 'Physical & Health Education', code: 'PHE', levels: ['primary', 'jss', 'sss'], category: 'core' },
  { id: 'creative', name: 'Creative Arts', code: 'CRA', levels: ['primary', 'jss'], category: 'core' },
  { id: 'basic-tech', name: 'Basic Technology', code: 'BTC', levels: ['jss'], category: 'core' },
  { id: 'religion', name: 'Religion & National Values', code: 'RNV', levels: ['primary'], category: 'core' }
];

export const nigerianTerms = [
  { id: 'first', name: 'First Term', months: 'September - December' },
  { id: 'second', name: 'Second Term', months: 'January - April' },
  { id: 'third', name: 'Third Term', months: 'May - July' }
];

export const academicSessions = [
  '2024/2025',
  '2023/2024',
  '2022/2023',
  '2021/2022',
  '2020/2021'
];

// Sample Nigerian teachers with authentic names
export const sampleNigerianTeachers = [
  { id: '1', name: 'Mrs. Adebayo Funmilayo', subject: 'English Language', level: 'Primary', experience: '8 years' },
  { id: '2', name: 'Mr. Okafor Chinedu', subject: 'Mathematics', level: 'JSS', experience: '12 years' },
  { id: '3', name: 'Mrs. Okoro Chioma', subject: 'Biology', level: 'SSS Science', experience: '15 years' },
  { id: '4', name: 'Mr. Ibrahim Yusuf', subject: 'Physics', level: 'SSS Science', experience: '10 years' },
  { id: '5', name: 'Mrs. Williams Blessing', subject: 'Literature', level: 'SSS Arts', experience: '9 years' },
  { id: '6', name: 'Mr. Adeola Taiwo', subject: 'Accounting', level: 'SSS Commercial', experience: '11 years' },
  { id: '7', name: 'Mrs. Nnamdi Grace', subject: 'Basic Science', level: 'Primary', experience: '7 years' },
  { id: '8', name: 'Mr. Bello Ahmed', subject: 'Computer Studies', level: 'JSS/SSS', experience: '6 years' }
];

// Sample Nigerian students with authentic names
export const sampleNigerianStudents = [
  { id: '1', name: 'Adebisi Temiloluwa', class: 'Primary 5', age: 10, parent: 'Mr. & Mrs. Adebisi' },
  { id: '2', name: 'Okwu Chukwuemeka', class: 'JSS 2', age: 13, parent: 'Dr. & Mrs. Okwu' },
  { id: '3', name: 'Lawal Zainab', class: 'SSS 1 Science', age: 15, parent: 'Alhaji & Hajiya Lawal' },
  { id: '4', name: 'Osaze Jennifer', class: 'SSS 3 Arts', age: 17, parent: 'Mr. & Mrs. Osaze' },
  { id: '5', name: 'Akpan David', class: 'Nursery 2', age: 4, parent: 'Mr. & Mrs. Akpan' },
  { id: '6', name: 'Mustapha Aisha', class: 'Primary 3', age: 8, parent: 'Mr. & Mrs. Mustapha' },
  { id: '7', name: 'Ogbonna Prince', class: 'JSS 3', age: 14, parent: 'Chief & Mrs. Ogbonna' },
  { id: '8', name: 'Adeniran Folake', class: 'SSS 2 Commercial', age: 16, parent: 'Prof. & Mrs. Adeniran' }
];
