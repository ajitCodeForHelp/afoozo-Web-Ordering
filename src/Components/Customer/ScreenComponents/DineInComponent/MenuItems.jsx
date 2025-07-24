import React from "react";
import { FaStar, FaMinus, FaPlus, FaPen } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { RiDragMoveLine } from "react-icons/ri";
import useIsMobile from "../../../../Utilities/IsMobile";
import veg from "../../../../Assets/Veg-symbole.png";
import nonVeg from "../../../../Assets/Non-veg-symbol.png";

const MenuItemCard = ({ item, addToCart, quantity, updateQuantity, customizable, onEdit }) => {

    const isMobile = useIsMobile();

    return (
        // <div className="card shadow-sm my-2 menu-card-container">
        //     <div className="card-body d-flex justify-content-between align-items-center flex-wrap menu-card-body">
        //         <div className="d-flex align-items-center mb-2 mb-md-0 menu-info-section">
        //             <span className={`vegNonVeg-icon fs-4 ${item?.vegNonVeg === "NonVeg" ? "text-danger" : "text-success"}`}><RiDragMoveLine /></span>
        //             <div>
        //                 <h6 className="mb-1 menu-dish-name">{item?.title}</h6>
        //                 <div className="text-muted small menu-price-rating">
        //                     ₹{item?.finalPrice.toFixed(2)}{" "}
        //                     {item?.rating > 0 &&
        //                         <span className="text-warning ms-3 menu-rating">
        //                             <FaStar className="me-1 text-warning menu-star-icon" />
        //                             {item?.rating}
        //                         </span>
        //                     }
        //                     {item?.customization?.length > 0 && <div className=""><p className="m-0 text-muted">customizable</p></div>}
        //                 </div>
        //             </div>
        //         </div>
        //         {quantity > 0 ? (
        //             <>
        //                 <div className="d-flex align-items-center menu-quantity-section">
        //                     <Button variant="light" size="sm" className="me-2 menu-edit-btn text-warning">
        //                         <FaPen />
        //                     </Button>
        //                     <div className="d-flex justify-content-between align-items-center p-1 px-3 rounded-4 text-warning bg-dark gap-2 fs-6">
        //                         <span
        //                             className="text-warning fs-5 cursor-pointer"
        //                             onClick={() => updateQuantity(item.itemId, quantity - 1)}
        //                         >
        //                             -
        //                         </span>
        //                         <span className="fs-5">{quantity}</span>
        //                         <span
        //                             className="text-warning fs-5 cursor-pointer"
        //                             onClick={() => updateQuantity(item.itemId, quantity + 1)}
        //                         >
        //                             +
        //                         </span>
        //                     </div>
        //                 </div>
        //             </>
        //         ) : (
        //             <>
        //                 <div className="d-flex align-items-center menu-quantity-section">
        //                     <Button variant="light" size="sm" className="me-2 menu-edit-btn text-warning">
        //                         <FaPen />
        //                     </Button>
        //                     <Button variant="warning" onClick={() => { item?.customization?.length > 0 ? customizable(item) : addToCart(item) }} className="menu-add-now-btn ms-md-auto mt-2 mt-md-0 rounded-5 text-warning bg-dark border-0">
        //                         Add Now
        //                     </Button>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        // </div>
        <div className="card rounded-4 shadow-sm thali-card mb-3">
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
                            <span className={`me-2 fw-semibold ${isMobile && "fs-12"}`} >₹{item?.finalPrice}</span>
                            {/* <span className={`text-muted text-decoration-line-through ${isMobile ? "fs-10" : "small"}`}>₹260.00</span> */}
                            <span className={`text-dark ${isMobile ? "fw-semibold fs-12" : "fw-bold"}`}><span className="text-warning">★</span> {item?.rating}</span>
                        </div>

                        {/* Rating + Add Button */}
                        <div className="d-flex align-items-center gap-2">
                            {quantity > 0 ?
                                <div className="qty-selector">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, quantity - 1)}>−</button>
                                    <span className="qty-count">{quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, quantity + 1)}>+</button>
                                </div> :
                                <button className={`btn btn-warning btn-sm rounded-pill ${isMobile ? "fw-semibold px-2" : "fw-bold px-3 py-1"}  text-white small-btn`}
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
};

export default MenuItemCard;
