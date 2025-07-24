import React from "react";
import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import useIsMobile from "../../../../Utilities/IsMobile";

const RestaurantList = ({ restaurants, selectedCuisine, setSelectedCuisine, orderType }) => {
  const formatToTwoDecimals = (num) => {
    return Number(num).toFixed(2);
  };
  const isMobile = useIsMobile();

  return (
    <div className="p-3">
      <p className="text small fw-semibold mb-3 text-dark">
        Showing restaurants for :<br /> {selectedCuisine && <span className="text-white bg-dark fw-semibold p-2 me-1 cursor-pointer rounded-2 ">{selectedCuisine}</span>} {selectedCuisine && <span className="fs-5 text-white bg-dark p-1 rounded-2 px-2 cursor-pointer" onClick={() => setSelectedCuisine('')}>x</span>}
      </p>
      <div className="d-flex flex-column gap-3">
        {restaurants?.map((res, idx) => (
          <Link to={`/cafeMenu/${res.restaurantUuid}`} state={{ resDetail: res, orderType: orderType }}>
            <div
              key={idx}
              className="d-flex gap-3 p-2 rounded-3 shadow-sm align-items-start bg-white overflow-hidden"
              style={{
                border: "1px solid #eee",
                minHeight: "100px",
              }}>
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
                <h6 className="fw-bold mb-1 text-dark res-title">{res.title}</h6>
                <div className="d-flex align-items-center gap-2 flex-nowrap overflow-hidden">
                  {res?.cuisineList?.slice(0, 3).map((itm) => <p className="text-muted small mb-1 w-auto res-cuisines">{itm},</p>)}
                </div>
                <div className={`d-flex ${isMobile ? "flex-column justify-content-center align-items-start" : "flex-row align-items-center"} flex-wrap ${!isMobile && "gap-2"}`}>
                  <span className="text-success fw-semibold small res-cuisines">{res.open ? "Open" : "Close"}</span>
                  {res?.estimatedTimeArrival && <span className="text-muted small res-cuisines">{res?.estimatedTimeArrival} min</span>}
                  {res.rating > 0 && <span className="text-dark small fw-bold d-flex align-items-center gap-1 res-title">
                    <IoMdStar size={16} className="text-warning" /> {formatToTwoDecimals(res.rating)}
                  </span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div >
  );
};

export default RestaurantList;
