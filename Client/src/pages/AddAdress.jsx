import React, { useState } from 'react'
import { assets } from '../assets/assets'

//inputfield

const Inputfield= ({type, placeholder, name, handeChange, adress})=>(
    <input  className=' w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500  focus:border-primary transition '
    type={type}
    placeholder={placeholder}
    onChange={handeChange}
    name={adress[name]}
    required
     />
)

const AddAdress = () => {

    const [adress, setAdresses] = useState({
        firstName :'',
        lastName :'',
        email : '',
        street : '',
        city : '',
        state : '',
        zipcode : '',
        country : '',
        phone : '',
    })

    const handeChange =(e)=>{
        const {name, value} = e.target.value;

        setAdresses((prevAdress)=>({
            ...prevAdress,
            [name]:value,
        }))
    }
    
 const onSubmitHandler = async (e)=>{
    e.preventDefault();
 }
 
  return (
    <div className='mt-16 pb-16'>
        <p className=' text-2xl md:text-3xl text-gray-500'>Add Shipping
              <span className='font-semibold textpri text-primary'>  Adress </span>
             </p>

             <div className='flex  flex-col-reverse md:flex-row  justify-between mt-10'>
                <div className='flex-1 max-w-md'>

                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <Inputfield handleChange={handeChange} adress={adress} name="firstName" type="text" placeholder="FirstName" />
                            <Inputfield handleChange={handeChange} adress={adress} name="LastName" type="text" placeholder="LastName" />
                        </div>
                        <Inputfield handleChange={handeChange} adress={adress} name="Email" type="email" placeholder="example@demo.com" />
                        <Inputfield handleChange={handeChange} adress={adress} name="street" type="text" placeholder="Street" />

                            <div className='grid grid-cols-2 gap-4'>
                                <Inputfield handleChange={handeChange} adress={adress} name="City" type="text" placeholder="City" />
                                <Inputfield handleChange={handeChange} adress={adress} name="State" type="text" placeholder="State" />
                            </div>


                            <div className='grid grid-cols-2 gap-4'>
                                <Inputfield handleChange={handeChange} adress={adress} name="Zipcode" type="number" placeholder="Zipcode" />
                                <Inputfield handleChange={handeChange} adress={adress} name="Country" type="text" placeholder="Country" />
                            </div>

                            <Inputfield handleChange={handeChange} adress={adress} name="Phone" type="Number" placeholder="Phone" />

                            <button className='w-full mt-6  bg-primary hover:bg-primary-dull cursor-pointer text-white py-3 transition uppercase'>
                                Save Adress 
                            </button>

                    </form>

                </div>
                <img className='md:mr-16 mb-16  md:mt-0 ' src={assets.add_address_iamge} alt="adress" />

             </div>

    </div>
  )
}

export default AddAdress