import React, { useEffect, useRef, useState } from 'react';
import CartItems from '../ScreenComponents/CartComponent/CartItems';
import { ImCross } from "react-icons/im";
import CookingInstruction from '../ScreenComponents/CartComponent/CookingInstrucation';
import PromoCodeBox from '../ScreenComponents/CartComponent/PromoCodeBox';
import BillingInfo from '../ScreenComponents/CartComponent/BillInfo';
import PaymentSection from '../ScreenComponents/CartComponent/PaymentSection';
import DeliveryAddressBox from '../ScreenComponents/CartComponent/DeliveryAddressBox';
import PromoCodePannel from './PromoCodePannel';
import CookingInstructionModal from '../CommonComponent/Modals/CookingInstructionModal';
import AddressDrawer from '../ScreenComponents/AddressComonent.jsx/AddressSection';

const CartPanel = ({ show, onClose, items, increment, decrement, edit }) => {

    const saveOrder = async () => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const basicAuth = btoa(`${mobile}:${key}`)
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/saveOrder`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${basicAuth}`
                },
                body: JSON.stringify({
                    
                })
            })
        } catch (e) {
            console.log(e, "error in save order");
        }
    }

    // appling promocode
    const [isPromoOpen, setPromoOpen] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    const handlePromoApply = () => {
        alert(`Applying promo: ${promoCode}`);
        setPromoOpen(false);
    };

    const [instruction, setInstruction] = useState('');
    const [isWalletUsed, setIsWalletUsed] = useState(false);

    // cookingInstruction
    const [showCookingPopup, setShowCookingPopup] = useState(false);

    const handleAddInstruction = (text) => {
        setShowCookingPopup(false);
    };

    // Address Drawer
    const [showAddressDrawer, setShowAddressDrawer] = useState(false);

    // cart outside click
    const cartRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                onClose(); // close cart
            }
        };
        if (show && !isPromoOpen && !showCookingPopup && !showAddressDrawer) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose, isPromoOpen, showCookingPopup, showAddressDrawer]);

    return (
        <>
            <div className={`${show ? 'cart-blur-overlay' : ''}`}>
                <div className={`cart-offcanvas ${show ? 'show' : ''}`} ref={cartRef}>
                    <div className="cart-header d-flex justify-content-start gap- align-items-center p-3 border-bottom them-bg-black text-warning">
                        <button className="text-warning m-0 cart-cross-btn" style={{ color: "white !important" }} onClick={onClose}><ImCross /></button>
                        <h5 className="m-auto">Checkout</h5>
                    </div>

                    <div className="cart-body p-3" style={{ paddingBottom: "60px !important" }}>
                        {items.map((item) => (
                            <CartItems
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                isVeg={item.isVeg}
                                onIncrement={() => increment(item.id)}
                                onDecrement={() => decrement(item.id)}
                                // edit(item.id)
                                onEdit={() => { setShowCookingPopup(true) }}
                            />
                        ))}
                        <CookingInstruction
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                        />
                        <PromoCodeBox onClick={() => setPromoOpen(true)} />
                        <BillingInfo
                            bill={1149.0}
                            tax={57.45}
                            packing={45.96}
                            coin={100.0}
                            total={1152.0}
                        />
                        <DeliveryAddressBox
                            address={`301 Kakad Industrial Area, Kakad Industrial Estate,\n32 Sitaram Keer Marg, VSNL Colony,\nMahim, Mumbai, Maharashtra 400016, India`}
                            onChange={() => setShowAddressDrawer(true)}
                        />
                        <PaymentSection
                            walletChecked={isWalletUsed}
                            onWalletChange={(e) => setIsWalletUsed(e.target.checked)}
                            walletAmount={0.0}
                            onAddPayment={() => alert("Payment modal open")}
                        />

                    </div>
                </div>
            </div>

            <PromoCodePannel
                visible={isPromoOpen}
                onClose={() => setPromoOpen(false)}
                onApply={handlePromoApply}
                code={promoCode}
                setCode={setPromoCode}
            />

            <CookingInstructionModal
                show={showCookingPopup}
                onClose={() => setShowCookingPopup(false)}
                onAdd={handleAddInstruction}
            />
            <AddressDrawer show={showAddressDrawer} onClose={() => setShowAddressDrawer(false)} />

        </>
    );
};

export default CartPanel;
