import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar } from "react-icons/fa";
import pizza from "../../../../Assets/rice.avif"

const foodItems = [
  {
    name: "Fried Rice",
    price: "₹90.00",
    rating: 4.8,
    reviews: 124,
    desc: "A delicious blend of stir-fried vegetables, fluffy rice, and savory sauces.",
    img: pizza,
  },
  {
    name: "Butter Chicken",
    price: "₹165.99",
    rating: 4.9,
    reviews: 236,
    desc: "Tender pieces of chicken cooked in a rich and creamy tomato-based gravy.",
    img: pizza,
  },
  {
    name: "Dal Makhani Rice Bowl",
    price: "₹135.49",
    rating: 4.7,
    reviews: 189,
    desc: "Rice + Dal Makhani cooked overnight in a rich cream-butter blend.",
    img: pizza,
  },
];

const CafeItems = () => {
  return (
     <div className="p-3">
      <div className="row gy-3">
        {foodItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center shadow-sm bg-white p-3 rounded-4">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-4 mb-2 mb-sm-0"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <div className="flex-grow-1 ms-sm-3">
                <div className="d-flex justify-content-between flex-wrap">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <span className="fw-bold text-warning">{item.price}</span>
                </div>
                <div className="text-muted small mb-1">
                  {item.desc.length > 60 ? item.desc.slice(0, 60) + "..." : item.desc}
                </div>
                <div className="d-flex align-items-center">
                  <FaStar className="text-warning me-1" />
                  <small className="me-2">{item.rating}</small>
                  <small className="text-muted">({item.reviews})</small>
                </div>
              </div>
              <div className="mt-2 mt-sm-0 ms-sm-3">
                <button className="btn btn-danger text-warning them-bg-black border-dark px-4 py-1 rounded-pill">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeItems;
