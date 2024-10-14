import React from 'react';
import './Story.css'; // You can create this CSS file for styling

function Story() {
  return (
    <div className='story-content'>
      <div >
      <h2 className="mb-4 text-light">Our Story</h2>

        <p>
          <strong>Our Organization's Journey</strong>
        </p>
        <p>
          Our organization was founded in 2010 by Archita Pandey with a mission to provide
          a loving and caring environment for animals in need. It all began with a simple idea:
          to make a difference in the lives of pets who had been abandoned or were living in
          unfortunate conditions.
        </p>
        <p>
        Adopting a pet from RescueRover means giving a second chance to an animal in need.
        Many of our cats and dogs come from challenging situations, and with your love and support,
        they can find a fresh start and a forever home. By adopting, you're not only gaining a 
        loyal companion but also helping us continue our mission to rescue and care for animals in need.
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
            <li><strong>Number of Pets Rescued:</strong> 1500+</li>
            <li><strong>Number of Pets Adopted:</strong> 1000+</li>
          </ul>
        </div>
      </div>
    </div>
 );
}

export default Story;