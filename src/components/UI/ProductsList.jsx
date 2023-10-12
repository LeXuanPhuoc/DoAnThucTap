import React from 'react'
import ProductsCard from './ProductsCard'
const ProductsList = ({data}) => {
  return (
    <>
    {
      data.map(item=>(
        <ProductsCard item={item}/>

      ))
    }
        
       
    </>
  )
}

export default ProductsList