import { json } from "express"

//addProduct : /api/product/add
export const addProduct = async(req, res)=>{
    try {
        let productData = json.parse(req.body.productData)

        const images = req.files

    } catch (error) {
        
    }
}

//getProduct : /api/product/list
export const productList = async(req, res)=>{

}

//get single Product : /api/product/id
export const productById = async(req, res)=>{

}


//change stock : /api/product/stock
export const changeStock = async(req, res)=>{

}