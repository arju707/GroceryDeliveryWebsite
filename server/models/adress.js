
import mongoose from "mongoose";

const adressSchema =new mongoose.Schema({

    userId: {type: String, required: true},
        firstName: {type: String, required: true},
            lastName: {type: String, required: true},
                email: {type: String, required: true},
                    street: {type: String, required: true},
                        city: {type: String, required: true},
                            zipcode: {type: Number, required: true},
                                country: {type: String, required: true},
                                    phone: {type: String, required: true}











})

const Adress = mongoose.models.adress || mongoose.model('adress', adressSchema)

export default Adress;