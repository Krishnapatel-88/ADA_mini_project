const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const chatRouter = require('./routes/chat');
const quizRouter = require('./routes/quiz');
const explainRouter = require('./routes/explain');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Simple in-memory rate limiter per IP
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests/minute

app.use('/api', (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = requestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else {
    clientData.count++;
  }

  requestCounts.set(ip, clientData);

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too many requests. Please slow down and try again in a minute.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
  next();
});

// Periodic cleanup of rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// API Health Check
app.get('/api/health', (req, res) => {
  const key = process.env.GROQ_API_KEY?.trim();
  const isConfigured = Boolean(key && key !== 'your_groq_api_key_here');
  res.json({
    status: 'ok',
    service: 'AlgoVista API',
    groqConfigured: isConfigured,
    model: process.env.GROQ_MODEL || 'qwen/qwen3.8-27b',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/explain', explainRouter);

// Serve Static Frontend Assets
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'An internal server error occurred.',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 AlgoVista Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${publicPath}`);
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key || key === 'your_groq_api_key_here') {
    console.log(`⚠️  GROQ_API_KEY is not configured in .env.`);
    console.log(`ℹ️  Deterministic visualizers, lessons, solvers & resources are 100% active.`);
    console.log(`ℹ️  Set GROQ_API_KEY in .env to unlock real-time AI Tutor & AI Quizzes.`);
  } else {
    console.log(`✅ Groq AI is enabled with model: ${process.env.GROQ_MODEL || 'qwen/qwen3.8-27b'}`);
  }
  console.log(`===============================================`);
});
