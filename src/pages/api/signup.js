import userModel from "../../model/userModel";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, first_name, last_name, password, confirm_password } = req.body;

    if (!username || !first_name || !last_name || !password || !confirm_password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    await connectDB();

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new userModel({ username, first_name, last_name, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
