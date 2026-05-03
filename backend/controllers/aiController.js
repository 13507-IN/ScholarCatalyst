const { GoogleGenerativeAI } = require("@google/generative-ai");

// @desc    Generate SOP / Essay based on prompt
// @route   POST /api/ai/generate-sop
// @access  Private
const generateSop = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullPrompt = `You are an expert scholarship advisor. Help a student write a compelling Statement of Purpose (SOP) or essay for a scholarship application. Here are the details provided by the student: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ generatedText: text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSop };
