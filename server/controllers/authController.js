import { createUser, findUserByEmail } from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const isExist = await findUserByEmail(email);
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createUser(name, email, passwordHash);

    //  Generate JWT
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if user exists
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    //  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //  Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
