const queueData = [
  {
    id: "T001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    department: "Cardiology",
    appointmentTime: "09:30 AM",
    status: "waiting",
    priority: "normal",
    waitTime: "25 min",
    position: 3,
  },
  {
    id: "T002",
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    department: "Dermatology",
    appointmentTime: "10:00 AM",
    status: "in-progress",
    priority: "urgent",
    waitTime: "0 min",
    position: 1,
  },
  {
    id: "T003",
    name: "Amit Singh",
    phone: "+91 98765 43212",
    department: "Orthopedics",
    appointmentTime: "10:30 AM",
    status: "waiting",
    priority: "normal",
    waitTime: "45 min",
    position: 7,
  },
  {
    id: "T004",
    name: "Sunita Devi",
    phone: "+91 98765 43213",
    department: "Cardiology",
    appointmentTime: "11:00 AM",
    status: "completed",
    priority: "normal",
    waitTime: "15 min",
    position: 0,
  },
];

const departments = [
  { name: "Cardiology", current: 12, waiting: 8, avgWait: "20 min" },
  { name: "Dermatology", current: 8, waiting: 5, avgWait: "15 min" },
  { name: "Orthopedics", current: 15, waiting: 12, avgWait: "35 min" },
  { name: "Neurology", current: 6, waiting: 3, avgWait: "25 min" },
  { name: "Pediatrics", current: 18, waiting: 10, avgWait: "18 min" },
];
// Sample data to initialize the Bed collection
const beds = [
  {
    bedId: "B101",
    ward: "General",
    floor: "1",
    room: "101",
    status: "available",
    patient: null,
    doctor: "",
    condition: "",
    admitDate: null,
    dischargeDate: null
  },
  {
    bedId: "B102",
    ward: "General",
    floor: "1",
    room: "101",
    status: "occupied",
    patient: { name: "Rajesh Kumar", id: "T001" },
    doctor: "Dr. Sharma",
    condition: "Stable",
    admitDate: new Date("2025-08-10"),
    dischargeDate: null
  },
  {
    bedId: "B201",
    ward: "ICU",
    floor: "2",
    room: "201",
    status: "occupied",
    patient: { name: "Priya Sharma", id: "T002" },
    doctor: "Dr. Verma",
    condition: "Critical",
    admitDate: new Date("2025-08-12"),
    dischargeDate: null
  },
  {
    bedId: "B202",
    ward: "ICU",
    floor: "2",
    room: "201",
    status: "available",
    patient: null,
    doctor: "",
    condition: "",
    admitDate: null,
    dischargeDate: null
  }
];


const inventoryData = [
  {
    itemId: "MED001",
    name: "Paracetamol 500mg",
    category: "Medicine",
    stock: 120,
    status: "In Stock",
    unit: "Tablets",
    last_updated: new Date(),
    createdAt: new Date()
  },
  {
    itemId: "MED002",
    name: "Amoxicillin 250mg",
    category: "Medicine",
    stock: 20,
    status: "Low Stock",
    unit: "Capsules",
    last_updated: new Date(),
    createdAt: new Date()
  },
  {
    itemId: "SUP001",
    name: "Surgical Gloves",
    category: "Supplies",
    stock: 0,
    status: "Out of Stock",
    unit: "Pairs",
    last_updated: new Date(),
    createdAt: new Date()
  },
  {
    itemId: "EQP001",
    name: "Digital Thermometer",
    category: "Equipment",
    stock: 15,
    status: "In Stock",
    unit: "Pieces",
    last_updated: new Date(),
    createdAt: new Date()
  },
  {
    itemId: "SUP002",
    name: "Face Masks",
    category: "Supplies",
    stock: 50,
    status: "In Stock",
    unit: "Pieces",
    last_updated: new Date(),
    createdAt: new Date()
  }
];





module.exports = { queueData, departments ,beds, inventoryData };
