import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

function BestSellers() {

    const { products }= useAppContext();
  return products && (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div >
        <ProductCard product={products[0]}/>
        </div>
    </div>
  )
}

export default BestSellers