import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let aiClient = null;

function getClient() {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing VITE_GEMINI_API_KEY. Add it to your .env file and restart the dev server.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return aiClient;
}

// Extract text in a defensive way (SDK versions can differ slightly)
function extractText(resp) {
  if (!resp) return null;
  if (typeof resp.text === 'string' && resp.text.trim()) return resp.text;
  if (resp.output_text) return resp.output_text; // alternate aggregate field
  // Legacy style
  if (resp.candidates?.[0]?.content?.parts?.[0]?.text) {
    return resp.candidates[0].content.parts[0].text;
  }
  return null;
}

export const evaluateCodeWithGemini = async (problem, userCode) => {
  try {
    const structuredInstruction = `
You are an expert C++ code reviewer and judge (like a strict LeetCode evaluator).
When given a candidate C++ solution, perform a two-part response in this exact order:

A. First output a single JSON object inside a fenced code block (\`\`\`json).
This JSON must be strictly valid and parseable. Use the exact schema below:

\`\`\`json
{
  "accepted": boolean,                // true ONLY if solution is 100% correct
  "verdict": "ACCEPTED" | "REJECTED", // based on correctness
  "score": integer,                   // 0–100 (100 = perfect correctness + quality)
  "time_complexity": string,
  "space_complexity": string,
  "errors": [
    { "line": int | null, "message": string, "severity": "minor" | "major" | "critical" }
  ],
  "test_results": [
    { "input": string, "expected": string, "actual": string, "passed": boolean }
  ],
  "fixed_code": string | null,        // corrected code (if original is wrong)
  "patch": string | null,             // unified diff/patch from original to fixed
  "review": string                    // 2–3 line plain English summary for developer
}
\`\`\`

Rules:
- Output ONLY the JSON block first, no comments or extra text before it.
- JSON must be strictly valid and parseable, no trailing commas.
- After the JSON, you may provide additional human-readable review if you wish.

CONTEXT PROBLEM:
Title: ${problem.title}
Description: ${problem.description}
Difficulty: ${problem.difficulty}
Topic: ${problem.topic}

Examples:
${problem.examples.map((ex, i) => `Example ${i + 1}:
Input: ${ex.input}
Output: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

Constraints:
${problem.constraints.join('\n')}

CANDIDATE SOLUTION CODE:

\`\`\`
${userCode}
\`\`\`
`;

  const prompt = structuredInstruction;

    const client = getClient();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
            parts: [ { text: prompt } ]
        }
      ],
      // Optional generation config
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 0.9,
        maxOutputTokens: 1024
      }
    });

    const text = extractText(response);
    if (!text) {
      console.error('Gemini: Unexpected response shape', response);
      throw new Error('Empty response from model');
    }
    return text;
  } catch (err) {
    // Provide more context in dev
    console.error('[Gemini Evaluation Error]', err);
    throw new Error('Failed to evaluate code. Please try again.');
  }
};
