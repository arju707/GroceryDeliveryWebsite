// User Authentication Controllers with localStorage token management
import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Already Exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedpassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(
      { userId, role: userRole },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    //refresh token setup in httponly cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // Return token in response instead of setting cookie
    return res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        cartItems:user.cartItems
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    console.log("reahced here 1");
    
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("reahced here 2");
    
    const refreshToken = jwt.sign(
      { id:user._id, },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    console.log("reahced here 3");
    
    //refresh token setup in httponly cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    
    console.log("reahced here 4");
    // Return token in response instead of setting cookie
    console.log(user,"user detials");
    
    return res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        cartItems:user.cartItems
      },

    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Check auth - now expects token in Authorization header
export const isAuth = async (req, res) => {
  try {
   const refreshToken = req.cookies.refreshToken;
   
    if (!refreshToken)
      res.status(403).json({ error: "Refresh tokekn required" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  console.log(refreshToken,"from reefresh token");
  
    const userId = decoded.id;
    console.log(userId,"user id from isAuth");
    

    const user = await User.findById(userId);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });



    return res.json({
      success: true,
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        cartItems:user.cartItems
      },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "error finding user" });
  }
};

// Logout - simplified since we're using localStorage
export const logout = async (req, res) => {
  try {
    // Since we're using localStorage, logout is handled on frontend
    // This endpoint can be used for any server-side cleanup if needed
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Middleware to verify token from Authorization header
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.name === "JsonWebTokenError") {
      return res.json({ success: false, message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.json({ success: false, message: "Token expired" });
    }
    res.json({ success: false, message: "Authentication failed" });
  }
};

// Alternative isAuth function that works with userId in body (for backward compatibility)
export const isAuthById = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    
  } catch (error) {}
};
