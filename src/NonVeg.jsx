import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './store';

function NonVeg() {
    const dispatch=useDispatch();
    const nonvegproducts=useSelector(state=>state.products.nonveg);
    const items=nonvegproducts.map((product,index)=>(
        <li key={index}>
            {product.name} - $ {product.price.toFixed(2)}
            <button onClick={()=>dispatch(addToCart(product))}>Add to cart</button>
        </li>
    ))
    
  return (
    <>
        <h1>Non Veg items</h1>
        <ul>{items}</ul>
    </>
  )
}

export default NonVeg
