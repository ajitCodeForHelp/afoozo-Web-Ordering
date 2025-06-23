import React from "react";
import { FaPencilAlt } from "react-icons/fa";

function CartItems({ name, price, quantity, onIncrement, onDecrement, onEdit, isVeg }) {
   
    return (
        <div className={`checkout-card d-flex justify-content-between p-3 mb-3 shadow-sm rounded gap-2`}>
            <div className="d-flex align-items-start gap-2">
                <span className={`indicator ${isVeg ? 'veg' : 'non-veg'}`}></span>
                <span className="fw-normal fs-6">{name}</span>
            </div>

            <div className="d-flex align-items-center quantity-box">
                <button className="btn qty-btn p-1" onClick={onDecrement}>−</button>
                <span className="qty-value p-1">{quantity}</span>
                <button className="btn qty-btn p-1" onClick={onIncrement}>+</button>
            </div>

            <div className="d-flex flex-column align-items-end">
                <div className="fw-bold text-end text-nowrap">
                    ₹{(price * quantity).toFixed(2)}
                </div>

                <button className="btn edit-btn ms-2" onClick={onEdit}>
                    {/* <i className="ri-pencil-line text-warning"></i> */}
                    <FaPencilAlt className="ri-pencil-line text-warning" />
                </button>
            </div>
        </div>
    )
}

export default CartItems;
