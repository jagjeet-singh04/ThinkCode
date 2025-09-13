import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Full Name:</span> {profile.fullName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {profile.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Profile;
