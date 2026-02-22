import generateQuestions from "./generateQuestions.js";
import generateCategories from "./generateCategories.js";

export const createQuizService = ({
  generateQuestionsFn = generateQuestions,
  generateCategoriesFn = generateCategories,
} = {}) => ({
  async retrieveQuestions(category, difficulty) {
    return generateQuestionsFn(category, difficulty);
  },

  async retrieveCategories() {
    return generateCategoriesFn();
  },
});
