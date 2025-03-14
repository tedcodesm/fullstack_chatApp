import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullname, email, password: hashedPassword });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        pasword: newUser.pasword,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error("error creating user");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user ) {
        console.log("user not found");
        return res.status(401).json({ message: "Incorrect credentials" });
    }
    const ispasswordcorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordcorrect) {
        console.log("incorrect password");
        return res.status(401).json({ message: "Incorrect credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({ 
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        pasword: user.pasword,
        profilepic: user.profilepic,
  
    });
  } catch (error) {
    console.error("error logging in user");
    res.status(500).json({ error: "Failed to login user" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("error logging out user");
    res.status(500).json({ error: "Failed to logout user" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user?._id; 

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    if (!profilepic) {
      return res.status(400).json({ error: "Profile picture is required." });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic, {
      allowed_formats: ["jpg", "png", "jpeg"], // Restrict file types
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Optimize image
    });

    if (!uploadResponse || !uploadResponse.secure_url) {
      throw new Error("Failed to upload image to Cloudinary.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ error: error.message || "Failed to update profile." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
    console.log("was able to check auth")
  } catch (error) {
    console.error("error checking auth");
    res.status(500).json({ error: "Failed to check auth" });
    
  }
}