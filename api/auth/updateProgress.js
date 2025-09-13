import mongoose from "mongoose";
import User from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI;

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

  if (req.method === 'POST') {
    const { email, questionId, score } = req.body;

    if (!email || !questionId || score === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Determine status based on score
      let status = 'unsolved';
      if (score === 100) {
        status = 'solved';
      } else if (score > 0) {
        status = 'partially-solved';
      }

      // Check if user already has this question in their solvedQuestions
      const existingIndex = user.solvedQuestions.findIndex(
        item => item.questionId === questionId
      );

      if (existingIndex !== -1) {
        // Update existing entry if new score is higher
        if (score > user.solvedQuestions[existingIndex].score) {
          user.solvedQuestions[existingIndex] = {
            questionId,
            score,
            status,
            solvedAt: new Date()
          };
        }
      } else {
        // Add new entry
        user.solvedQuestions.push({
          questionId,
          score,
          status,
          solvedAt: new Date()
        });
      }

      await user.save();

      res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}