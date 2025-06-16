
// Nigerian Teacher Data with authentic educational content

export interface NigerianTeacher {
  id: string;
  name: string;
  employeeId: string;
  subject: string;
  classes: string[];
  level: 'nursery' | 'primary' | 'jss' | 'sss' | 'all';
  qualification: string;
  experience: string;
  phone: string;
  email: string;
  homeAddress: string;
}

export interface ClassSession {
  id: string;
  className: string;
  subject: string;
  date: string;
  time: string;
  topic: string;
  attendance: number;
  totalStudents: number;
}

export interface TeacherAssignment {
  id: string;
  title: string;
  subject: string;
  classes: string[];
  dueDate: string;
  submittedCount: number;
  totalStudents: number;
  status: 'active' | 'closed' | 'grading';
}

export interface StudentRecord {
  id: string;
  name: string;
  studentId: string;
  class: string;
  subjects: { [key: string]: number };
  attendance: number;
  behavior: 'excellent' | 'good' | 'fair' | 'needs_improvement';
  parentContact: string;
}

// Sample teacher data
export const currentTeacher: NigerianTeacher = {
  id: "ESA-TCH-001",
  name: "Mrs. Adeyemi Bukola Folasade",
  employeeId: "ESA/STAFF/2022/MTH/001",
  subject: "Mathematics",
  classes: ["Primary 4A", "Primary 5A", "Primary 5B", "Primary 6A"],
  level: "primary",
  qualification: "B.Ed Mathematics Education, University of Lagos",
  experience: "8 years",
  phone: "+234 803 456 7890",
  email: "b.adeyemi@ekoscholars.edu.ng",
  homeAddress: "12, Abeokuta Street, Ikeja, Lagos State"
};

export const teacherClasses: ClassSession[] = [
  {
    id: "CLS-001",
    className: "Primary 5A",
    subject: "Mathematics",
    date: "2025-01-20",
    time: "8:40 AM",
    topic: "Fraction Addition and Subtraction",
    attendance: 28,
    totalStudents: 30
  },
  {
    id: "CLS-002",
    className: "Primary 4A",
    subject: "Mathematics",
    date: "2025-01-20",
    time: "10:20 AM",
    topic: "Multiplication Tables (6-10)",
    attendance: 25,
    totalStudents: 27
  },
  {
    id: "CLS-003",
    className: "Primary 6A",
    subject: "Mathematics",
    date: "2025-01-20",
    time: "1:00 PM",
    topic: "Decimal Operations Review",
    attendance: 32,
    totalStudents: 33
  }
];

export const teacherAssignments: TeacherAssignment[] = [
  {
    id: "ASG-001",
    title: "Fraction Worksheet - Addition & Subtraction",
    subject: "Mathematics",
    classes: ["Primary 5A", "Primary 5B"],
    dueDate: "2025-01-25",
    submittedCount: 45,
    totalStudents: 60,
    status: "active"
  },
  {
    id: "ASG-002",
    title: "Multiplication Tables Practice",
    subject: "Mathematics",
    classes: ["Primary 4A"],
    dueDate: "2025-01-22",
    submittedCount: 27,
    totalStudents: 27,
    status: "grading"
  },
  {
    id: "ASG-003",
    title: "Word Problems on Percentages",
    subject: "Mathematics",
    classes: ["Primary 6A"],
    dueDate: "2025-01-28",
    submittedCount: 15,
    totalStudents: 33,
    status: "active"
  }
];

export const studentRecords: StudentRecord[] = [
  {
    id: "ESA/2024/P5/001",
    name: "Adebayo Temiloluwa Sarah",
    studentId: "ESA/2024/P5/001",
    class: "Primary 5A",
    subjects: { Mathematics: 88, English: 92, "Basic Science": 85 },
    attendance: 96,
    behavior: "excellent",
    parentContact: "+234 807 123 4567"
  },
  {
    id: "ESA/2024/P5/002",
    name: "Okafor Chukwuemeka David",
    studentId: "ESA/2024/P5/002",
    class: "Primary 5A",
    subjects: { Mathematics: 75, English: 82, "Basic Science": 79 },
    attendance: 94,
    behavior: "good",
    parentContact: "+234 803 987 6543"
  },
  {
    id: "ESA/2024/P5/003",
    name: "Lawal Zainab Aisha",
    studentId: "ESA/2024/P5/003",
    class: "Primary 5A",
    subjects: { Mathematics: 92, English: 89, "Basic Science": 94 },
    attendance: 98,
    behavior: "excellent",
    parentContact: "+234 806 456 7890"
  }
];

export const weeklySchedule = [
  {
    day: "Monday",
    classes: [
      { time: "8:40-9:20", class: "Primary 5A", subject: "Mathematics", topic: "Fractions" },
      { time: "10:20-11:00", class: "Primary 4A", subject: "Mathematics", topic: "Multiplication" },
      { time: "1:00-1:40", class: "Primary 6A", subject: "Mathematics", topic: "Decimals" }
    ]
  },
  {
    day: "Tuesday",
    classes: [
      { time: "9:20-10:00", class: "Primary 5B", subject: "Mathematics", topic: "Fractions" },
      { time: "11:00-11:40", class: "Primary 4A", subject: "Mathematics", topic: "Division" },
      { time: "1:40-2:20", class: "Primary 6A", subject: "Mathematics", topic: "Percentages" }
    ]
  }
];

export const lessonPlans = [
  {
    id: "LP-001",
    subject: "Mathematics",
    class: "Primary 5A",
    topic: "Addition and Subtraction of Fractions",
    duration: "40 minutes",
    objectives: [
      "Students will be able to add fractions with like denominators",
      "Students will be able to subtract fractions with like denominators",
      "Students will solve real-world problems involving fractions"
    ],
    materials: ["Fraction charts", "Whiteboard", "Exercise books", "Calculators"],
    activities: [
      "Introduction and warm-up (5 mins)",
      "Explanation with examples (15 mins)", 
      "Guided practice (10 mins)",
      "Independent practice (8 mins)",
      "Wrap-up and assignment (2 mins)"
    ]
  }
];
