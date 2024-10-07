import React from "react";

type StarRatingProps = {
  rating: number;
};

function StarRating({ rating }: StarRatingProps) {
  const MAX_STARS = 5; // You can change this based on your needs

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;

    const stars = [];

    // Render full gold stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: "gold" }}>
          &#9733;
        </span>,
      ); // Unicode star character
    }

    // Render half gold star if remainder is greater than 0
    if (remainder > 0) {
      stars.push(
        <span key="half" style={{ color: "gold" }}>
          &#9733;
        </span>,
      ); // Unicode star character
    }

    // Render empty gray stars to fill up the remaining space
    for (let i = stars.length; i < MAX_STARS; i++) {
      stars.push(
        <span key={i} style={{ color: "#D5D5D5" }}>
          &#9733;
        </span>,
      ); // Unicode star character
    }

    return stars;
  };

  return <div className="flex gap-1">{renderStars()}</div>;
}

export default StarRating;
