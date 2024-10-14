import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

// Loader Component
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
    <p>Please wait, processing your payment...</p>
  </div>
);

function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mobileNumber: '',
  });

  const navigate = useNavigate();

  // Function to calculate the total price of items in the cart
  const getTotalPrice = () => {
    const cart = JSON.parse(localStorage.getItem(`cart_${localStorage.getItem('username')}`)) || [];
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);

      const orderData = {
        username: localStorage.getItem('username'),
        items: JSON.parse(localStorage.getItem(`cart_${localStorage.getItem('username')}`)) || [],
        totalAmount: getTotalPrice(),
        paymentMethod,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      };

      console.log(orderData);

      try {
        const response = await fetch('http://localhost:4000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          alert('Payment Successful! Redirecting to invoice...');
          // localStorage.removeItem(`cart_${localStorage.getItem('username')}`);
          navigate('/invoice');
        } else {
          alert('Failed to save the order. Please try again.');
        }
      } catch (error) {
        console.error('Error during payment processing:', error);
        alert('An error occurred. Please try again later.');
      }
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayNowClick = () => {
    setShowPaymentForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'cash') {
      if (!formData.name || !formData.address || !formData.phoneNumber) {
        alert('Please enter your name, address, and phone number.');
        return;
      }
    } else if (paymentMethod === 'online') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.mobileNumber) {
        alert('Please fill out all the card details.');
        return;
      }
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout Page</h2>
      <div className="payment-gateway">
        <h4>Rescuerover Payment Gateway</h4>
        <button className="btn btn-primary" onClick={handlePayNowClick}>
          Pay Now
        </button>
      </div>

      {showPaymentForm && (
        <div className="payment-form-modal">
          <div className="payment-form-container">
            <div className="payment-header">
              <h3>Select Payment Method</h3>
              <button className="close-button" onClick={() => setShowPaymentForm(false)}>✕</button>
            </div>
            <div className="payment-options">
              <button
                className={`btn btn-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                Cash on Delivery
              </button>
              <button
                className={`btn btn-option ${paymentMethod === 'online' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('online')}
              >
                Online Payment
              </button>
            </div>

            {paymentMethod && (
              <form className="payment-form" onSubmit={handleSubmit}>
                {paymentMethod === 'cash' && (
                  <>
                    <h4>Cash on Delivery</h4>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'online' && (
                  <>
                    <h4>Online Payment</h4>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                <button className="btn btn-success" type="submit">
                  Pay
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {isLoading && <Loader />}
    </div>
  );
}

export default CheckoutPage;
