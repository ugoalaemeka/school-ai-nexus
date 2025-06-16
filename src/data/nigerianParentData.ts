
// Nigerian Parent Data with authentic educational content

export interface NigerianParent {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  lga: string;
  state: string;
  children: NigerianChild[];
}

export interface NigerianChild {
  id: string;
  name: string;
  studentId: string;
  class: string;
  level: 'nursery' | 'primary' | 'jss' | 'sss';
  age: number;
  dateOfBirth: string;
  subjects: string[];
  currentGrade: string;
  attendance: number;
  fees: FeeRecord[];
  recentGrades: SubjectGrade[];
}

export interface FeeRecord {
  id: string;
  term: string;
  academicYear: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paymentDate?: string;
  paymentMethod?: string;
}

export interface SubjectGrade {
  subject: string;
  grade: string;
  score: number;
  term: string;
  comment: string;
}

export interface ParentMessage {
  id: string;
  from: 'teacher' | 'admin' | 'system';
  senderName: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Sample parent data
export const currentParent: NigerianParent = {
  id: "ESA-PAR-001",
  name: "Mr. Adebayo Olumide Emmanuel",
  email: "o.adebayo@gmail.com",
  phone: "+234 807 123 4567",
  occupation: "Software Engineer at GTBank",
  address: "15, Akin Adesola Street, Victoria Island, Lagos",
  lga: "Eti-Osa",
  state: "Lagos",
  children: [
    {
      id: "ESA/2024/P5/045",
      name: "Adebayo Temiloluwa Sarah",
      studentId: "ESA/2024/P5/045",
      class: "Primary 5A",
      level: "primary",
      age: 10,
      dateOfBirth: "2014-03-15",
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
      currentGrade: "A",
      attendance: 96.7,
      fees: [
        {
          id: "FEE-001",
          term: "Second Term",
          academicYear: "2024/2025",
          amount: 320000,
          status: "paid",
          dueDate: "2025-01-15",
          paymentDate: "2025-01-10",
          paymentMethod: "Bank Transfer"
        },
        {
          id: "FEE-002",
          term: "Third Term", 
          academicYear: "2024/2025",
          amount: 320000,
          status: "pending",
          dueDate: "2025-04-15"
        }
      ],
      recentGrades: [
        { subject: "Mathematics", grade: "A", score: 88, term: "First Term", comment: "Excellent work in problem solving" },
        { subject: "English Language", grade: "A", score: 92, term: "First Term", comment: "Outstanding comprehension skills" },
        { subject: "Basic Science", grade: "B+", score: 85, term: "First Term", comment: "Good practical work, improve theory" },
        { subject: "Social Studies", grade: "A", score: 90, term: "First Term", comment: "Excellent knowledge of Nigerian history" },
        { subject: "Computer Studies", grade: "A+", score: 94, term: "First Term", comment: "Exceptional programming skills" }
      ]
    },
    {
      id: "ESA/2024/P2/078",
      name: "Adebayo Oluwasegun David",
      studentId: "ESA/2024/P2/078", 
      class: "Primary 2B",
      level: "primary",
      age: 7,
      dateOfBirth: "2017-08-22",
      subjects: [
        "English Language",
        "Mathematics",
        "Basic Science", 
        "Social Studies",
        "Creative Arts",
        "Physical & Health Education",
        "Computer Studies"
      ],
      currentGrade: "B+",
      attendance: 94.2,
      fees: [
        {
          id: "FEE-003",
          term: "Second Term",
          academicYear: "2024/2025", 
          amount: 280000,
          status: "paid",
          dueDate: "2025-01-15",
          paymentDate: "2025-01-12",
          paymentMethod: "Online Payment"
        }
      ],
      recentGrades: [
        { subject: "Mathematics", grade: "B+", score: 82, term: "First Term", comment: "Good progress in number work" },
        { subject: "English Language", grade: "A", score: 87, term: "First Term", comment: "Excellent reading skills" },
        { subject: "Basic Science", grade: "B", score: 80, term: "First Term", comment: "Shows good curiosity about nature" }
      ]
    }
  ]
};

export const parentMessages: ParentMessage[] = [
  {
    id: "MSG-001",
    from: "teacher",
    senderName: "Mrs. Adeyemi Bukola (Mathematics Teacher)",
    subject: "Sarah's Excellent Performance in Mathematics",
    message: "Good day Mr. Adebayo. I want to commend Sarah for her outstanding performance in Mathematics this term. She scored 88% in our recent test and has been helping other students understand fractions. Please encourage her to keep up the good work.",
    date: "2025-01-18",
    isRead: false,
    priority: "medium"
  },
  {
    id: "MSG-002",
    from: "admin",
    senderName: "School Bursar - Mrs. Okafor",
    subject: "Fee Payment Confirmation - Third Term",
    message: "Dear Parent, we acknowledge receipt of Third Term fees for both Sarah and David. Payment was successful via bank transfer. Receipt has been sent to your email. Thank you for your prompt payment.",
    date: "2025-01-15", 
    isRead: true,
    priority: "low"
  },
  {
    id: "MSG-003", 
    from: "system",
    senderName: "School Management System",
    subject: "Mid-Term Examination Timetable Released",
    message: "The Mid-Term examination timetable for Second Term 2024/2025 has been published. Please check the student portal for detailed schedule. Examinations begin February 10, 2025.",
    date: "2025-01-16",
    isRead: false,
    priority: "high"
  },
  {
    id: "MSG-004",
    from: "teacher", 
    senderName: "Mr. Lawal Hassan (Basic Science Teacher)",
    subject: "David's Science Project",
    message: "Hello Mr. Adebayo. David has shown great interest in our plant growth experiment. He asks very thoughtful questions. I suggest encouraging his curiosity at home with simple science activities.",
    date: "2025-01-14",
    isRead: true,
    priority: "low"
  }
];

export const upcomingEvents = [
  {
    id: "EVT-001",
    title: "Parent-Teacher Conference",
    date: "2025-02-05",
    time: "2:00 PM - 5:00 PM",
    venue: "School Hall",
    description: "Meet with your child's teachers to discuss academic progress"
  },
  {
    id: "EVT-002", 
    title: "Cultural Day Celebration",
    date: "2025-02-14",
    time: "10:00 AM - 2:00 PM", 
    venue: "School Compound",
    description: "Celebration of Nigerian cultural diversity - traditional attire encouraged"
  },
  {
    id: "EVT-003",
    title: "Inter-House Sports Competition",
    date: "2025-02-21",
    time: "8:00 AM - 4:00 PM",
    venue: "School Sports Field", 
    description: "Annual sports competition between school houses"
  }
];

export const paymentHistory = [
  {
    id: "PAY-001",
    studentName: "Adebayo Temiloluwa Sarah",
    description: "Second Term School Fees",
    amount: 320000,
    date: "2025-01-10",
    method: "Bank Transfer", 
    status: "completed",
    reference: "ESA/2025/ST/001234"
  },
  {
    id: "PAY-002",
    studentName: "Adebayo Oluwasegun David", 
    description: "Second Term School Fees",
    amount: 280000,
    date: "2025-01-12",
    method: "Online Payment",
    status: "completed", 
    reference: "ESA/2025/ST/001235"
  },
  {
    id: "PAY-003",
    studentName: "Both Children",
    description: "PTA Levy",
    amount: 25000,
    date: "2025-01-05", 
    method: "Cash Payment",
    status: "completed",
    reference: "ESA/2025/PTA/089"
  }
];
