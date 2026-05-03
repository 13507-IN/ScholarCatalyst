const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Scholarship = require('./models/Scholarship');

// Load environment variables
dotenv.config();

// Define seed data
const seedScholarships = [
  {
    title: "Global Tech Innovators Scholarship",
    description: "Awarded to outstanding students pursuing degrees in Computer Science, IT, or Engineering who demonstrate a passion for innovation.",
    provider: "Global Tech Foundation",
    amount: 5000,
    deadline: new Date('2026-12-01'),
    minMarks: 85,
    maxIncome: 80000,
    eligibleStreams: ["Science", "Engineering", "Computer Science"],
    eligibleLocations: ["New York", "California", "Texas", "Global"],
    isActive: true
  },
  {
    title: "Women in STEM Excellence Grant",
    description: "Dedicated to supporting female students excelling in Science, Technology, Engineering, and Mathematics.",
    provider: "STEM Alliance",
    amount: 3500,
    deadline: new Date('2026-10-15'),
    minMarks: 80,
    maxIncome: 100000,
    eligibleStreams: ["Science", "Engineering", "Mathematics"],
    eligibleLocations: [], // Empty array means eligible for all locations in our scoring logic
    isActive: true
  },
  {
    title: "Community Impact Arts Fellowship",
    description: "For students in the Arts or Humanities who have made significant contributions to their local communities.",
    provider: "Creative Arts Council",
    amount: 2000,
    deadline: new Date('2026-08-30'),
    minMarks: 75,
    maxIncome: 60000,
    eligibleStreams: ["Arts", "Humanities", "Commerce"],
    eligibleLocations: ["Chicago", "New York"],
    isActive: true
  },
  {
    title: "Future Business Leaders Award",
    description: "A scholarship for ambitious Commerce and Business students aiming to become the next generation of industry leaders.",
    provider: "National Chamber of Commerce",
    amount: 4000,
    deadline: new Date('2026-11-20'),
    minMarks: 88,
    maxIncome: 120000,
    eligibleStreams: ["Commerce", "Business Administration"],
    eligibleLocations: [],
    isActive: true
  },
  {
    title: "Merit-Based Science Grant",
    description: "An unrestricted grant for high-achieving Science students regardless of financial background.",
    provider: "Science Research Institute",
    amount: 2500,
    deadline: new Date('2027-01-15'),
    minMarks: 95,
    maxIncome: 999999999, // High income threshold
    eligibleStreams: ["Science"],
    eligibleLocations: [],
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    // Connect to database using URI from env
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarcatalyst');
    console.log('Connected to MongoDB.');

    // Clear existing scholarships (optional, but good for a clean slate)
    // await Scholarship.deleteMany();
    // console.log('Cleared existing scholarships.');

    // Insert new data
    await Scholarship.insertMany(seedScholarships);
    console.log('Database seeded successfully with 5 scholarships!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
