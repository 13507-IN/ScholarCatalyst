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

// @desc    AI Interview Simulation
// @route   POST /api/ai/interview
// @access  Private
const interviewQuestion = async (req, res) => {
  try {
    const { scholarshipName, previousAnswers, history, userContext } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt;
    
    if (!history || history.length === 0) {
      prompt = `You are a strict scholarship interview panelist conducting a formal interview for the "${scholarshipName || 'a prestigious scholarship'}".

Ask ONE interview question to assess the candidate. Consider their background:
- Academic: ${userContext?.academicMarks || 'Not specified'}
- Stream: ${userContext?.stream || 'Not specified'}
- Career Goals: ${userContext?.careerGoals || 'Not specified'}

Ask questions about:
1. Their motivation and passion for their field
2. Leadership experiences
3. Challenges they've overcome
4. Their vision for making an impact
5. Why they deserve this specific scholarship

Start with an introductory question. Be professional but challenging. Ask only ONE question. Return JSON: {"question": "your question here", "tip": "brief tip on how to approach this type of question"}`;
    } else {
      const recentQnA = history.slice(-4).map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n');
      
      prompt = `You are a strict scholarship interview panelist. Previous exchange:\n${recentQnA}

${previousAnswers ? `Candidate's latest answer: "${previousAnswers}"` : ''}

${previousAnswers ? `Evaluate their answer briefly, then ask a follow-up or new question. Be analytical - if their answer was vague, push for specifics. If they mentioned something interesting, dig deeper.

Return JSON: {"feedback": "brief evaluation of their answer (1-2 sentences)", "question": "your next question", "tip": "brief tip"}` : 'Ask your next question based on the conversation flow. Return JSON: {"question": "your next question", "tip": "brief tip"}'}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\s*|\s*```/g, '').trim();
    
    res.json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    AI Interview Score
// @route   POST /api/ai/interview-score
// @access  Private
const interviewScore = async (req, res) => {
  try {
    const { history, scholarshipName } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullHistory = history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n\n');

    const prompt = `As a scholarship interview panelist, evaluate this complete interview for "${scholarshipName || 'a scholarship'}":

${fullHistory}

Provide a comprehensive evaluation. Return JSON:
{
  "overallScore": (number 0-100),
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "summary": "Overall evaluation paragraph (3-4 sentences)",
  "improvementTips": ["tip 1", "tip 2", "tip 3"]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\s*|\s*```/g, '').trim();
    
    res.json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSop, interviewQuestion, interviewScore };
