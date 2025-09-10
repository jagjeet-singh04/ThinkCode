const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const evaluateCodeWithGemini = async (problem, userCode) => {
  try {
    const prompt = `
You are an expert programming mentor evaluating a coding solution. Please provide detailed feedback.

PROBLEM:
Title: ${problem.title}
Description: ${problem.description}
Difficulty: ${problem.difficulty}
Topic: ${problem.topic}

Examples:
${problem.examples.map((ex, i) => `
Example ${i + 1}:
Input: ${ex.input}
Output: ${ex.output}
${ex.explanation ? `Explanation: ${ex.explanation}` : ''}
`).join('')}

Constraints:
${problem.constraints.join('\n')}

USER'S SOLUTION:
\`\`\`
${userCode}
\`\`\`

Please evaluate this solution and provide:

1. **Correctness Analysis**: Does the solution correctly solve the problem?
2. **Logic Review**: Is the approach sound? Are there any logical errors?
3. **Edge Cases**: Does it handle edge cases properly?
4. **Time/Space Complexity**: What are the complexities?
5. **Code Quality**: Is the code clean and readable?
6. **Improvements**: Suggest optimizations or better approaches if any.

If the solution is correct, start your response with "✅ SOLUTION ACCEPTED"
If the solution has issues, start with "❌ SOLUTION NEEDS IMPROVEMENT"

Provide clear, constructive feedback that helps the user learn and improve.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to evaluate code. Please try again.');
  }
};
