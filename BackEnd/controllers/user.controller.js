import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All field required",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        message: "Password must be at least 5 characters",
      });
    }

    const isEmail = await userModel.findOne({ email });

    if (isEmail)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User created succesully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userModel.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
