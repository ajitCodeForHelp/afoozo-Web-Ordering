import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../Utilities/CartProvider";

function CartButton({ openClose }) {
    const { cart, dispatch } = useCart()
    return (
        <>
            <div className="position-fixed bottom-0 end-0 me-4 mb-5 cart-btn-container" onClick={openClose}>
                <button type="button" className="btn them-bg-black fs-4 rounded-circle d-flex align-items-center justify-content-center position-relative cart-btn" >
                    {/* <i className="ri-shopping-cart-fill ri-xl text-white"></i> */}
                    <FaShoppingCart className="ri-xl text-warning" />
                    <span className="position-absolute rounded-circle cart-badge text-warning">{cart?.items?.length}</span>
                </button>
            </div>
        </>
    )
}
export default CartButton;