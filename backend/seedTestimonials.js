const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const seedTestimonials = [
  {
    studentName: "Priya Sharma",
    studentRole: "Computer Science Student",
    scholarshipName: "Rhodes Scholarship",
    university: "University of Oxford",
    country: "United Kingdom",
    quote: "The AI mock interviews on ScholarCatalyst gave me the confidence to face the toughest questions. I practiced for weeks before my actual Rhodes interview.",
    fullStory: `When I first decided to apply for the Rhodes Scholarship, I was overwhelmed by the competition. Coming from a small town in India, I felt like an outsider.

ScholarCatalyst's AI Interview Prep became my secret weapon. I ran through over 30 mock sessions, each one getting more challenging. The AI panelist pushed me on topics I hadn't considered — my leadership philosophy, my plans for social impact, and how I'd handle cultural transitions.

The real breakthrough came when the AI identified that I was too modest about my achievements. It kept asking me to elaborate, forcing me to articulate my impact clearly. By the time I sat in front of the actual Rhodes panel, I was ready.

My advice to future applicants: start early, be authentic, and don't let the AI's tough questions discourage you — they'll make you stronger.

I'm now at Oxford studying AI for Social Good, and every day I feel grateful for the preparation I had.`,
    year: 2025,
    featured: true,
    isActive: true
  },
  {
    studentName: "Marcus Chen",
    studentRole: "Biomedical Engineering Student",
    scholarshipName: "Gates Cambridge Scholarship",
    university: "University of Cambridge",
    country: "United Kingdom",
    quote: "I used ScholarCatalyst to track my applications and generate SOPs. The scholarship matching algorithm led me to opportunities I didn't even know existed.",
    fullStory: `As a first-generation college student, navigating the scholarship landscape was like walking through a maze blindfolded. I knew I had the grades, but finding the right opportunities was the real challenge.

ScholarCatalyst's recommendation engine surprised me. It matched me with the Gates Cambridge Scholarship — something I wouldn't have applied for on my own because I thought I wasn't "competitive enough."

The AI SOP Generator helped me structure my statement around my research in low-cost medical devices, and the Profile Builder forced me to think deeply about my goals and motivations.

The application process taught me more about myself than I expected. I learned to connect my personal story to my academic aspirations in ways that resonated with the selection committee.

Today I'm at Cambridge developing affordable diagnostic tools, and I owe part of that journey to having the right tools at the right time.`,
    year: 2025,
    featured: false,
    isActive: true
  },
  {
    studentName: "Amina Okafor",
    studentRole: "Environmental Science Student",
    scholarshipName: "Fulbright Foreign Student Program",
    university: "Stanford University",
    country: "United States",
    quote: "The community forum on ScholarCatalyst connected me with past Fulbright scholars who guided my entire application process.",
    fullStory: `Growing up in Lagos, Nigeria, the idea of studying at Stanford seemed like a distant dream. But my passion for climate change research drove me to explore every opportunity.

I discovered ScholarCatalyst while searching for environmental science scholarships. The platform's community feature was a game-changer — I connected with three previous Fulbright scholars who shared their real experiences, interview tips, and application strategies.

The deadline calendar kept me on track with multiple scholarship deadlines, and the document vault helped me organize my research publications, recommendation letters, and transcripts in one place.

What made the difference was the AI Interview Prep. I practiced answering questions about my climate research in Kenya, and the feedback helped me articulate complex ideas simply and passionately.

Now at Stanford, I'm working with researchers who share my vision for climate solutions in Africa.`,
    year: 2024,
    featured: false,
    isActive: true
  },
  {
    studentName: "Diego Martinez",
    studentRole: "Economics Student",
    scholarshipName: "Chevening Scholarships UK",
    university: "London School of Economics",
    country: "United Kingdom",
    quote: "ScholarCatalyst's SOP generator helped me transform my rough ideas into a compelling narrative about economic development in Latin America.",
    fullStory: `I was working as a research assistant at a small university in Mexico when I decided to apply for Chevening. My academic record was strong, but I struggled to write a statement that captured my vision for economic reform.

ScholarCatalyst's AI SOP Generator was like having a professional writing coach. I fed it my key experiences — my work on rural microfinance, my published research on income inequality, and my dream of advising the Mexican government on economic policy.

The AI drafted a structured, compelling SOP that wove my experiences into a coherent narrative. I edited it heavily, but the foundation was solid.

The application tracker kept me organized across multiple scholarships, and the deadline calendar was my daily companion.

Now at LSE, I'm surrounded by brilliant minds and working toward the policy changes I dreamed about.`,
    year: 2024,
    featured: false,
    isActive: true
  },
  {
    studentName: "Fatima Al-Rashid",
    studentRole: "Public Health Student",
    scholarshipName: "Erasmus Mundus Joint Masters",
    university: "University of Copenhagen & Sciences Po",
    country: "Denmark & France",
    quote: "The document vault saved me hours of searching through files. Everything was organized, and I could focus on what mattered — my application.",
    fullStory: `Applying for the Erasmus Mundus program meant coordinating documents across multiple universities, recommendation letters from different professors, and tailoring SOPs for each institution.

ScholarCatalyst's Document Vault became my central hub. I uploaded my transcripts from Jordan, my volunteer certificates from refugee health camps, and my research papers — all tagged and organized by type.

When it was time to apply, everything was just a click away. No more frantic emails to professors asking them to resend letters.

The scholarship matching algorithm also connected me with smaller grants that covered my living expenses in Europe — funds I would have never found on my own.

Now studying in Copenhagen and Paris, I'm gaining the global perspective I need to improve healthcare systems in the Middle East.`,
    year: 2025,
    featured: false,
    isActive: true
  },
  {
    studentName: "Kenji Tanaka",
    studentRole: "Robotics Engineering Student",
    scholarshipName: "Google Generation Scholarship",
    university: "Carnegie Mellon University",
    country: "United States",
    quote: "I practiced my Google interview 15 times on ScholarCatalyst. Each session made me sharper and more confident.",
    fullStory: `Google's scholarship program is notoriously competitive. They don't just look at grades — they want innovators, leaders, and people who will shape the future of tech.

I knew my robotics projects were strong, but I needed to articulate my vision clearly. ScholarCatalyst's AI Interview Prep simulated the exact type of questions Google would ask — from technical challenges to ethical dilemmas in AI.

Each session gave me feedback on my answers, pushing me to be more specific and structured. By my 15th practice, I was answering with the clarity and confidence of someone who had done this before.

The Document Vault kept my project portfolio organized, and the community forum connected me with past Google scholars who shared insider tips.

I'm now at CMU working on autonomous robotics for disaster response — my childhood dream made real.`,
    year: 2025,
    featured: false,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/scholarcatalyst');
    console.log('Connected to MongoDB.');

    const existing = await Testimonial.countDocuments();
    if (existing > 0) {
      console.log(`Testimonials already exist (${existing}). Skipping seed.`);
      process.exit(0);
    }

    await Testimonial.insertMany(seedTestimonials);
    console.log(`Database seeded with ${seedTestimonials.length} success stories!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding testimonials:', error);
    process.exit(1);
  }
};

seedDatabase();
