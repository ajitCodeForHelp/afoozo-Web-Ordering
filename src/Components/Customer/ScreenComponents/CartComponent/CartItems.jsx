import React from "react";
import { FaPencilAlt } from "react-icons/fa";

function CartItems({ id, name, price, quantity, onIncrement, onDecrement, onEdit, isVeg, isSmallLoading, instruction, customization }) {

    return (
        <div className={`checkout-card d-flex justify-content-between p-3 mb-3 shadow-sm rounded gap-2`}>
            <div className="d-flex align-items-start gap-1 flex-column">
                <div className="d-flex align-items-start gap-1">
                    <span className={`indicator ${isVeg ? 'veg' : 'non-veg'}`}></span>
                    <span className="fw-normal fs-6">{name}</span>
                </div>
                {customization && <div className="d-flex align-items-start gap-1">
                    {customization?.map((itm) => itm.customizationOptions?.map((item) => {
                        return (
                            <span className="text-muted fs-12 fw-normal">{item?.name},</span>
                        )
                    }))}
                </div>}
            </div>

            <div className="d-flex align-items-center quantity-box">
                {isSmallLoading[`${id}-less`] ? <div style={{ textAlign: "center" }} className="logo-loading-small"></div> :
                    <button className="text-dark qty-btn p-1" onClick={onDecrement}>-</button>}
                <span className="qty-value p-1">{quantity}</span>

                {isSmallLoading[`${id}-add`] ? <div style={{ textAlign: "center" }} className="logo-loading-small"></div> :
                    <button className="text-dark qty-btn p-1" onClick={onIncrement}>+</button>}

            </div>

            <div className="d-flex flex-column align-items-end">
                <div className="fw-bold text-end text-nowrap">
                    ₹{(price * quantity).toFixed(2)}
                </div>
                {instruction && <p className="m-0">{instruction}</p>}
                <button className="btn edit-btn ms-2" onClick={onEdit}>
                    <FaPencilAlt className="ri-pencil-line text-warning" />
                </button>
            </div>
        </div>
    )
}

export default CartItems;
