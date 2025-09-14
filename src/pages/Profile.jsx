import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { User, CheckCircle, AlertCircle, XCircle, Mail, Calendar } from "lucide-react";

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


  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
      <span className="text-lg text-purple-700 font-semibold">Loading profile...</span>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <span className="text-xl text-red-500 font-bold mb-2">{error}</span>
    </div>
  );

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-[#f8fafc] via-[#f3e8ff] to-[#fdf2f8] flex flex-col items-center py-6 px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-5 sm:p-10 mt-4 sm:mt-12 flex flex-col items-center border border-purple-100 relative overflow-hidden">
        {/* Decorative gradient ring */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 rounded-full blur-2xl z-0 animate-pulse" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-pink-400/30 to-purple-400/30 rounded-full blur-2xl z-0 animate-pulse" />

        {/* Profile Card */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-4 rounded-full shadow-lg mb-4 border-4 border-white">
            <User className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 text-purple-700 text-center tracking-tight">{profile.fullName}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2">
            <span className="flex items-center gap-1 text-gray-700 text-base sm:text-lg font-medium"><Mail className="w-5 h-5 text-purple-400" />{profile.email}</span>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <span className="flex items-center gap-1 text-gray-700 text-base sm:text-lg font-medium"><Calendar className="w-5 h-5 text-pink-400" />Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Questions Solved Section */}
        <div className="w-full mt-10">
          <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center tracking-tight">Questions Solved</h3>
          {profile.solvedQuestions && profile.solvedQuestions.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow border border-purple-100 bg-white/80">
              <table className="min-w-full text-sm sm:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-800">
                    <th className="px-3 py-2 text-left font-semibold">#</th>
                    <th className="px-3 py-2 text-left font-semibold">Question ID</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Score</th>
                    <th className="px-3 py-2 text-left font-semibold">Solved At</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.solvedQuestions.map((q, idx) => (
                    <tr key={q.questionId} className="border-t hover:bg-purple-50/40 transition">
                      <td className="px-3 py-2 font-semibold text-gray-700">{idx + 1}</td>
                      <td className="px-3 py-2 font-mono text-purple-700">{q.questionId}</td>
                      <td className="px-3 py-2">
                        {q.status === 'solved' || q.score === 100 ? (
                          <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle className="w-4 h-4" />Solved</span>
                        ) : q.status === 'partially-solved' || (q.score > 0 && q.score < 100) ? (
                          <span className="flex items-center gap-1 text-yellow-600 font-semibold"><AlertCircle className="w-4 h-4" />Partially</span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400 font-semibold"><XCircle className="w-4 h-4" />Unsolved</span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-bold text-purple-600">{q.score ?? '-'}</td>
                      <td className="px-3 py-2 text-gray-600">{q.solvedAt ? new Date(q.solvedAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8 text-lg font-medium">No questions solved yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
