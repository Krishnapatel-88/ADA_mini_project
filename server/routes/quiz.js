const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

router.post('/', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return res.status(400).json({
      error: 'Groq API Key is not configured on the server. Please add your GROQ_API_KEY in the .env file to generate dynamic quizzes with AI.',
      code: 'GROQ_KEY_MISSING'
    });
  }

  const {
    category = 'Sorting Algorithms',
    algorithm = 'Merge Sort',
    difficulty = 'Medium',
    count = 5,
    questionTypes = ['MCQ', 'complexity', 'conceptual'],
    language = 'English'
  } = req.body;

  const validCount = Math.min(Math.max(parseInt(count, 10) || 5, 3), 15);

  const prompt = `You are an expert Computer Science evaluator creating a rigorous, high-quality test for Algorithm Design & Analysis (ADA).

Generate exactly ${validCount} multiple-choice questions on:
- Topic / Algorithm: "${algorithm}"
- Category: "${category}"
- Difficulty: "${difficulty}"
- Requested Question Styles: ${Array.isArray(questionTypes) ? questionTypes.join(', ') : questionTypes}
- Language: ${language === 'Hindi' ? 'Hindi / clear Hinglish suitable for Indian engineering university exams' : 'English'}

CRITICAL RULES:
1. Technical correctness is paramount. Verify all Big-O complexities, recurrence relations, loop invariants, and code logic.
2. For code prediction questions, write clean, syntactically valid JavaScript or standard C/Java-like pseudocode.
3. Every question must have exactly 4 distinct, plausible options.
4. "correctIndex" MUST be an integer between 0 and 3 corresponding to the correct option index in the "options" array.
5. Provide a thorough "explanation" elucidating why the chosen answer is right and why the common pitfalls are wrong.
6. Return valid JSON only, conforming strictly to this JSON schema:

{
  "quizTitle": "Quiz on ${algorithm}",
  "topic": "${algorithm}",
  "category": "${category}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "type": "mcq" | "output_prediction" | "complexity" | "conceptual",
      "question": "Question text here",
      "codeSnippet": "optional code snippet or null",
      "options": [
        "First option",
        "Second option",
        "Third option",
        "Fourth option"
      ],
      "correctIndex": 0,
      "explanation": "Detailed explanation"
    }
  ]
}`;

  try {
    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a strict JSON generator for computer science algorithms quizzes. Respond ONLY with valid JSON matching the requested schema.'
        },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
      max_tokens: 900
    });

    const rawContent = completion.choices[0]?.message?.content || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawContent);
    } catch (parseErr) {
      // Clean possible markdown code fences if returned
      const cleaned = rawContent.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    // Validate structure
    if (!parsedData || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
      throw new Error('AI returned an invalid quiz schema: missing questions array');
    }

    const validatedQuestions = parsedData.questions.map((q, idx) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length < 4) {
        throw new Error(`Question ${idx + 1} has invalid options or text`);
      }
      const correctIdx = Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex <= 3
        ? q.correctIndex
        : 0;

      return {
        id: idx + 1,
        type: q.type || 'mcq',
        question: String(q.question),
        codeSnippet: q.codeSnippet ? String(q.codeSnippet) : null,
        options: q.options.slice(0, 4).map(opt => String(opt)),
        correctIndex: correctIdx,
        explanation: String(q.explanation || 'No explanation provided.')
      };
    });

    return res.json({
      quizTitle: parsedData.quizTitle || `Quiz on ${algorithm}`,
      topic: algorithm,
      category,
      difficulty,
      language,
      questions: validatedQuestions
    });

  } catch (err) {
    console.error('Groq Quiz Generation Error:', err?.message || err);
    const status = err?.status || 500;
    return res.status(status).json({
      error: `Failed to generate quiz: ${err.message}`,
      code: 'QUIZ_GENERATION_FAILED'
    });
  }
});

module.exports = router;
