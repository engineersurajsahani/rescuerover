import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CollaboratorDetail.css';

const hotels = [
    {
        name: 'Flavor Street',
        email: 'flavourstreet242@gmail.com',
        image: `${process.env.PUBLIC_URL}/images/products/flavor-street.jpg`,
        years: 5,
        description: 'Provides leftover food for pets.',
        service_id: "rescuerover_service_id",
        template_id: "rescuerover_template_id",
        publick_key: "SWsr3EmBwpaslY5le"
    },
    {
        name: 'The Grand Table',
        email: 'grandtable68@gmail.com',
        image: `${process.env.PUBLIC_URL}/images/products/the-grand-table.jpg`,
        years: 3,
        description: 'Provides leftover food for pets.',
        service_id: "rescuerover_service_id",
        template_id: "rescuerover_template_id",
        publick_key: "jQbCr59EyefKqq3GX"
    },
    {
        name: 'Perfect Bites',
        email: 'perfectbites12@gmail.com',
        image: `${process.env.PUBLIC_URL}/images/products/perfect-bites.jpg`,
        years: 7,
        description: 'Provides leftover food for pets.',
        service_id: "rescuerover_service_id",
        template_id: "rescuerover_template_id",
        publick_key: "f_dBOjIf9S5Qzg54T"
    }
];

function CollaboratorDetail() {
    const { name } = useParams();
    const hotel = hotels.find(h => h.name === name);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/leftover`, {
            state: { 
                orgName: hotel.name, 
                toEmail: hotel.email, 
                service_id: hotel.service_id, 
                template_id: hotel.template_id, 
                publick_key: hotel.publick_key 
            }
        });
    };

    if (!hotel) return <div>Hotel not found</div>;

    // Retrieve user type from local storage
    const userType = localStorage.getItem('userType'); // Example: 'admin' or 'user'

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{hotel.name}</h2>
            <b>
                <p>At RescueRover, we are grateful for the generous support from restaurants, which donates a variety of surplus foods to help us care for our pets. Understanding what types of leftover foods are shared helps us ensure the best care and safety for our furry friends.</p>
            </b>
            <b>
                <p>All food is carefully handled and checked to ensure it meets the highest safety standards before being shared with our pets. We ensure that no foods with harmful ingredients for pets, such as onions, garlic, or chocolate, are included.</p>
            </b>
            <b>
                <p>Each donation from restaurants is more than just food; it’s a gesture of care that enriches the lives of the animals we love. We’re deeply grateful for their support and for everyone who helps make this possible.</p>
            </b>
            <div className="card">
                <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                <div className="card-body">
                    <p className="card-text">Years Collaborated: {hotel.years}</p>
                    <p className="card-text">{hotel.description}</p>
                    {/* Conditionally render the LeftOver button based on userType */}
                    {userType === 'admin' && (
                        <button className="btn btn-primary" onClick={handleClick}>LeftOver</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CollaboratorDetail;
