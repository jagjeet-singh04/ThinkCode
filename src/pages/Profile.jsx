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
