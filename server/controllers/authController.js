import * as User from "../models/authModel.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = "1h";

if (!JWT_SECRET) {
  throw Error("JWT SECRET IS NOT PROVIDED");
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if email already exists
    const isExist = await User.findByEmail(email);
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const role = "user";
    // Create user
    const userId = await User.create(name, email, passwordHash, role);

    //  Generate JWT
    const token = jwt.sign({ userId, role }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //  Check if user exists
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Generate token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
