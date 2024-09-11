import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import message from '../helper/message';
import { useLocation } from 'react-router-dom';

function LeftOver() {
    const [success, setSuccess] = useState(false);
    const form = useRef();
    const location = useLocation();
    const { orgName, toEmail, service_id, template_id, publick_key } = location.state || {};

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(service_id, template_id, form.current, {
                publicKey: publick_key,
            })
            .then(
                () => {
                    setSuccess(true);
                    message(
                        "Thank you for your submission!",
                        "Your order has been received and we will collect it shortly. You will receive a confirmation email soon.",
                        "success",
                        "OK"
                    );
                },
                (error) => {
                    console.error(error);
                    message(
                        "Submission Failed",
                        "There was an issue submitting your request. Please try again later or contact support.",
                        "error",
                        "Retry"
                    );
                }
            );
    };

    if (success) {
        return <div className="container text-center m-5">Thank you for your submission! We will contact you soon.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Willing To Collect Leftovers</h2>
            <form ref={form} onSubmit={sendEmail}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="orgName" className="form-label">Name of Organization</label>
                        <input
                            type="text"
                            className="form-control"
                            id="orgName"
                            name="orgName"
                            value={orgName}
                            readOnly
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="toEmail" className="form-label">To Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="toEmail"
                            name="toEmail"
                            value={toEmail}
                            readOnly
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="fromEmail" className="form-label">From Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="fromEmail"
                            name="fromEmail"
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
                        <label htmlFor="collectionDate" className="form-label">Collection Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="collectionDate"
                            name="collectionDate"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="collectionTime" className="form-label">Collection Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="collectionTime"
                            name="collectionTime"
                            required
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

export default LeftOver;
