
//add adress : /api/adress/add

import Adress from "../models/adress.js"

export const addAdress = async(req,res)=>{

    try {
        const {adress, userId } = req.body
        await Adress.create({...adress, userId})
        res.json({success:true, message: "adress added successfully"})
    } catch (error) {

         console.log(error.message)
         res.json({ success:false, message:error.message  })
        
    }

}

//get adress : /api/adress/get

export const getAdress = async(req,res)=>{

    try {
                const { userId } = req.body
                const adresses= await Adress.find({userId})
                        res.json({success:true, adresses})


        
    } catch (error) {

        console.log(error.message)
         res.json({ success:false, message:error.message  })
        
    }
}

