import React from "react";
import { Badge } from "react-bootstrap";
import "./styles/Rating.css";
function Ratings({ ratings, numberOfRatings }) {
  return (
    <div className="d-flex justify-content-between">
      <div>
        {ratings >= 1 ? (
          <i className="fas fa-star icon"></i>
        ) : ratings >= 0.5 ? (
          <i className="fas fa-star-half-alt icon"></i>
        ) : (
          <i className="far fa-star icon"></i>
        )}

        {ratings >= 2 ? (
          <i className="fas fa-star icon"></i>
        ) : ratings >= 1.5 ? (
          <i className="fas fa-star-half-alt icon"></i>
        ) : (
          <i className="far fa-star icon"></i>
        )}

        {ratings >= 3 ? (
          <i className="fas fa-star icon"></i>
        ) : ratings >= 2.5 ? (
          <i className="fas fa-star-half-alt icon"></i>
        ) : (
          <i className="far fa-star icon"></i>
        )}

        {ratings >= 4 ? (
          <i className="fas fa-star icon"></i>
        ) : ratings >= 3.5 ? (
          <i className="fas fa-star-half-alt icon"></i>
        ) : (
          <i className="far fa-star icon"></i>
        )}

        {ratings >= 5 ? (
          <i className="fas fa-star icon"></i>
        ) : ratings >= 4.5 ? (
          <i className="fas fa-star-half-alt icon"></i>
        ) : (
          <i className="far fa-star icon"></i>
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
