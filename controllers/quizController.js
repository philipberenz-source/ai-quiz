export const createQuizController = ({ quizService }) => ({
  async getQuestions(req, res) {
    const category = req.query.category;
    const difficulty = req.query.difficulty;
    const questions = await quizService.retrieveQuestions(category, difficulty);
    res.json(questions);
  },

  async getCategories(_req, res) {
    const categories = await quizService.retrieveCategories();
    res.json(categories);
  },
});
