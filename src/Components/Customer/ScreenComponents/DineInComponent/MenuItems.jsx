import React from "react";
import { FaStar, FaMinus, FaPlus, FaPen } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { RiDragMoveLine } from "react-icons/ri";

const MenuItemCard = ({ item, addToCart, quantity, updateQuantity }) => {

    return (
        <div className="card shadow-sm my-2 menu-card-container">
            <div className="card-body d-flex justify-content-between align-items-center flex-wrap menu-card-body">
                <div className="d-flex align-items-center mb-2 mb-md-0 menu-info-section">
                    <span className={`vegNonVeg-icon fs-4 ${item?.vegNonVeg === "NonVeg" ? "text-danger" : "text-success"}`}><RiDragMoveLine /></span>
                    <div>
                        <h6 className="mb-1 menu-dish-name">{item?.title}</h6>
                        <div className="text-muted small menu-price-rating">
                            ₹{item?.finalPrice.toFixed(2)}{" "}
                            {item?.rating > 0 && <span className="text-warning ms-3 menu-rating">
                                <FaStar className="me-1 text-warning menu-star-icon" />
                                {item?.rating}
                            </span>}
                        </div>
                    </div>
                </div>
                {quantity > 0 ? (
                    <>
                        <div className="d-flex align-items-center menu-quantity-section">
                            <Button variant="light" size="sm" className="me-2 menu-edit-btn text-warning">
                                <FaPen />
                            </Button>
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
                        </div>
                    </>
                ) : (
                    <>
                        <div className="d-flex align-items-center menu-quantity-section">
                            <Button variant="light" size="sm" className="me-2 menu-edit-btn text-warning">
                                <FaPen />
                            </Button>
                            <Button variant="warning" onClick={() => addToCart(item)} className="menu-add-now-btn ms-md-auto mt-2 mt-md-0 rounded-5 text-warning bg-dark border-0">
                                Add Now
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuItemCard;
