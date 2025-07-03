import React from "react";
import { FaStar } from "react-icons/fa";

const CafeItems = ({ resMenu, categoryRefs, addToCart, cart, dispatch, updateQuantity }) => {
  return (
    <div className="p-3">
      <div className="row gy-3">
        {resMenu?.flatMap((itm, idx) => {
          return (
            <>
              <div className="">
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
                          <img
                            src={item?.itemImageUrl}
                            alt={item?.title}
                            className="rounded-4 mb-2 mb-sm-0"
                            style={{ width: 80, height: 80, objectFit: "cover" }}
                          />
                          <div className="flex-grow-1 ms-sm-3">
                            <div className="d-flex justify-content-between flex-wrap">
                              <h6 className="fw-bold mb-1">{item?.title}</h6>
                              <span className="fw-bold text-warning">₹{item?.finalPrice}</span>
                            </div>
                            <div className="text-muted small mb-1">
                              {item?.description?.length > 60
                                ? item?.description?.slice(0, 60) + "..."
                                : item?.description}
                            </div>
                            <div className="d-flex align-items-center">
                              <FaStar className="text-warning me-1" />
                              <small className="me-2">{item?.rating}</small>
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
                                onClick={() => addToCart(item)}
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