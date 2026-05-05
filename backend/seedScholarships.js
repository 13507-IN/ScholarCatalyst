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
    eligibleLocations: [],
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
    maxIncome: 999999999,
    eligibleStreams: ["Science"],
    eligibleLocations: [],
    isActive: true
  },
  {
    title: "Rhodes Scholarship",
    description: "One of the most prestigious international scholarships, funding postgraduate study at the University of Oxford for exceptional students worldwide.",
    provider: "Rhodes Trust",
    amount: 70000,
    deadline: new Date('2026-10-01'),
    minMarks: 90,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Arts", "Engineering", "Commerce", "Humanities"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Fulbright Foreign Student Program",
    description: "Enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States.",
    provider: "Fulbright Commission",
    amount: 50000,
    deadline: new Date('2026-09-15'),
    minMarks: 85,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Arts", "Engineering", "Humanities", "Commerce"],
    eligibleLocations: ["USA", "Global"],
    isActive: true
  },
  {
    title: "Erasmus Mundus Joint Masters",
    description: "Prestigious EU-funded scholarship for students to pursue joint master's degrees across multiple European universities.",
    provider: "European Union",
    amount: 49000,
    deadline: new Date('2027-01-10'),
    minMarks: 80,
    maxIncome: 60000,
    eligibleStreams: ["Science", "Engineering", "Arts", "Commerce", "Humanities"],
    eligibleLocations: ["Europe", "Global"],
    isActive: true
  },
  {
    title: "Chevening Scholarships UK",
    description: "UK government's global scholarship program for future leaders to pursue a one-year master's degree at any UK university.",
    provider: "UK Foreign Office",
    amount: 40000,
    deadline: new Date('2026-11-05'),
    minMarks: 85,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Engineering", "Arts", "Commerce", "Business Administration"],
    eligibleLocations: ["UK", "Global"],
    isActive: true
  },
  {
    title: "Gates Cambridge Scholarship",
    description: "Full-cost award for outstanding applicants from any country outside the UK to pursue a postgraduate degree at the University of Cambridge.",
    provider: "Bill & Melinda Gates Foundation",
    amount: 65000,
    deadline: new Date('2026-12-10'),
    minMarks: 90,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Engineering", "Arts", "Humanities"],
    eligibleLocations: ["UK", "Global"],
    isActive: true
  },
  {
    title: "DAAD Scholarships Germany",
    description: "German Academic Exchange Service offers scholarships for international students to study at German universities at all academic levels.",
    provider: "DAAD",
    amount: 35000,
    deadline: new Date('2027-03-01'),
    minMarks: 80,
    maxIncome: 50000,
    eligibleStreams: ["Science", "Engineering", "Arts", "Humanities"],
    eligibleLocations: ["Germany", "Europe"],
    isActive: true
  },
  {
    title: "Australia Awards Scholarships",
    description: "Long-term awards administered by the Australian Government for students from developing countries to study in Australia.",
    provider: "Australian Government",
    amount: 45000,
    deadline: new Date('2026-09-30'),
    minMarks: 80,
    maxIncome: 40000,
    eligibleStreams: ["Science", "Engineering", "Commerce", "Humanities"],
    eligibleLocations: ["Australia", "Global"],
    isActive: true
  },
  {
    title: "MIT Need-Based Financial Aid",
    description: "MIT meets the full demonstrated financial need of all admitted students through grants, not loans.",
    provider: "Massachusetts Institute of Technology",
    amount: 75000,
    deadline: new Date('2027-01-01'),
    minMarks: 95,
    maxIncome: 80000,
    eligibleStreams: ["Science", "Engineering", "Computer Science"],
    eligibleLocations: ["USA", "Global"],
    isActive: true
  },
  {
    title: "Google Generation Scholarship",
    description: "For students pursuing computer science or related degrees who are passionate about technology and underrepresented in the field.",
    provider: "Google",
    amount: 10000,
    deadline: new Date('2026-08-15'),
    minMarks: 80,
    maxIncome: 100000,
    eligibleStreams: ["Computer Science", "Engineering"],
    eligibleLocations: ["USA", "Canada"],
    isActive: true
  },
  {
    title: "Microsoft AI Scholarship",
    description: "Supporting students committed to pursuing a career in artificial intelligence and machine learning.",
    provider: "Microsoft",
    amount: 15000,
    deadline: new Date('2026-10-30'),
    minMarks: 85,
    maxIncome: 120000,
    eligibleStreams: ["Computer Science", "Engineering", "Science"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Nelson Mandela Scholarship",
    description: "Empowering students from disadvantaged backgrounds who demonstrate leadership potential and a commitment to social change.",
    provider: "Mandela Foundation",
    amount: 20000,
    deadline: new Date('2027-02-15'),
    minMarks: 75,
    maxIncome: 30000,
    eligibleStreams: ["Arts", "Humanities", "Commerce", "Science"],
    eligibleLocations: ["Africa", "Global"],
    isActive: true
  },
  {
    title: "AAUW International Fellowships",
    description: "For women pursuing full-time graduate or postgraduate study in the United States who are not US citizens or permanent residents.",
    provider: "AAUW",
    amount: 30000,
    deadline: new Date('2026-11-15'),
    minMarks: 85,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Arts", "Engineering", "Humanities", "Commerce"],
    eligibleLocations: ["USA"],
    isActive: true
  },
  {
    title: "Tata Scholarship for Cornell University",
    description: "Provided by the Tata Education and Development Trust to support Indian undergraduates studying at Cornell University.",
    provider: "Tata Trusts",
    amount: 55000,
    deadline: new Date('2027-01-05'),
    minMarks: 90,
    maxIncome: 25000,
    eligibleStreams: ["Science", "Engineering", "Arts", "Commerce"],
    eligibleLocations: ["India"],
    isActive: true
  },
  {
    title: "Stanford Knight-Hennessy Scholars",
    description: "The largest, most comprehensive, fully-funded international graduate scholarship program at Stanford University.",
    provider: "Stanford University",
    amount: 80000,
    deadline: new Date('2026-10-10'),
    minMarks: 92,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Engineering", "Arts", "Commerce", "Business Administration", "Humanities"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Asian Development Bank Japan Scholarship",
    description: "For students from ADB borrowing member countries to pursue postgraduate studies in economics, management, science, and technology.",
    provider: "ADB-JSP",
    amount: 42000,
    deadline: new Date('2027-02-28'),
    minMarks: 80,
    maxIncome: 35000,
    eligibleStreams: ["Science", "Engineering", "Commerce", "Economics"],
    eligibleLocations: ["Asia", "Global"],
    isActive: true
  },
  {
    title: "Yale University Need-Based Aid",
    description: "Yale meets 100% of demonstrated financial need for all admitted students through scholarships and grants.",
    provider: "Yale University",
    amount: 70000,
    deadline: new Date('2027-01-02'),
    minMarks: 93,
    maxIncome: 75000,
    eligibleStreams: ["Science", "Arts", "Humanities", "Engineering", "Commerce"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Commonwealth Scholarships",
    description: "For students from Commonwealth countries to pursue master's and PhD studies in the UK.",
    provider: "Commonwealth Scholarship Commission",
    amount: 38000,
    deadline: new Date('2026-12-15'),
    minMarks: 85,
    maxIncome: 45000,
    eligibleStreams: ["Science", "Engineering", "Arts", "Humanities", "Commerce"],
    eligibleLocations: ["UK", "Commonwealth"],
    isActive: true
  },
  {
    title: "World Bank Graduate Scholarship",
    description: "For students from developing countries to pursue development-related postgraduate studies at select universities.",
    provider: "World Bank",
    amount: 35000,
    deadline: new Date('2026-11-30'),
    minMarks: 85,
    maxIncome: 30000,
    eligibleStreams: ["Economics", "Commerce", "Science", "Humanities"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Rotary Foundation Global Grants",
    description: "Funding for graduate-level coursework with a focus on humanitarian service, leadership development, and cultural understanding.",
    provider: "Rotary International",
    amount: 30000,
    deadline: new Date('2027-04-01'),
    minMarks: 80,
    maxIncome: 70000,
    eligibleStreams: ["Science", "Arts", "Humanities", "Commerce", "Engineering"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "P.E.O. International Scholarships",
    description: "For women from countries other than the US and Canada for graduate studies in the US or Canada.",
    provider: "P.E.O. Sisterhood",
    amount: 18000,
    deadline: new Date('2026-12-01'),
    minMarks: 80,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Arts", "Humanities", "Engineering", "Commerce"],
    eligibleLocations: ["USA", "Canada"],
    isActive: true
  },
  {
    title: "AWS Machine Learning Scholarship",
    description: "For students interested in cloud computing and machine learning who want to build careers in AI-powered solutions.",
    provider: "Amazon Web Services",
    amount: 12000,
    deadline: new Date('2026-09-30'),
    minMarks: 80,
    maxIncome: 999999999,
    eligibleStreams: ["Computer Science", "Engineering", "Science"],
    eligibleLocations: ["Global"],
    isActive: true
  },
  {
    title: "Hubert H. Humphrey Fellowship",
    description: "A 10-month non-degree fellowship for experienced professionals from designated countries to study in the United States.",
    provider: "US Department of State",
    amount: 45000,
    deadline: new Date('2026-08-01'),
    minMarks: 85,
    maxIncome: 999999999,
    eligibleStreams: ["Commerce", "Humanities", "Science", "Engineering"],
    eligibleLocations: ["USA"],
    isActive: true
  },
  {
    title: "Vanier Canada Graduate Scholarship",
    description: "One of Canada's most prestigious doctoral scholarships for students who demonstrate leadership skills and a high standard of academic achievement.",
    provider: "Government of Canada",
    amount: 50000,
    deadline: new Date('2026-11-01'),
    minMarks: 92,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Engineering", "Humanities", "Arts"],
    eligibleLocations: ["Canada"],
    isActive: true
  },
  {
    title: "Swiss Government Excellence Scholarships",
    description: "For foreign artists and young researchers from all countries to pursue a master's, PhD, or postdoc in Switzerland.",
    provider: "Swiss Confederation",
    amount: 30000,
    deadline: new Date('2026-12-31'),
    minMarks: 85,
    maxIncome: 999999999,
    eligibleStreams: ["Science", "Arts", "Engineering", "Humanities"],
    eligibleLocations: ["Switzerland", "Europe"],
    isActive: true
  },
  {
    title: "Inlaks Shivdasani Foundation Scholarship",
    description: "For Indian students to pursue higher education at top universities abroad in the fields of Fine Arts, Humanities, and Sciences.",
    provider: "Inlaks Foundation",
    amount: 100000,
    deadline: new Date('2027-03-15'),
    minMarks: 88,
    maxIncome: 999999999,
    eligibleStreams: ["Arts", "Humanities", "Science", "Commerce"],
    eligibleLocations: ["India"],
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarcatalyst');
    console.log('Connected to MongoDB.');

    await Scholarship.deleteMany();
    console.log('Cleared existing scholarships.');

    await Scholarship.insertMany(seedScholarships);
    console.log(`Database seeded successfully with ${seedScholarships.length} scholarships!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
