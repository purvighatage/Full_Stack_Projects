import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <p>{review.content}</p>
      {/* Add other review details as needed */}
    </div>
  );
};

export default ReviewCard;