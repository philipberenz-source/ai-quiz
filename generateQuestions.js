import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.bard_key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export default async function generateQuiz(category, difficulty) {
  const seed = Math.floor(Math.random() * 1000000); // random seed for uniqueness 
const prompt = `
Du bist eine kreative Quiz-KI. Deine Aufgabe ist es, 3 einzigartige, spannende und alltagsnahe Quizfragen in der Kategorie "${category}" auf dem Schwierigkeitsgrad "${difficulty}" zu erstellen.

Wichtige Regeln:
- Schreibe **alles ausschließlich auf Deutsch**
- Jede Frage soll wie in einer Quizshow ("Wer wird Millionär?") kurz, klar und interessant formuliert sein
- Fragen sollen sich auf Alltag, Kultur, Geschichte, Medien, bekannte Fakten oder allgemein verständliche Themen beziehen
- Gib **genau vier Antwortmöglichkeiten** (eine richtige, drei falsche, aber plausible)
- Antworten sollen kurz und prägnant sein (ein bis wenige Wörter, keine langen Sätze)
- Füge für jede richtige Antwort eine kurze, verständliche Erklärung in Deutsch hinzu
- Keine Wiederholungen oder zu ähnliche Fragen
- Keine langen oder komplizierten Formulierungen

Gib das Ergebnis ausschließlich in folgendem JSON-Array-Format zurück — ohne Markdown, ohne Codeblöcke, ohne Kommentare:
[
  {
    "question": "Frage auf Deutsch...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Die korrekte Antwort",
    "explanation": "Kurze Erklärung auf Deutsch."
  },
  ...
]

Seed für diese Generation: ${seed}
Erstelle jetzt 3 neue, alltagsnahe Quizfragen in der Kategorie "${category}" auf dem Schwierigkeitsgrad "${difficulty}" in Deutsch. Antworte ausschließlich mit dem JSON-Array.
`;



  try {
    const response = await axios.post(url, {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const quiz = JSON.parse(jsonText);
    return quiz;
  } catch (err) {
    console.error("Error generating quiz:", err.response?.data || err.message);
  }
}

