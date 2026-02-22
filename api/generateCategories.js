import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.bard_key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export default async function generateCategories() {
  const seed = Math.floor(Math.random() * 1000000); // random seed to ensure uniqueness

  const prompt = `
You are a creative quiz category generator AI.

Your task is to generate exactly **six unique quiz categories** that would be suitable for trivia-style questions.

Important requirements:
- The categories must be written entirely in **English**
- The categories should be diverse (not all geography, not all science, etc.)
- Avoid repetition and generic categories like just "General Knowledge"
- Each category must be phrased concisely (1-3 words max)
- The output must be **exactly six** distinct categories
- No explanations, no titles, no bullet points

Return the categories strictly in the following JSON array format:
[
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6"
]

Seed for this generation: ${seed}

Generate only the JSON array, nothing else.
`;

  try {
    const response = await axios.post(url, {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const categories = JSON.parse(jsonText);
    return categories;
  } catch (err) {
    console.error("Error generating categories:", err.response?.data || err.message);
  }
}

