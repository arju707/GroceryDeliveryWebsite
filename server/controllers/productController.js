import { json } from "express"

import {v2 as cloudinary} from "cloudinary"

import product from "../models/product.js"

//addProduct : /api/product/add
export const addProduct = async(req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imageUrl = await Promise.all(
            images.map(async(item)=>{

                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await product.create({...productData, image: imageUrl})

        res.json({success:true, message: "product added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message })
        
    }
}

//getProduct : /api/product/list
export const productList = async(req, res)=>{
    try {
        const products = await product.find({})
        res.json({success:true, products })
        
    } catch (error) {

        console.log(error.message);
        res.json({success:false, message:error.message })
        
    }

}

//get single Product : /api/product/id
export const productById = async(req, res)=>{

    try {
        
        const {id} = req.body
        const product = await product.findById(id)

        res.json({success:true, product})

    } catch (error) {

         console.log(error.message);
        res.json({success:false, message:error.message })
        
    }


}


//change stock : /api/product/stock
export const changeStock = async(req, res)=>{

    try {
        const {id, inStock} = req.body

        await product.findByIdAndUpdate(id, {inStock})
        
        res.json({success: true, message: "stock updated"})
    } catch (error) {

         console.log(error.message);
        res.json({success: false, message:error.message })
        
    }

}