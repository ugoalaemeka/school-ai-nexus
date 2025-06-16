
// Nigerian Student Data with authentic educational content

export interface NigerianStudent {
  id: string;
  name: string;
  studentId: string;
  class: string;
  level: 'nursery' | 'primary' | 'jss' | 'sss';
  age: number;
  parentName: string;
  homeAddress: string;
  lga: string; // Local Government Area
  state: string;
  nationality: string;
  subjects: string[];
  currentTerm: string;
  academicYear: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  description: string;
  grade?: string;
  teacherComment?: string;
  submissionDate?: string;
}

export interface ExamSchedule {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  examType: 'continuous_assessment' | 'mid_term' | 'terminal_exam';
}

export interface SubjectResource {
  id: string;
  subject: string;
  title: string;
  type: 'note' | 'video' | 'textbook' | 'exercise';
  description: string;
  url?: string;
  uploadDate: string;
  teacherName: string;
}

// Sample student data
export const currentStudent: NigerianStudent = {
  id: "ESA/2024/P5/045",
  name: "Adebayo Temiloluwa Sarah",
  studentId: "ESA/2024/P5/045",
  class: "Primary 5A",
  level: "primary",
  age: 10,
  parentName: "Mr. & Mrs. Adebayo Olumide",
  homeAddress: "15, Akin Adesola Street, Victoria Island",
  lga: "Eti-Osa",
  state: "Lagos",
  nationality: "Nigerian",
  subjects: [
    "English Language",
    "Mathematics",
    "Basic Science & Technology",
    "Social Studies",
    "Civic Education",
    "Creative Arts",
    "Physical & Health Education",
    "Computer Studies",
    "Yoruba Language"
  ],
  currentTerm: "Second Term",
  academicYear: "2024/2025"
};

// Sample assignments
export const studentAssignments: Assignment[] = [
  {
    id: "ASGN-001",
    title: "Nigerian Independence Heroes Essay",
    subject: "Social Studies",
    dueDate: "2025-01-25",
    status: "pending",
    description: "Write a 500-word essay about three Nigerian independence heroes and their contributions to Nigeria's freedom."
  },
  {
    id: "ASGN-002",
    title: "Fraction Operations Worksheet",
    subject: "Mathematics",
    dueDate: "2025-01-22",
    status: "submitted",
    description: "Complete exercises 1-20 on adding and subtracting fractions.",
    grade: "85%",
    teacherComment: "Good work! Focus more on simplifying your final answers.",
    submissionDate: "2025-01-20"
  },
  {
    id: "ASGN-003",
    title: "Plant Growth Experiment Report",
    subject: "Basic Science & Technology",
    dueDate: "2025-01-28",
    status: "pending",
    description: "Document your bean plant growth over 2 weeks with daily observations."
  }
];

// Exam schedule
export const examSchedule: ExamSchedule[] = [
  {
    id: "EXM-001",
    subject: "Mathematics",
    date: "2025-02-10",
    time: "9:00 AM",
    duration: "1.5 hours",
    venue: "Mathematics Lab",
    examType: "mid_term"
  },
  {
    id: "EXM-002",
    subject: "English Language",
    date: "2025-02-12",
    time: "9:00 AM",
    duration: "2 hours",
    venue: "Main Hall",
    examType: "mid_term"
  },
  {
    id: "EXM-003",
    subject: "Basic Science & Technology",
    date: "2025-02-14",
    time: "10:00 AM",
    duration: "1.5 hours",
    venue: "Science Laboratory",
    examType: "mid_term"
  }
];

// Learning resources
export const learningResources: SubjectResource[] = [
  {
    id: "RES-001",
    subject: "Mathematics",
    title: "Fraction Addition and Subtraction Guide",
    type: "note",
    description: "Step-by-step guide for adding and subtracting fractions with examples",
    uploadDate: "2025-01-15",
    teacherName: "Mrs. Adeyemi Bukola"
  },
  {
    id: "RES-002",
    subject: "English Language",
    title: "Comprehension Passage Techniques",
    type: "video",
    description: "Video tutorial on how to tackle comprehension questions effectively",
    uploadDate: "2025-01-12",
    teacherName: "Mr. Okonkwo Chukwudi"
  },
  {
    id: "RES-003",
    subject: "Social Studies",
    title: "Map of Nigeria - States and Capitals",
    type: "note",
    description: "Detailed map showing all 36 states and their capitals",
    uploadDate: "2025-01-10",
    teacherName: "Mrs. Bello Zainab"
  }
];

export const weeklyTimetable = [
  {
    day: "Monday",
    periods: [
      { time: "8:00-8:40", subject: "Assembly/Devotion", teacher: "All Teachers" },
      { time: "8:40-9:20", subject: "Mathematics", teacher: "Mrs. Adeyemi Bukola" },
      { time: "9:20-10:00", subject: "English Language", teacher: "Mr. Okonkwo Chukwudi" },
      { time: "10:00-10:20", subject: "Break", teacher: "" },
      { time: "10:20-11:00", subject: "Basic Science & Technology", teacher: "Mr. Lawal Hassan" },
      { time: "11:00-11:40", subject: "Social Studies", teacher: "Mrs. Bello Zainab" },
      { time: "11:40-12:20", subject: "Computer Studies", teacher: "Mr. Eze Emeka" },
      { time: "12:20-1:00", subject: "Lunch Break", teacher: "" },
      { time: "1:00-1:40", subject: "Creative Arts", teacher: "Mrs. Okafor Ngozi" },
      { time: "1:40-2:20", subject: "Physical & Health Education", teacher: "Mr. Adamu Sule" }
    ]
  },
  // Additional days would follow similar pattern
];
