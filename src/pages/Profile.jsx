import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/auth/profile?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setProfile(data.user);
          else setError(data.message || "User not found");
        })
        .catch(() => setError("Failed to load profile"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError("No user logged in");
    }
  }, [user]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10 mt-8 sm:mt-16 flex flex-col items-center border border-purple-100">
        <div className="bg-gradient-to-tr from-purple-400 to-pink-400 p-4 rounded-full shadow-lg mb-4">
          <User className="w-12 h-12 text-white" />
        </div>

        {/* Questions Solved Section */}
        <div className="w-full mt-8">
          <h3 className="text-xl font-bold text-purple-600 mb-3 text-center">Questions Solved</h3>
          {profile.solvedQuestions && profile.solvedQuestions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded-lg">
                <thead>
                  <tr className="bg-purple-50 text-purple-800">
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Question ID</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Score</th>
                    <th className="px-3 py-2 text-left">Solved At</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.solvedQuestions.map((q, idx) => (
                    <tr key={q.questionId} className="border-t">
                      <td className="px-3 py-2">{idx + 1}</td>
                      <td className="px-3 py-2">{q.questionId}</td>
                      <td className="px-3 py-2">
                        {q.status === 'solved' || q.score === 100 ? (
                          <span className="text-green-600 font-semibold">Solved</span>
                        ) : q.status === 'partially-solved' || (q.score > 0 && q.score < 100) ? (
                          <span className="text-yellow-600 font-semibold">Partially Solved</span>
                        ) : (
                          <span className="text-gray-500 font-semibold">Unsolved</span>
                        )}
                      </td>
                      <td className="px-3 py-2">{q.score ?? '-'}</td>
                      <td className="px-3 py-2">{q.solvedAt ? new Date(q.solvedAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 text-center">No questions solved yet.</div>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-purple-700 text-center">Profile</h2>
        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <span className="font-semibold text-gray-700">Full Name:</span>
            <span className="text-gray-900 text-lg font-medium mt-1 sm:mt-0 break-all">{profile.fullName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900 text-lg font-medium mt-1 sm:mt-0 break-all">{profile.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
            <span className="font-semibold text-gray-700">Joined:</span>
            <span className="text-gray-900 text-lg font-medium mt-1 sm:mt-0">{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
