import React from "react";
import sampleImage from "../../../../Assets/rice.avif";
import { Link } from "react-router-dom";

const restaurants = [
  {
    name: "Pink panther - Mahim",
    cuisine: "Chinese Cuisine, Pan Asian",
    status: "Open",
    time: "30 min.",
    rating: 3.2,
    image: sampleImage,
  },
  {
    name: "Bhojanam - Mahim",
    cuisine: "North Indian",
    status: "Open",
    time: "30 min.",
    rating: 4.6,
    image: sampleImage,
  },
  {
    name: "Combos10 - Mahim",
    cuisine: "Chinese Cuisine, North Indian, Pan",
    status: "Open",
    time: "30 min.",
    rating: 5.0,
    image: sampleImage,
  },
  {
    name: "Oriental Majik - Mahim",
    cuisine: "Chinese Cuisine, Pan Asian",
    status: "Open",
    time: "30 min.",
    rating: 5.0,
    image: sampleImage,
  },
];

const RestaurantList = () => {
  return (
    <div className="p-3">
      <p className="text-muted small fw-semibold mb-3 text-warning">
        Showing restaurants for :
      </p>
      <div className="d-flex flex-column gap-3">
        {restaurants.map((res, idx) => (
          <Link to="/cafe">
            <div
              key={idx}
              className="d-flex gap-3 p-2 rounded-3 shadow-sm align-items-start bg-white"
              style={{
                border: "1px solid #eee",
                minHeight: "100px",
              }}
            >
              <img
                src={res.image}
                alt={res.name}
                className="rounded-3"
                style={{
                  width: "85px",
                  height: "85px",
                  objectFit: "cover",
                }}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1 text-warning">{res.name}</h6>
                <p className="text-muted small mb-1">{res.cuisine}</p>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="text-success fw-semibold small">{res.status}</span>
                  <span className="text-muted small">{res.time}</span>
                  <span className="text-warning small fw-bold d-flex align-items-center gap-1">
                    ⭐ {res.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
