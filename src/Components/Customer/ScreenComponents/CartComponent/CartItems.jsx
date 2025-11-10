import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import veg from "../../../../Assets/Veg-symbole.png";
import NonVeg from "../../../../Assets/Non-veg-symbol.png";
import useIsMobile from "../../../../Utilities/IsMobile";

function CartItems({ id, name, price, quantity, onIncrement, onDecrement, onEdit, isVeg, isSmallLoading, instruction, customization }) {

    const isMobile = useIsMobile();

    return (
        <div className={`checkout-card ${isMobile ? "p-2" : "p-3"} mb-3 shadow-sm rounded`}>
            <div className={`d-flex justify-content-between ${isMobile ? "align-items-center" : "align-items-start"}`} style={{ gap: "1.5px" }}>
                <div className="d-flex align-items-start gap-1 flex-column w-50">
                    <div className={`d-flex align-items-${isMobile ? "center" : "center"} gap-1`}>
                        {/* <span className={`indicator ${isVeg === 'Veg' ? 'veg' : 'non-veg'}`}></span> */}
                        <span className="fs-10"><img src={isVeg === "Veg" ? veg : NonVeg} alt="isVeg" width={isMobile ? '10px' : '14px'} /></span>
                        <span className={`fw-normal ${isMobile ? "fs-14" : "fs-6"}`}>{name}</span>
                    </div>
                </div>

                <div className="d-flex align-items-center quantity-box w-20">
                    {isSmallLoading[`${id}-less`] ? <div style={{ textAlign: "center" }} className="logo-loading-small"></div> :
                        <button className={`text-dark ${isMobile ? "fs-14" : "fs-6"} border-0 bg-white fs-bold p-1`} onClick={onDecrement}>-</button>}
                    <span className={`qty-value p-1 ${isMobile && "fs-14"}`}>{quantity}</span>

                    {isSmallLoading[`${id}-add`] ? <div style={{ textAlign: "center" }} className="logo-loading-small"></div> :
                        <button className={`text-dark ${isMobile ? "fs-14" : "fs-6"} border-0 bg-white fs-bold p-1`} onClick={onIncrement}>+</button>}

                </div>

                <div className="d-flex flex-column align-items-end w-20">
                    <div className={`${isMobile ? "fw-normal fs-14" : "fw-bold"} text-end text-nowrap`}>
                        ₹{Number(price * quantity).toFixed(1)}
                    </div>
                </div>
            </div>
            {/* <div className=""> */}
            {customization && <div className="d-flex align-items-start gap-1 justify-content-start flex-wrap">
                {customization?.map((itm) => itm.customizationOptions?.map((item) => {
                    return (
                        <span className="text-muted fs-12 fw-normal">{item?.name},</span>
                    )
                }))}
            </div>}
            {/* </div> */}
            <div className="d-flex justify-content-between align-items-center">
                <p className="m-0"> {instruction && <span className="text-muted fs-12 fw-normal two-line-ellipsis">{instruction}</span>}</p>
                <button className="bg-white rounded-1 ms-2 border-0 inst-btn" onClick={onEdit}>
                    <FaPencilAlt className="ri-pencil-line text-dark fs-12" />
                </button>
            </div>
        </div>
    )
}

export default CartItems;
