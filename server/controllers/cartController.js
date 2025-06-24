
//update user cart data : /api/cart/update 

import User from "../models/UserSchema.js"

export const updateCart = async (req,res)=>{

    try {
        const {userId, cartItems} = req.body
        console.log(cartItems,"cart items");
        console.log(userId,"userId");
        
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({ success:true, message: "cart Updated" })

    } catch (error) {

         console.log(error.message);
        res.json({success:false,message:error.message}); 
        
        
    }

}