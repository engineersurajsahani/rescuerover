import React from 'react';
import './Story.css'; // You can create this CSS file for styling

function Story() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Story</h2>
      <div className="story-content">
        <p>
          <strong>Our Organization's Journey</strong>
        </p>
        <p>
          Our organization was founded in 1999 by Archita Pandey with a mission to provide
          a loving and caring environment for animals in need. It all began with a simple idea:
          to make a difference in the lives of pets who had been abandoned or were living in
          unfortunate conditions.
        </p>
        <p>
          Since its inception, we have grown from a small initiative into a thriving community
          dedicated to animal welfare. We have rescued and adopted out over 100+ pets,
          each one finding a new lease on life thanks to the support of our donors, volunteers,
          and partners.
        </p>
        <p>
          Our work is not just about providing shelter; it's about creating a better world for
          animals. With every pet rescued and adopted, we come one step closer to realizing our
          vision of a world where every animal has a loving home.
        </p>
        <p>
          Thank you for being a part of our journey. Your support makes a world of difference.
        </p>
        <div className="story-stats">
          <h4>Our Impact:</h4>
          <ul>
            <li><strong>Number of Pets Rescued:</strong> 500</li>
            <li><strong>Number of Pets Adopted:</strong> 100+</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Story;
