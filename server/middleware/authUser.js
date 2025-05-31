import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    console.log('fn called')
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDecode)
    if (tokenDecode.id) {
        console.log('iinside')
     req.userId=tokenDecode.id
      
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: "Error Message" });
  }
};

export default authUser;
