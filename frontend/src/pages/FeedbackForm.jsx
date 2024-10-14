import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import message from '../helper/message';

function FeedbackForm() {
    const [success, setSuccess] = useState(false);
    const form = useRef();

    const sendFeedback = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('rescuerover', 'feedback_template', form.current, {
                publicKey: 'GBLIptEo_EafZfTgh',
            })
            .then(
                () => {
                    setSuccess(true);
                    message(
                        "Feedback Submitted",
                        "Thank you for your feedback! We appreciate your input and will get back to you soon.",
                        "success",
                        "OK"
                    );
                },
                (error) => {
                    console.error(error);
                    message(
                        "Feedback Submission Failed",
                        "We encountered an issue while submitting your feedback. Please try again later.",
                        "error",
                        "Retry"
                    );
                }
            );
    };

    if (success) {
        return <div className="container text-center m-5">Thank you for your feedback! We will get in touch with you soon.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">We Value Your Feedback</h2>
            <form ref={form} onSubmit={sendFeedback}>
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
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="container w-full mb-5">
                    <button type="submit" className="btn btn-primary">Submit Feedback</button>
                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
