import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import message from '../helper/message';

function AdoptForm() {
    const [success, setSuccess] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('rescuerover', 'archita_pandey', form.current, {
                publicKey: 'HvVruA2ogbtnZ9EKK',
            })
            .then(
                () => {
                    setSuccess(true);
                    message("Message sent successfully", "We will get back to you soon", "success", "OK");
                },
                (error) => {
                    console.error(error);
                    message("Message sending failed", "Please try again", "error", "OK");
                },
            );
    };

    if (success) {
        return <div className="container text-center m-5">Thank you for adopting! We will get in touch with you soon.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">I am willing to Adopt a Pet</h2>
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
                            <option value="Normal">Normal</option>
                            <option value="Special">Special</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="gender_of_pet" className="form-label">Gender Of Pet</label>
                        <select name="gender_of_pet" id="gender_of_pet" className="form-select">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="willing_to_adopt" className="form-label">Willing To Adopt</label>
                        <select name="willing_to_adopt" id="willing_to_adopt" className="form-select">
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="number_of_pets" className="form-label">Number Of Pets Adoption</label>
                        <input type="number" name="number_of_pets" className="form-control" id="number_of_pets" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="day" className="form-label">I will be visiting on</label>
                        <select name="day" id="day" className="form-select">
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="date_time" className="form-label">Visiting Date And Time</label>
                        <input type="datetime-local" name="date_time" id="date_time" className="form-control" />
                    </div>
                </div>
                <div className="container w-full mb-5">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AdoptForm;
