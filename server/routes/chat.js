const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

router.post('/', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return res.status(400).json({
      error: 'Groq API Key is not configured on the server. Please add your GROQ_API_KEY in the .env file to enable AI features.',
      code: 'GROQ_KEY_MISSING'
    });
  }

  const { messages, context, language = 'English', skillLevel = 'Intermediate' } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Invalid request: "messages" array is required.',
      code: 'INVALID_REQUEST'
    });
  }

  // Sanitize message history (limit to last 15 messages)
  const sanitizedMessages = messages.slice(-15).map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: String(m.content || '').slice(0, 4000)
  }));

  const systemPrompt = `You are AlgoVista AI, an expert computer science professor and interactive algorithm tutor specializing in Algorithm Design and Analysis (ADA).

RESPONSE STRUCTURE & FORMATTING RULES:
1. Always structure your responses with clear markdown headings (###), bullet points, and clean visual spacing.
2. Structure format:
   - **🎯 Quick Intuition / Core Concept**: 1-2 concise sentences summarizing the crux of the answer.
   - **⚙️ Step-by-Step Breakdown / Mechanics**: Clear points or numbered steps explaining how it works or why.
   - **📊 Complexity Analysis**: Exact Time Complexity (Best, Average, Worst) and Auxiliary Space with short mathematical reasoning.
   - **💻 Example / Trace / Code**: Use syntax-highlighted code blocks with language tag (\`\`\`javascript or \`\`\`pseudo).
   - **💡 Key Exam / Interview Takeaway**: 1 practical tip or common pitfall students should watch out for.
3. Tone & Language:
   - If language is Hindi: Use natural, conversational Hinglish (Hindi explanation with standard English technical terms like "Array", "Divide & Conquer", "Recurrence", "Stack", "Time Complexity" that students use in exams).
   - If English: Use crisp, engaging, pedagogically rigorous explanations without fluff.
4. Mathematical notation: Use clean formatting like O(n log n), Θ(n²), Ω(1), T(n) = 2T(n/2) + O(n).
5. Always make your explanation visually skimmable and organized.

${context ? `CURRENT LEARNING CONTEXT:
- Topic / Algorithm: ${context.algorithm || 'General ADA'}
- Category: ${context.category || 'N/A'}
- Relevant Details: ${context.details || 'N/A'}
- Visualizer State: ${context.visualizerState || 'None'}` : ''}`;

  try {
    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

    const completion = await groq.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitizedMessages
      ],
      temperature: 0.5,
      max_tokens: 950,
    });

    const reply = completion.choices[0]?.message?.content || 'No response generated.';
    return res.json({ reply, model });
  } catch (err) {
    console.error('Groq API Chat Error:', err?.message || err);
    const status = err?.status || 500;
    const isRateLimit = err?.status === 429;
    const isAuthError = err?.status === 401;

    let friendlyMessage = 'Failed to communicate with Groq AI service.';
    if (isAuthError) {
      friendlyMessage = 'Invalid Groq API Key. Please verify the key in your .env file.';
    } else if (isRateLimit) {
      friendlyMessage = 'Groq API rate limit exceeded. Please wait a moment and try again.';
    } else if (err?.message) {
      friendlyMessage = `Groq Error: ${err.message}`;
    }

    return res.status(status).json({
      error: friendlyMessage,
      code: isAuthError ? 'AUTH_ERROR' : isRateLimit ? 'RATE_LIMIT' : 'AI_SERVICE_ERROR'
    });
  }
});

module.exports = router;
