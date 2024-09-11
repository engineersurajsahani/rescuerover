import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import message from '../helper/message';
import { useLocation } from 'react-router-dom';

function CheckoutForm() {
    const [success, setSuccess] = useState(false);
    const form = useRef();
    const location = useLocation();
    const { productId, productName } = location.state || {};

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('rescuerover', 'archita_pandey', form.current, {
                publicKey: 'mOyyQLOX0AQWwrNGm',
            })
            .then(
                () => {
                    setSuccess(true);
                    message(
                        "Thank you for your purchase!",
                        "Your order for the product will be processed soon. We will send you a confirmation email shortly.",
                        "success",
                        "OK"
                    );
                },
                (error) => {
                    console.error(error);
                    message(
                        "Order Submission Failed",
                        "We encountered an issue while processing your order. Please try again later or contact support.",
                        "error",
                        "Retry"
                    );
                }
            );
    };

    if (success) {
        return <div className="container text-center m-5">Thank you for purchasing! We will get in touch with you soon.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">I am willing to Buy the RescueRover Product</h2>
            <form ref={form} onSubmit={sendEmail}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name="category" id="category" className="form-select">
                            <option value="Tshirt">Tshirt</option>
                            <option value="Food">Food</option>
                            <option value="Cup">Cup</option>
                            <option value="Shampoo">Shampoo</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="productId" className="form-label">Product ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productId"
                            name="productId"
                            value={productId || ''}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            name="productName"
                            value={productName || ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className="container w-full mb-5">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;
