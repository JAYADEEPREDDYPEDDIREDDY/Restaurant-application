import React, { useState } from 'react';
import "../styles/checkout.css";
import { useEffect } from 'react';
import axios from 'axios';
const CheckOut = () => {
    const [cartItems,setCartItems]=useState([]);
    
    const url=`${process.env.REACT_APP_LOCAL_HOST_URL}/images/`;
    useEffect(()=>{
        axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/cart`,{},
      {
        withCredentials: true, 
      }
    )
    .then((results) => {
      setCartItems(results.data)
    });
    })
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };
  return (
    <div>
     
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <div className="body">
        <div className="co-container">
          <div className="co-checkOut">
            <p><b>Checkout</b></p>
            <div className="co-checkOut-text">
              <p>Shipping</p>
              <p>/</p>
              <p><b>Payment Method </b></p>
              <p>/</p>
              <p>Confirmation</p>
            </div>
            <div className="co-exit-btn">
              <i className="fas fa-times co-exit-icon" />
            </div>
          </div>
          <hr />
          <div className="co-mid">
            <div className="co-done">
              <div>
                <p className="co-heading">Wallet</p>
                <hr />
              </div>
              <div className="co-cards">
              <div class="co-card">
              <img alt="discover" src="images/discoverCard.jpg" />
                            <p>Ending with 8899</p>
                        </div>
                        <div class="co-card">
                            <img alt="masterCard" src="images/masterCard.jpg" />
                            <p>Ending with 8899</p>
                        </div>
                        <div class="co-card">
                            <img alt="visa" src="images/visa.jpg" />
                            <p>Ending with 8899</p>
              </div>
              </div>
              <div>
                <p className="co-heading">New card</p>
                <hr />
              </div>
              <div className="input-form">
                <form>
                <div className="input-form">
                    <form>
                      <div className="form-input">
                        <input type="text" placeholder="Name of card" required />
                      </div>
                      <div className="form-input">
                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                      </div>
                      <div className="form-input spe">
                        <input type="text" placeholder="MM-YY" required />
                        <input type="text" placeholder="CVV" required />
                      </div>
                      <div className="co-continue">
                        <button type="submit" className>CONTINUE</button>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
            </div>
            <div className="co-cart">
            {cartItems.map(item => (
          
            <div className="co-item-1" key={item.id}>
                    <img alt="item1" src={url+item.image} />
                    <div className="co-item-text">
                      <span className="co-head">{item.name}</span>
                      <span className="co-details"></span>
                      <span>Quantity:{item.quantity}</span>
                    </div>
                    <div className="co-price">
                      <p>₹{item.price*item.quantity}</p>
                </div>
                  </div>
                  
                  ))}
              <hr style={{ marginTop: '120px' }} />
              <div className="co-total-section">
              <div className="co-total-div">
                      <span>Sub total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="co-total-div">
                      <span>Shipping</span>
                      <span>₹10</span>
                    </div>
                    <hr />
                    <div className="co-total-div">
                      <p>Total</p>
                      <p>₹{calculateTotal()+10}</p>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
