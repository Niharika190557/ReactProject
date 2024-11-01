import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeCart } from './store';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeDiscountPercentage, setCouponCodeDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0); // Standard discount

  // Function to calculate all totals (original, discounted, and savings)
  const calculateTotals = () => {
    const originalTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (originalTotal * discount) / 100;
    const subtotalAfterDiscount = originalTotal - discountAmount;

    const couponDiscountAmount = (subtotalAfterDiscount * couponCodeDiscountPercentage) / 100;
    const finalTotal = subtotalAfterDiscount - couponDiscountAmount;
    const totalSavings = discountAmount + couponDiscountAmount;

    return {
      originalTotal: originalTotal.toFixed(2),
      finalTotal: finalTotal.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
    };
  };

  const { originalTotal, finalTotal, totalSavings } = calculateTotals();

  // Handle standard discount button clicks
  const applyDiscount = (percent) => {
    setDiscount(percent);
  };

  // Handle coupon code application
  const applyCoupon = () => {
    switch (couponCode) {
      case "WELCOME50":
        setCouponCodeDiscountPercentage(50);
        break;
      case "PATAKASALE":
        setCouponCodeDiscountPercentage(25);
        break;
      default:
        alert("Invalid coupon code");
        setCouponCodeDiscountPercentage(0);
        break;
    }
  };

  const items = cartItems.length > 0 ? (
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.name} - ${item.price.toFixed(2)} - {item.quantity}
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(increment(item.name))}>+</button>
          <button style={{ marginRight: '10px' }} onClick={() => dispatch(decrement(item.name))}>-</button>
          <button onClick={() => dispatch(removeCart(item.name))}>Remove</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no items in the cart.</p>
  );

  return (
    <>
      <h3>Cart Items</h3>
      {items}

      <h4>Total bill before discount: ${originalTotal}</h4>
    
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(10)}>Apply Discount 10%</button>
      <button style={{ marginRight: '10px' }} onClick={() => applyDiscount(20)}>Apply Discount 20%</button>
      <button onClick={() => applyDiscount(30)}>Apply Discount 30%</button>

      {/* Coupon code input */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button style={{ marginRight: '10px' }} onClick={applyCoupon}>Apply Coupon</button>
      </div>

      <p>Standard Discount Applied: {discount}%</p>
      <p>Coupon Code Discount Applied: {couponCodeDiscountPercentage}%</p>
      <p>Total Discount amount: ${totalSavings}</p>
      <h4>Final Bill After Discounts: ${finalTotal}</h4>
    </>
  );
}

export default Cart;
