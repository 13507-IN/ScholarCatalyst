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

    const fullPrompt = `You are an expert scholarship advisor. Help a student write a compelling, well-structured Statement of Purpose (SOP) or essay for a scholarship application.

Write in markdown format with the following structure:
- A strong opening hook paragraph
- Clear sections with headings like "## Academic Background", "## Career Goals", "## Why This Scholarship", etc. (adapt to the details provided)
- Use bullet points for achievements where appropriate
- A persuasive closing paragraph
- Keep it professional, passionate, and specific

Student details: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ generatedText: text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSop };
