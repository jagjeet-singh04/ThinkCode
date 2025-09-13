import React from "react";
import { Badge } from "../components/ui/Badge";

const getStatus = (question, solvedQuestions, partialScores) => {
  if (solvedQuestions.includes(question.id)) return "Solved";
  if (partialScores[question.id] && partialScores[question.id] < 100) return "Partially Solved";
  return "Unsolved";
};

const AllQuestionsList = ({ questions, solvedQuestions = [], partialScores = {} }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">All Questions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {questions.map((q) => {
              const status = getStatus(q, solvedQuestions, partialScores);
              return (
                <tr key={q.id}>
                  <td className="px-4 py-2 font-semibold text-gray-900">{q.title}</td>
                  <td className="px-4 py-2 text-gray-700">{q.topic}</td>
                  <td className="px-4 py-2">
                    <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'destructive'}>
                      {q.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {status === "Solved" && <Badge variant="success">Solved</Badge>}
                    {status === "Partially Solved" && <Badge variant="warning">Partially Solved</Badge>}
                    {status === "Unsolved" && <Badge variant="secondary">Unsolved</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllQuestionsList;
