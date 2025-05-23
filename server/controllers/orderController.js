
//place order cod : /api/order/cod

import Order from "../models/order.js";
import Product from "../models/product.js";

export const placeOrderCOd = async(req, res)=>{

    try {
        
        const {userId, items, adress} = req.body;
        if(!adress || items.length === 0 ){
            return res.json({success:false, mssage: "invalid data"})
        }

        //calculate abount using items

        let amount = await items.reduce(async(acc, item)=>{

            const product = await Product.findById(item.product);
             
            return (await acc ) + product.offerPrice * item.quantity;
        },0)

        // tax 2% 

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            adress,
            paymenType: "COD",
        });
        return res.json({success:true, message:"order placed successfully" })

    } catch (error) {

        return res.json({success:false, message: error.message})
        
    }

}


//get users by user id :/api/order/user

export const getUserOrders = async(req, res)=>{

    try {

        const {userId} = req.body;

        const orders = await Order.find({userId,
            $or:[{paymenType:"COD"}, {isPaid: true}]
        }).populate("items.product adress ").sort({createdAt: -1 })
        res.json({success:true, orders });
        
    } catch (error) {

        res.json({success:false, message:error.message });

        
    }

}

//get all orders : seller and admin : /api/order/seller

export const getAllOrders = async(req, res)=>{

    try {

        const orders = await Order.find({$or:[{paymenType:"COD"}, {isPaid: true}]
        }).populate("items.product adress ").sort({createdAt: -1 })
        res.json({success:true, orders });
        
    } catch (error) {

        res.json({success:false, message:error.message });

        
    }

}