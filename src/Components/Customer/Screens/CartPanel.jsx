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
import PaymentMode from '../ScreenComponents/CartComponent/PaymentModeList';

const CartPanel = ({ show, onClose, increment, decrement, orderDetail, orderRefId, saveOrder, dispatch, orderType }) => {

    // appling promocode
    const [isPromoOpen, setPromoOpen] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    const handlePromoApply = () => {
        alert(`Applying promo: ${promoCode}`);
        setPromoOpen(false);
    };

    const [isWalletUsed, setIsWalletUsed] = useState(false);

    // cookingInstruction
    const [instruction, setInstruction] = useState('');
    const [showCookingPopup, setShowCookingPopup] = useState(false);
    // save Cooking Instruction on item
    const cookingInstructionOnOrderItem = async (instru, orderItemId) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/updateInstructionOnOrderItem/${orderRefId}/${orderItemId?.id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    specialInstruction: instru
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setShowCookingPopup(false);
                saveOrder();
                dispatch({
                    type: 'UPDATE_SPECIAL_ITEM_INSTRUCTION',
                    payload: {
                        uuid: orderItemId.localId,
                        specialInstruction: instru,
                    },
                });
            }
        } catch (e) {
            console.log(e, "error in cooking instruction Api");
        }
    };
    const [getItemIdForCook, setGetItemIdForCook] = useState({ localId: '', id: '' });
    const handleAddInstruction = (text) => {
        if (getItemIdForCook) {
            cookingInstructionOnOrderItem(text, getItemIdForCook)
        }
    };

    // Payment
    const [showPaymentModeList, setShowPaymentModeList] = useState(false);

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
        if (show && !isPromoOpen && !showCookingPopup && !showAddressDrawer && !showPaymentModeList) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose, isPromoOpen, showCookingPopup, showAddressDrawer, showPaymentModeList]);

    return (
        <>
            <div className={`${show ? 'cart-blur-overlay' : ''}`}>
                <div className={`cart-offcanvas ${show ? 'show' : ''}`} ref={cartRef}>
                    <div className="cart-header d-flex justify-content-start gap- align-items-center p-3 border-bottom them-bg-black text-warning">
                        <button className="text-warning m-0 cart-cross-btn" style={{ color: "white !important" }} onClick={onClose}><ImCross /></button>
                        <h5 className="m-auto">Checkout</h5>
                    </div>

                    <div className="cart-body p-3" style={{ paddingBottom: "60px !important" }}>
                        {orderDetail?.itemList?.map((item) => (
                            <CartItems
                                key={item.orderItemId}
                                name={item.title}
                                price={item.finalPrice}
                                quantity={item.quantity}
                                isVeg={item.vegNonVeg}
                                onIncrement={() => increment(item.orderItemId, item.quantity + 1, item.itemId)}
                                onDecrement={() => decrement(item.orderItemId, item.quantity - 1, item.itemId)}
                                // edit(item.id)
                                onEdit={() => { setShowCookingPopup(true); setGetItemIdForCook({ localId: item.itemId, id: item.orderItemId }) }}
                            />
                        ))}
                        <CookingInstruction
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                        />
                        <PromoCodeBox onClick={() => setPromoOpen(true)} />
                        <BillingInfo
                            bill={orderDetail?.orderSubTotal}
                            tax={orderDetail?.taxAmount}
                            packing={orderDetail?.packingCharges}
                            coin={orderDetail?.deliveryFee}
                            total={orderDetail?.orderTotal}
                        />
                        {(orderDetail?.orderType === "HomeDelivery" || orderDetail?.orderType === "TakeAway") && <DeliveryAddressBox
                            address={`301 Kakad Industrial Area, Kakad Industrial Estate,\n32 Sitaram Keer Marg, VSNL Colony,\nMahim, Mumbai, Maharashtra 400016, India`}
                            onChange={() => setShowAddressDrawer(true)}
                        />}
                        <PaymentSection
                            walletChecked={isWalletUsed}
                            onWalletChange={(e) => setIsWalletUsed(e.target.checked)}
                            walletAmount={0.0}
                            onAddPayment={() => setShowPaymentModeList(true)}
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
            <PaymentMode visible={showPaymentModeList} onClose={() => setShowPaymentModeList(false)} orderType={orderType} orderTotal={orderDetail?.orderTotal}/>
        </>
    );
};

export default CartPanel;
