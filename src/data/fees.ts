
// Nigerian School Fees Data with authentic structure and amounts

export interface SchoolFee {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  level: 'nursery' | 'primary' | 'jss' | 'sss';
  feeType: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  dueDate: string;
  paymentMethod: string;
  term: string;
  academicYear: string;
  paymentDate?: string;
  balanceOwed?: number;
}

export const feesData: SchoolFee[] = [
  // Nursery Fees
  {
    id: "ESA-N1-001",
    studentName: "Adebayo Temiloluwa",
    studentId: "ESA/2024/N1/001",
    class: "Nursery 1",
    level: 'nursery',
    feeType: "School Fees",
    amount: 180000,
    status: "paid",
    dueDate: "2025-01-15",
    paymentMethod: "Bank Transfer",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-10"
  },
  {
    id: "ESA-N2-001",
    studentName: "Okoro Chidinma",
    studentId: "ESA/2024/N2/015",
    class: "Nursery 2",
    level: 'nursery',
    feeType: "School Fees",
    amount: 190000,
    status: "pending",
    dueDate: "2025-03-15",
    paymentMethod: "Pending",
    term: "Second Term",
    academicYear: "2024/2025"
  },

  // Primary School Fees
  {
    id: "ESA-P1-001",
    studentName: "Lawal Zaynab",
    studentId: "ESA/2024/P1/023",
    class: "Primary 1",
    level: 'primary',
    feeType: "School Fees",
    amount: 250000,
    status: "paid",
    dueDate: "2025-01-15",
    paymentMethod: "Cash Payment",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-12"
  },
  {
    id: "ESA-P3-001",
    studentName: "Okafor Chukwuemeka",
    studentId: "ESA/2022/P3/045",
    class: "Primary 3",
    level: 'primary',
    feeType: "School Fees",
    amount: 280000,
    status: "overdue",
    dueDate: "2024-12-15",
    paymentMethod: "Pending",
    term: "Second Term",
    academicYear: "2024/2025",
    balanceOwed: 280000
  },
  {
    id: "ESA-P5-001",
    studentName: "Adeleke Folasade",
    studentId: "ESA/2020/P5/067",
    class: "Primary 5",
    level: 'primary',
    feeType: "School Fees",
    amount: 320000,
    status: "partial",
    dueDate: "2025-01-15",
    paymentMethod: "Bank Transfer",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-05",
    balanceOwed: 120000
  },
  {
    id: "ESA-P6-001",
    studentName: "Bello Abdulrahman",
    studentId: "ESA/2019/P6/089",
    class: "Primary 6",
    level: 'primary',
    feeType: "FSLC Examination Fee",
    amount: 45000,
    status: "paid",
    dueDate: "2025-02-28",
    paymentMethod: "Online Payment",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-02-15"
  },

  // JSS Fees
  {
    id: "ESA-JSS1-001",
    studentName: "Nwankwo Precious",
    studentId: "ESA/2024/JSS1/012",
    class: "JSS 1",
    level: 'jss',
    feeType: "School Fees",
    amount: 420000,
    status: "paid",
    dueDate: "2025-01-15",
    paymentMethod: "Bank Transfer",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-08"
  },
  {
    id: "ESA-JSS2-001",
    studentName: "Adeyemi Boluwatife",
    studentId: "ESA/2023/JSS2/034",
    class: "JSS 2",
    level: 'jss',
    feeType: "School Fees",
    amount: 450000,
    status: "pending",
    dueDate: "2025-03-15",
    paymentMethod: "Pending",
    term: "Second Term",
    academicYear: "2024/2025"
  },
  {
    id: "ESA-JSS3-001",
    studentName: "Musa Fatima",
    studentId: "ESA/2022/JSS3/056",
    class: "JSS 3",
    level: 'jss',
    feeType: "BECE Registration",
    amount: 75000,
    status: "paid",
    dueDate: "2025-02-01",
    paymentMethod: "Cash Payment",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-28"
  },

  // SSS Fees
  {
    id: "ESA-SSS1-001",
    studentName: "Ogbonna Kelechi",
    studentId: "ESA/2024/SSS1/078",
    class: "SSS 1 Science",
    level: 'sss',
    feeType: "School Fees",
    amount: 580000,
    status: "paid",
    dueDate: "2025-01-15",
    paymentMethod: "Bank Transfer",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-01-05"
  },
  {
    id: "ESA-SSS2-001",
    studentName: "Williams Goodness",
    studentId: "ESA/2023/SSS2/091",
    class: "SSS 2 Arts",
    level: 'sss',
    feeType: "School Fees",
    amount: 620000,
    status: "overdue",
    dueDate: "2024-12-15",
    paymentMethod: "Pending",
    term: "Second Term",
    academicYear: "2024/2025",
    balanceOwed: 620000
  },
  {
    id: "ESA-SSS3-001",
    studentName: "Akinola Titilope",
    studentId: "ESA/2022/SSS3/103",
    class: "SSS 3 Commercial",
    level: 'sss',
    feeType: "WAEC Registration",
    amount: 125000,
    status: "paid",
    dueDate: "2025-03-01",
    paymentMethod: "Online Payment",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-02-20"
  },

  // Additional fees
  {
    id: "ESA-P4-002",
    studentName: "Eze Chinedu",
    studentId: "ESA/2021/P4/125",
    class: "Primary 4",
    level: 'primary',
    feeType: "Extra-Curricular Activities",
    amount: 50000,
    status: "paid",
    dueDate: "2025-02-15",
    paymentMethod: "Cash Payment",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-02-10"
  },
  {
    id: "ESA-JSS1-002",
    studentName: "Salisu Hauwa",
    studentId: "ESA/2024/JSS1/147",
    class: "JSS 1",
    level: 'jss',
    feeType: "Computer Studies Lab Fee",
    amount: 35000,
    status: "pending",
    dueDate: "2025-03-20",
    paymentMethod: "Pending",
    term: "Second Term",
    academicYear: "2024/2025"
  },
  {
    id: "ESA-SSS1-002",
    studentName: "Danjuma Samuel",
    studentId: "ESA/2024/SSS1/169",
    class: "SSS 1 Science",
    level: 'sss',
    feeType: "Science Laboratory Fee",
    amount: 85000,
    status: "partial",
    dueDate: "2025-02-28",
    paymentMethod: "Bank Transfer",
    term: "Second Term",
    academicYear: "2024/2025",
    paymentDate: "2025-02-15",
    balanceOwed: 35000
  }
];

// Fee structure by level
export const feeStructure = {
  nursery: {
    schoolFees: 185000,
    developmentFee: 25000,
    uniformFee: 15000,
    booksAndMaterials: 20000
  },
  primary: {
    schoolFees: 285000,
    developmentFee: 30000,
    uniformFee: 18000,
    booksAndMaterials: 25000,
    examFees: 15000
  },
  jss: {
    schoolFees: 435000,
    developmentFee: 40000,
    uniformFee: 20000,
    booksAndMaterials: 35000,
    computerFee: 25000,
    examFees: 20000
  },
  sss: {
    schoolFees: 600000,
    developmentFee: 50000,
    uniformFee: 22000,
    booksAndMaterials: 45000,
    laboratoryFee: 35000,
    examFees: 30000,
    waecFee: 125000
  }
};

// Payment methods commonly used in Nigerian schools
export const paymentMethods = [
  'Bank Transfer',
  'Cash Payment',
  'Online Payment',
  'Bank Draft',
  'Mobile Money',
  'POS Payment',
  'Cheque'
];

// Academic terms
export const academicTerms = [
  'First Term',
  'Second Term', 
  'Third Term'
];
