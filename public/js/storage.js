/**
 * ADA Explorer - Storage Service
 * Manages LocalStorage persistence for progress, preferences, quiz history, and streak.
 */

const STORAGE_KEYS = {
  PREFERENCES: 'ada_preferences',
  COMPLETED_TOPICS: 'ada_completed_topics',
  RECENT_TOPICS: 'ada_recent_topics',
  QUIZ_HISTORY: 'ada_quiz_history',
  ACTIVITY: 'ada_activity_streak',
  SOLVER_HISTORY: 'ada_solver_history'
};

const DEFAULT_PREFERENCES = {
  theme: 'light', // 'light' | 'dark'
  language: 'English', // 'English' | 'Hindi'
  skillLevel: 'Intermediate', // 'Beginner' | 'Intermediate' | 'Advanced'
  goal: 'Semester Exams', // 'Semester Exams' | 'Interview Prep' | 'Competitive Programming' | 'Concept Mastery'
  explanationStyle: 'Standard'
};

class StorageService {
  constructor() {
    this.isAvailable = this.checkAvailability();
    this.memoryStore = {};
  }

  checkAvailability() {
    try {
      const testKey = '__ada_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('LocalStorage is not available. Falling back to in-memory session storage.');
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    if (!this.isAvailable) {
      return this.memoryStore[key] !== undefined ? this.memoryStore[key] : defaultValue;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.error(`Error reading key ${key} from LocalStorage:`, e);
      return defaultValue;
    }
  }

  setItem(key, value) {
    if (!this.isAvailable) {
      this.memoryStore[key] = value;
      return true;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing key ${key} to LocalStorage:`, e);
      return false;
    }
  }

  // Preferences
  getPreferences() {
    const prefs = this.getItem(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
    return { ...DEFAULT_PREFERENCES, ...prefs };
  }

  updatePreferences(updates) {
    const current = this.getPreferences();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.PREFERENCES, updated);
    return updated;
  }

  // Completed Topics
  getCompletedTopics() {
    return this.getItem(STORAGE_KEYS.COMPLETED_TOPICS, []);
  }

  isTopicCompleted(topicId) {
    const list = this.getCompletedTopics();
    return list.includes(topicId);
  }

  toggleTopicCompleted(topicId) {
    const list = this.getCompletedTopics();
    let updated;
    const isCompleted = list.includes(topicId);
    if (isCompleted) {
      updated = list.filter(id => id !== topicId);
    } else {
      updated = [...list, topicId];
      this.recordActivity();
    }
    this.setItem(STORAGE_KEYS.COMPLETED_TOPICS, updated);
    return !isCompleted;
  }

  // Recently Viewed Topics
  getRecentTopics() {
    return this.getItem(STORAGE_KEYS.RECENT_TOPICS, []);
  }

  addRecentTopic(topicId) {
    if (!topicId) return;
    let list = this.getRecentTopics();
    list = [topicId, ...list.filter(id => id !== topicId)].slice(0, 8);
    this.setItem(STORAGE_KEYS.RECENT_TOPICS, list);
    this.recordActivity();
  }

  // Quiz History
  getQuizHistory() {
    return this.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
  }

  recordQuizResult(record) {
    const history = this.getQuizHistory();
    const entry = {
      id: 'quiz_' + Date.now(),
      date: new Date().toISOString(),
      topic: record.topic || 'General ADA',
      category: record.category || 'General',
      difficulty: record.difficulty || 'Medium',
      score: record.score,
      total: record.total,
      percentage: Math.round((record.score / record.total) * 100),
      language: record.language || 'English'
    };
    const updated = [entry, ...history].slice(0, 25);
    this.setItem(STORAGE_KEYS.QUIZ_HISTORY, updated);
    this.recordActivity();
    return entry;
  }

  // Daily Streak & Activity Log
  getActivityData() {
    const today = new Date().toISOString().slice(0, 10);
    const data = this.getItem(STORAGE_KEYS.ACTIVITY, {
      lastActiveDate: today,
      streakDays: 1,
      totalActiveDays: 1,
      activityLog: { [today]: 1 }
    });
    return data;
  }

  recordActivity() {
    const today = new Date().toISOString().slice(0, 10);
    const data = this.getActivityData();

    if (!data.activityLog) data.activityLog = {};
    data.activityLog[today] = (data.activityLog[today] || 0) + 1;

    if (data.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (data.lastActiveDate === yesterday) {
        data.streakDays = (data.streakDays || 0) + 1;
      } else {
        data.streakDays = 1;
      }
      data.totalActiveDays = (data.totalActiveDays || 0) + 1;
      data.lastActiveDate = today;
    }

    this.setItem(STORAGE_KEYS.ACTIVITY, data);
    return data;
  }

  // Reset Progress
  resetAllProgress() {
    if (this.isAvailable) {
      window.localStorage.removeItem(STORAGE_KEYS.COMPLETED_TOPICS);
      window.localStorage.removeItem(STORAGE_KEYS.RECENT_TOPICS);
      window.localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
      window.localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
      window.localStorage.removeItem(STORAGE_KEYS.SOLVER_HISTORY);
    }
    this.memoryStore = {};
    return true;
  }

  // Export / Import
  exportData() {
    return {
      preferences: this.getPreferences(),
      completedTopics: this.getCompletedTopics(),
      recentTopics: this.getRecentTopics(),
      quizHistory: this.getQuizHistory(),
      activity: this.getActivityData(),
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  importData(importedObj) {
    if (!importedObj || typeof importedObj !== 'object') {
      throw new Error('Invalid JSON format');
    }
    if (importedObj.preferences) this.setItem(STORAGE_KEYS.PREFERENCES, importedObj.preferences);
    if (Array.isArray(importedObj.completedTopics)) this.setItem(STORAGE_KEYS.COMPLETED_TOPICS, importedObj.completedTopics);
    if (Array.isArray(importedObj.recentTopics)) this.setItem(STORAGE_KEYS.RECENT_TOPICS, importedObj.recentTopics);
    if (Array.isArray(importedObj.quizHistory)) this.setItem(STORAGE_KEYS.QUIZ_HISTORY, importedObj.quizHistory);
    if (importedObj.activity) this.setItem(STORAGE_KEYS.ACTIVITY, importedObj.activity);
    return true;
  }
}

// Global instance
window.adaStorage = new StorageService();
