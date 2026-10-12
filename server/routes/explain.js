const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

router.post('/', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return res.status(400).json({
      error: 'Groq API Key is not configured on the server. Please add your GROQ_API_KEY in the .env file to enable AI explanations.',
      code: 'GROQ_KEY_MISSING'
    });
  }

  const {
    type = 'code', // 'code', 'complexity', 'step', 'compare'
    algorithm = 'Merge Sort',
    code = '',
    customPrompt = '',
    language = 'English',
    skillLevel = 'Intermediate'
  } = req.body;

  let systemInstruction = `You are AlgoVista AI, a world-class algorithm analysis specialist.`;
  let userPrompt = '';

  const langNote = language === 'Hindi'
    ? 'Explain in clear conversational Hindi / Hinglish with English CS terminology so students easily grasp every detail.'
    : 'Explain in clear, precise English.';

  if (type === 'code') {
    userPrompt = `Please provide a line-by-line explanation of the following implementation for ${algorithm}.
Focus on:
1. Loop invariants and base cases.
2. How memory is allocated and manipulated.
3. Why this particular sequence of operations achieves correctness.
4. Edge cases handled or potential pitfalls.

Code:
\`\`\`javascript
${code}
\`\`\`

Language requirement: ${langNote}`;
  } else if (type === 'complexity') {
    userPrompt = `Provide a rigorous and intuitive analysis of the Time and Space Complexity for ${algorithm}.
Include:
1. Best-Case Time Complexity (with exact input conditions).
2. Average-Case Time Complexity (with probabilistic assumptions).
3. Worst-Case Time Complexity (with worst-case input example).
4. Auxiliary Space vs Total Memory (recursion stack depth, auxiliary arrays).
5. Mathematical derivation (recurrence relation, Master Theorem, or summation where applicable).

Language requirement: ${langNote}`;
  } else if (type === 'compare') {
    userPrompt = `Provide an in-depth comparative analysis between ${algorithm} and related algorithms.
Include:
1. Key algorithmic differences and paradigms.
2. Time & space trade-offs in practice vs theory.
3. Stability and in-place characteristics.
4. When to choose one over the other in real-world systems.

Language requirement: ${langNote}`;
  } else {
    userPrompt = `${customPrompt || `Explain the core mechanism of ${algorithm}.`}
Language requirement: ${langNote}
Skill level: ${skillLevel}`;
  }

  try {
    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

    const completion = await groq.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.4,
      max_tokens: 2500
    });

    const explanation = completion.choices[0]?.message?.content || 'No explanation generated.';
    return res.json({ explanation, model });
  } catch (err) {
    console.error('Groq Explain API Error:', err?.message || err);
    return res.status(err?.status || 500).json({
      error: `Explanation failed: ${err.message}`,
      code: 'EXPLAIN_ERROR'
    });
  }
});

module.exports = router;
