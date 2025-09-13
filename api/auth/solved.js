import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  solvedQuestions: { type: [Number], default: [] },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default async function handler(req, res) {
  await connectDB();
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.method === "GET") {
    // Return solved questions for the user
    return res.status(200).json({ solvedQuestions: user.solvedQuestions || [] });
  } else if (req.method === "POST") {
    // Add a question to solvedQuestions
    const { questionId } = req.body;
    if (!questionId) {
      return res.status(400).json({ message: "Question ID is required" });
    }
    if (!user.solvedQuestions.includes(questionId)) {
      user.solvedQuestions.push(questionId);
      await user.save();
    }
    return res.status(200).json({ message: "Question marked as solved", solvedQuestions: user.solvedQuestions });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
