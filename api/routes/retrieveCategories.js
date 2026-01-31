import generateCategories from '../generateCategories.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category;
  const difficulty = req.query.difficulty;
  const questions = await generateCategories(category, difficulty);
  res.json(questions);
})
export default router;