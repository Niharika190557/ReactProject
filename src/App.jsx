import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import NonVeg from "./NonVeg"
import Veg from "./Veg"
import PurchaseHistory from "./PurchaseHistory"
import Cart from "./Cart"
import AboutUs from "./AboutUs"
import ContactUs from "./ContactUs"
import './App.css';
import { useSelector } from "react-redux"
import GoogleLoginComponent from "./GoogleLoginComponent"
import { GoogleOAuthProvider } from "@react-oauth/google"
import FacebookLoginComponent from "./FacebookLoginComponent"

function App(){

  const cart= useSelector((state)=>state.cart)
  const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0)
  return(
<>

<GoogleOAuthProvider clientId="286870658655-mvpi72ip0dnpgga91bsti5ft3vjfippi.apps.googleusercontent.com">

     <GoogleLoginComponent />
     <FacebookLoginComponent />
</GoogleOAuthProvider>

<BrowserRouter>
<nav>
     <Link to='/home' className='nav-link'>Home</Link>
      <Link to='/veg' className='nav-link'>Veg items</Link>
      <Link to='/nonveg' className='nav-link'>NonVeg items</Link>
      <Link to='/cart' className='nav-link'>Cart ({totalItems})</Link>
      <Link to='/purchaseorder' className='nav-link'>Purchase Order</Link>
      <Link to='/aboutus' className='nav-link'>About Us</Link>
      <Link to='/contactus' className='nav-link'>Contact Us</Link>
  </nav>


 

<Routes>

<Route path='/home' element={<Home />} />
<Route path='/veg' element={<Veg />} />
<Route path='/nonveg' element={<NonVeg />} />
<Route path='/cart' element={<Cart />} />
<Route path='/purchaseorder' element={<PurchaseHistory />} />
<Route path='/aboutus' element={<AboutUs />} />
<Route path='/contactus' element={<ContactUs />} />

</Routes>
</BrowserRouter>


</>
  )
}
export default App