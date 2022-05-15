import React from "react";
import { Badge } from "react-bootstrap";

function Ratings({ ratings, numberOfRatings }) {
  return (
    <div className="d-flex justify-content-between">
      <div>
        {ratings >= 1 ? (
          <i className="fas fa-star"></i>
        ) : ratings >= 0.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}

        {ratings >= 2 ? (
          <i className="fas fa-star"></i>
        ) : ratings >= 1.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}

        {ratings >= 3 ? (
          <i className="fas fa-star"></i>
        ) : ratings >= 2.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}

        {ratings >= 4 ? (
          <i className="fas fa-star"></i>
        ) : ratings >= 3.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}

        {ratings >= 5 ? (
          <i className="fas fa-star"></i>
        ) : ratings >= 4.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </div>
      <div>
        <p>
          No of Ratings <Badge bg="secondary">{numberOfRatings}</Badge>
        </p>
      </div>
    </div>
  );
}

export default Ratings;
