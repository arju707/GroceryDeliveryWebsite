
import mongoose from "mongoose";
import product from "./product.js";

const orderSchema = new mongoose.Schema({
        userId : {type: String, required:true, ref:'user'},
        items : [{
            product: {type: String, required:true, ref:'product'},
            quantity: {type: Number, required:true}
        }],
                    amount: {type: Number, required:true},
                            adress : {type: String, required:true, ref:'adress'},
                                    status : {type: String, default: 'order Placed'},
                                            paymentType : {type: String, required:true},
                                            isPaid : {type:Boolean, required:true, default: false},




},{timestamps:true})

    const Order  = mongoose.models.order || mongoose.model('order', orderSchema)


    export default Order