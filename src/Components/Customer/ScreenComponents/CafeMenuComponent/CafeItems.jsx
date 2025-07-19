import React from "react";
import { FaStar } from "react-icons/fa";
import { RiDragMoveLine } from "react-icons/ri";

const CafeItems = ({ resMenu, categoryRefs, addToCart, cart, updateQuantity, customizable }) => {
  return (
    <div className="p-3">
      <div className="row gy-3">
        {resMenu?.flatMap((itm, idx) => {
          return (
            <>
              <div className="d-flex flex-column justify-content-center gap-2">
                <div ref={(el) => (categoryRefs.current[itm?.categoryUuid] = el)} data-id={itm?.categoryUuid} key={idx}>
                  <h5 className="text-warning">{itm?.categoryName}</h5>
                </div>
                {
                  itm?.menuList?.map((item, index) => {
                    const cartItem = cart?.items?.find((pro) => pro.uuid === item.uuid);
                    const quantity = cartItem?.quantity || 0;

                    return (
                      <div className="col-12" key={index}>
                        <div className="d-flex flex-column flex-sm-row align-items-sm-center shadow-sm bg-white p-3 rounded-4">

                          {item?.itemImageUrl && <img
                            src={item?.itemImageUrl}
                            alt={item?.title}
                            className="rounded-4 mb-2 mb-sm-0"
                            style={{ width: 80, height: 80, objectFit: "cover" }}
                          />}
                          <div className="flex-grow-1 ms-sm-3">
                            <div className="d-flex justify-content-between flex-wrap">
                              <h6 className="fw-bold mb-1">
                                <span className={`vegNonVeg-icon fs-4 ${item?.vegNonVeg === "NonVeg" ? "text-danger" : "text-success"}`}><RiDragMoveLine /></span>
                                {item?.title}
                              </h6>
                              <span className="fw-bold text-warning">₹{item?.finalPrice}</span>
                            </div>
                            <div className="text-muted small mb-1">
                              {item?.description?.length > 60
                                ? item?.description?.slice(0, 60) + "..."
                                : item?.description}
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="">
                                <FaStar className="text-warning me-1" />
                                <small className="me-2">{item?.rating}</small>
                              </div>
                              {item?.customization?.length > 0 && <div className=""><p className="m-0 text-muted">customizable</p></div>}
                            </div>
                          </div>

                          <div className="mt-2 mt-sm-0 ms-sm-3">
                            {quantity > 0 ? (
                              <div className="d-flex justify-content-between align-items-center p-1 px-3 rounded-4 text-warning bg-dark gap-2 fs-6">
                                <span
                                  className="text-warning fs-5 cursor-pointer"
                                  onClick={() => updateQuantity(item.itemId, quantity - 1)}
                                >
                                  -
                                </span>
                                <span className="fs-5">{quantity}</span>
                                <span
                                  className="text-warning fs-5 cursor-pointer"
                                  onClick={() => updateQuantity(item.itemId, quantity + 1)}
                                >
                                  +
                                </span>
                              </div>
                            ) : (
                              <button
                                className="btn btn-danger text-warning them-bg-black border-dark px-4 py-1 rounded-pill"
                                onClick={() => { item?.customization?.length > 0 ? customizable(item) : addToCart(item)}}
                              >
                            Add
                          </button>
                            )}
                        </div>
                      </div>
                      </div>
              );
                  })
                }
            </div >
            </>
      )
        }
        )}
    </div>
    </div >
  );
};

export default CafeItems;