import React from "react";
import useIsMobile from "../../../../Utilities/IsMobile";
import veg from "../../../../Assets/Veg-symbole.png";
import nonVeg from "../../../../Assets/Non-veg-symbol.png";
import { FaPencilAlt } from "react-icons/fa";

const CafeItems = ({ resMenu, categoryRefs, addToCart, cart, updateQuantity, customizable, onEdit }) => {
  const isMobile = useIsMobile();

  return (
    <div className="p-3">
      <div className="row gy-3">
        {resMenu?.flatMap((itm, idx) => {
          return (
            <>
              <div className="d-flex flex-column justify-content-center gap-2">
                <div ref={(el) => (categoryRefs.current[itm?.categoryUuid] = el)} data-id={itm?.categoryUuid} key={idx}>
                  <h5 className="text-dark">{itm?.categoryName}</h5>
                </div>
                {
                  itm?.menuList?.map((item, index) => {
                    const cartItem = cart?.items?.find((pro) => pro.uuid === item.uuid);
                    const quantity = cartItem?.quantity || 0;

                    return (
                      // <div className="col-12" key={index}>
                      //   <div className="d-flex flex-column flex-sm-row align-items-sm-center shadow-sm bg-white p-3 rounded-4">

                      //     {item?.itemImageUrl && <img
                      //       src={item?.itemImageUrl}
                      //       alt={item?.title}
                      //       className="rounded-4 mb-2 mb-sm-0"
                      //       style={{ width: 80, height: 80, objectFit: "cover" }}
                      //     />}
                      //     <div className="flex-grow-1 ms-sm-3">
                      //       <div className="d-flex justify-content-between flex-wrap">
                      //         <h6 className="fw-bold mb-1">
                      //           <span className={`vegNonVeg-icon fs-4 ${item?.vegNonVeg === "NonVeg" ? "text-danger" : "text-success"}`}><FaCircle /></span>
                      //           {item?.title}
                      //         </h6>
                      //         <span className="fw-bold text-warning">₹{item?.finalPrice}</span>
                      //       </div>
                      //       <div className="text-muted small mb-1">
                      //         {item?.description?.length > 60
                      //           ? item?.description?.slice(0, 60) + "..."
                      //           : item?.description}
                      //       </div>
                      //       <div className="d-flex align-items-center justify-content-between">
                      //         <div className="">
                      //           <FaStar className="text-warning me-1" />
                      //           <small className="me-2">{item?.rating}</small>
                      //         </div>
                      //         {item?.customization?.length > 0 && <div className=""><p className="m-0 text-muted">customizable</p></div>}
                      //       </div>
                      //     </div>

                      //     <div className="mt-2 mt-sm-0 ms-sm-3">
                      //       {quantity > 0 ? (
                      //         <div className="d-flex justify-content-between align-items-center p-1 px-3 rounded-4 text-warning bg-dark gap-2 fs-6">
                      //           <span
                      //             className="text-warning fs-5 cursor-pointer"
                      //             onClick={() => updateQuantity(item.itemId, quantity - 1)}
                      //           >
                      //             -
                      //           </span>
                      //           <span className="fs-5">{quantity}</span>
                      //           <span
                      //             className="text-warning fs-5 cursor-pointer"
                      //             onClick={() => updateQuantity(item.itemId, quantity + 1)}
                      //           >
                      //             +
                      //           </span>
                      //         </div>
                      //       ) : (
                      //         <button
                      //           className="btn btn-danger text-warning them-bg-black border-dark px-4 py-1 rounded-pill"
                      //           onClick={() => { item?.customization?.length > 0 ? customizable(item) : addToCart(item) }}
                      //         >
                      //           Add
                      //         </button>
                      //       )}
                      //     </div>
                      //   </div>
                      // </div>
                      <div className="card rounded-4 shadow-sm thali-card mb-3" key={index}>
                        {/* Category Header */}
                        <div className={`card-header bg-white border-0 py-2 ${isMobile ? "px-2" : "px-3"} d-flex align-items-center gap-2`}>
                          {item?.vegNonVeg === "Veg" ? <img src={veg} className="" width="13px" alt="veg" />
                            : <img src={nonVeg} alt="NonVeg" width="13px" />}
                          <span className="fw-semibold text-muted small">{item?.subCategoryTitle}</span>
                        </div>

                        {/* Body */}
                        <div className={`card-body d-flex ${isMobile ? "px-2" : "px-3"} pt-2 pb-3`}>
                          {/* Image */}
                          {item?.itemImageUrl && <img
                            src={item?.itemImageUrl}
                            alt={item?.title}
                            className="rounded-3 me-2 flex-shrink-0"
                            style={{ width: 70, height: 70, objectFit: 'cover' }}
                          />}

                          {/* Content */}
                          <div className="flex-grow-1 d-flex flex-column justify-content-between" style={{ minWidth: 0 }}>
                            {/* Title & Description */}
                            <div>
                              <h6 className="fw-bold mb-1 text-dark small">{item?.title}</h6>
                              <p className="card-description text-muted mb-2">
                                {item?.description}
                              </p>
                            </div>

                            {/* Footer Row */}
                            <div className="d-flex justify-content-between align-items-center">
                              {/* Price */}
                              <div>
                                <span className={`me-2 fw-semibold ${isMobile && "fs-12"}`} >₹{Number(item?.finalPrice).toFixed(2)}</span>
                                {/* <span className={`text-muted text-decoration-line-through ${isMobile ? "fs-10" : "small"}`}>₹260.00</span> */}
                                <span className={`text-dark ${isMobile ? "fw-semibold fs-12" : "fw-bold"}`}><span className="text-warning">★</span> {item?.rating === 0 ? "5" : item?.rating}</span>
                              </div>

                              {/* Rating + Add Button */}
                              <div className="d-flex align-items-center gap-2">
                                {quantity > 0 ?
                                  <>
                                    <button className="bg-white rounded-1 ms-2 inst-btn" onClick={() => onEdit(item)}>
                                      <FaPencilAlt className="ri-pencil-line text-dark fs-10" />
                                    </button>
                                    <div className="qty-selector">
                                      <button className="qty-btn" onClick={() => updateQuantity(item.itemId, quantity - 1)}>−</button>
                                      <span className="qty-count">{quantity}</span>
                                      <button className="qty-btn" onClick={() => updateQuantity(item.itemId, quantity + 1)}>+</button>
                                    </div>
                                  </>
                                  :
                                  <button className={`btn bg-dark text-white btn-sm rounded-pill ${isMobile ? "fw-semibold px-2" : "fw-bold px-3 py-1"} small-btn`}
                                    onClick={() => { item?.customization?.length > 0 ? customizable(item) : addToCart(item) }}>
                                    Add Now
                                  </button>
                                }
                              </div>
                            </div>

                            {/* Customizable label */}
                            {item?.customization?.length > 0 && <div className="text-end mt-1">
                              <span className={`text-muted fw-semibold ${isMobile ? "fs-12" : "small"}`}>Customizable</span>
                            </div>}
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