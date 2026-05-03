const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://scholar-catalyst.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scholarships', require('./routes/scholarshipRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('ScholarCatalyst API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
