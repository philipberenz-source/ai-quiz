import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.bard_key;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export default async function generateQuiz(category, difficulty) {
  const seed = Math.floor(Math.random() * 1000000);

  const prompt = `
You are a creative quiz AI.

Generate exactly 3 unique and engaging quiz questions for the category "${category}" at difficulty "${difficulty}".

Rules:
- Write everything in English only.
- Keep each question concise and interesting (quiz-show style).
- Use everyday knowledge topics (culture, history, media, science, current facts, etc.).
- Provide exactly four answer options per question.
- One answer must be correct and three should be plausible distractors.
- Keep answer options short (a few words only).
- Include a short English explanation for the correct answer.
- Avoid duplicate or near-duplicate questions.
- Return JSON only (no markdown, no code fences, no comments).

Return this exact JSON array shape:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct option text",
    "explanation": "Short explanation in English."
  }
]

Seed: ${seed}
`;

  try {
    const response = await axios.post(url, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const quiz = JSON.parse(jsonText);
    return quiz;
  } catch (err) {
    console.error("Error generating quiz:", err.response?.data || err.message);
  }
}
