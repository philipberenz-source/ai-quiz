import generateQuestions from '../generateQuestions.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category;
  const difficulty = req.query.difficulty;
  const questions = await generateQuestions(category, difficulty);
  res.json(questions);
})
export default router;