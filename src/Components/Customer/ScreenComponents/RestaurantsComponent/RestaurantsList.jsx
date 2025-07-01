import React from "react";
import { Link } from "react-router-dom";

const RestaurantList = ({ restaurants }) => {
  const formatToTwoDecimals = (num) => {
    return Number(num).toFixed(2);
  };

  return (
    <div className="p-3">
      <p className="text-muted small fw-semibold mb-3 text-warning">
        Showing restaurants for :
      </p>
      <div className="d-flex flex-column gap-3">
        {restaurants?.map((res, idx) => (
          <Link to={`/cafeMenu/${res.restaurantUuid}`}>
            <div
              key={idx}
              className="d-flex gap-3 p-2 rounded-3 shadow-sm align-items-start bg-white overflow-hidden"
              style={{
                border: "1px solid #eee",
                minHeight: "100px",
              }}
            >
              <img
                src={res.restaurantBannerUrl}
                alt={res.title}
                className="rounded-3"
                style={{
                  width: "85px",
                  height: "85px",
                  objectFit: "cover",
                }}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1 text-warning res-title">{res.title}</h6>
                <div className="d-flex align-items-center gap-2 flex-nowrap overflow-hidden">
                  {res?.cuisineList?.slice(0, 3).map((itm) => <p className="text-muted small mb-1 w-auto res-cuisines">{itm},</p>)}
                </div>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="text-success fw-semibold small res-cuisines">{res.open ? "Open" : "Close"}</span>
                  {/* <span className="text-muted small">{res.time}</span> */}
                  <span className="text-warning small fw-bold d-flex align-items-center gap-1 res-title">
                    ⭐ {formatToTwoDecimals(res.rating)}
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
