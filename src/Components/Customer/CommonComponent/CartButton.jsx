import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../Utilities/CartProvider";
import useIsMobile from "../../../Utilities/IsMobile";
import { BsBasket } from "react-icons/bs";

function CartButton({ openClose }) {
    const { cart } = useCart();
    const isMobile = useIsMobile();

    const totalAmount = () => {
        return cart?.items.reduce((acc, curr) => acc + Number(curr.price * curr.quantity || 0), 0) || 0
    };

    return (
        <>
            {
                isMobile ?
                    <>
                        <div className="cart-summary fixed-bottom d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-white">
                            <div className="d-flex align-items-center">
                                <span className="me-2 fw-semibold">{cart?.items?.length} Items</span>
                                <span className="mx-2 fw-semibold">|</span>
                                <span className="fw-semibold">₹{totalAmount()}</span>
                            </div>
                            <button onClick={openClose} className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3 py-1 fw-semibold">
                                View Cart <BsBasket size={18} />
                            </button>
                        </div>
                    </>
                    :
                    <div className="position-fixed bottom-0 end-0 me-4 mb-5 cart-btn-container" onClick={openClose}>
                        <button type="button" className="btn them-bg-black fs-4 rounded-circle d-flex align-items-center justify-content-center position-relative cart-btn" >
                            {/* <i className="ri-shopping-cart-fill ri-xl text-white"></i> */}
                            <FaShoppingCart className="ri-xl text-white" />
                            <span className="position-absolute rounded-circle cart-badge text-white">{cart?.items?.length}</span>
                        </button>
                    </div>}
        </>
    )
}
export default CartButton;