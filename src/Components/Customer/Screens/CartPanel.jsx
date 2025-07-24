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
import usePopupBackHandler from '../../../Utilities/UsePopupStack';
import Loading from '../CommonComponent/LoadingWait';
import useIsMobile from '../../../Utilities/IsMobile';
import { IoMdArrowRoundBack } from "react-icons/io";
import TaxPopup from '../CommonComponent/Modals/TaxPopup';

const CartPanel = ({ show, onClose, increment, decrement, orderDetail, orderRefId, saveOrder, dispatch, isLoading, isSmallLoading, cart }) => {

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
    const [itemInstruction, setItemInstruction] = useState('');
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
                dispatch({
                    type: 'UPDATE_SPECIAL_ITEM_INSTRUCTION',
                    payload: {
                        uuid: orderItemId.localId,
                        specialInstruction: instru,
                    },
                });
                // setTimeout(() => {
                //     saveOrder();
                // }, 0);
            }
        } catch (e) {
            console.log(e, "error in cooking instruction Api");
        }
    };
    const [getItemIdForCook, setGetItemIdForCook] = useState({ localId: '', id: '' });
    const handleAddInstruction = (text) => {
        if (getItemIdForCook) {
            cookingInstructionOnOrderItem(text, getItemIdForCook);
        }
    };

    const prevInstructionRef = useRef();
    useEffect(() => {
        const currentItem = cart.items.find(item => item.itemId === getItemIdForCook.localId);

        if (
            currentItem &&
            currentItem.specialInstruction !== prevInstructionRef.current
        ) {
            prevInstructionRef.current = currentItem.specialInstruction;
            saveOrder();
        }
    }, [cart.items]);

    // Payment
    const [showPaymentModeList, setShowPaymentModeList] = useState(false);
    const [selectPaymentType, setSelectPaymentType] = useState('');
    const getLastPaymentMode = async () => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getLastPaymentMode_v1`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                const response = JSON.parse(getRes.responsePacket);
                setSelectPaymentType(response?.lastPaymentType);
            }
        } catch (e) {
            console.log(e, "error in getLastPayment mode");
        }
    };
    useEffect(() => {
        if (selectPaymentType) {
            localStorage.setItem("paymentType", selectPaymentType);
        }
    }, [selectPaymentType]);


    // balance

    const generateOrder = async () => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/cashFree/createOrder`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId: orderRefId,
                    totalAmount: orderDetail?.orderTotal
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                const payment_session_id = getRes.responsePacket.payment_session_id;
                // const cashfree = new window.Cashfree(getRes.responsePacket.payment_session_id);
                if (!window.Cashfree) {
                    alert("Cashfree SDK not loaded yet");
                    return;
                }

                const cashfree = window.Cashfree({ mode: "sandbox" }); // or "sandbox" production

                const checkoutOptions = {
                    paymentSessionId: payment_session_id, // must be dynamic and valid
                    redirectTarget: "_self", // or "_blank"
                    returnUrl: `${window.location.origin}/orderTrack`
                };
                cashfree.checkout(checkoutOptions);
            }
        } catch (e) {
            console.log(e, "error in generate order");
        }
    };

    const [balance, setBalance] = useState({});
    const getBalance = async () => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getCoinAndWalletBalance`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setBalance(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getBalance");
        }
    };

    // Address Drawer
    const [showAddressDrawer, setShowAddressDrawer] = useState(false);

    // tax
    const [showTax, setShowTax] = useState(false);

    // cart outside click
    const cartRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                onClose(); // close cart
            }
        };
        if (show && !isPromoOpen && !showCookingPopup && !showAddressDrawer && !showPaymentModeList && !showTax) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose, isPromoOpen, showCookingPopup, showAddressDrawer, showPaymentModeList, showTax]);

    // api calls
    useEffect(() => {
        if (show) {
            getLastPaymentMode();
            getBalance();
        }
    }, [show]);

    const popupStack = [
        { id: "paymentMode", isOpen: showPaymentModeList, onClose: () => setShowPaymentModeList(false) },
        { id: "addressDrawer", isOpen: showAddressDrawer, onClose: () => setShowAddressDrawer(false) },
        { id: "cookingPopup", isOpen: showCookingPopup, onClose: () => setShowCookingPopup(false) },
        { id: "promoCode", isOpen: isPromoOpen, onClose: () => setPromoOpen(false) },
        { id: "cartDrawer", isOpen: show, onClose },
    ];
    usePopupBackHandler(popupStack);

    const isMobile = useIsMobile();

    return (
        <>
            <div className={`${show ? 'cart-blur-overlay' : ''}`}>
                <div className={`cart-offcanvas ${show ? 'show' : ''}`} ref={cartRef}>
                    <div className="cart-header d-flex justify-content-start gap- align-items-center p-3 border-bottom them-bg-black text-white">
                        <button className="text-white m-0 cart-cross-btn" onClick={onClose}>{!isMobile ? <ImCross /> : <IoMdArrowRoundBack />}</button>
                        <h5 className="m-auto">Checkout</h5>
                    </div>

                    {isLoading ? <Loading /> : <div className="cart-body px-3 pt-3" style={{ paddingBottom: isMobile && "70px" }}>
                        {orderDetail?.itemList?.map((item) => (
                            <CartItems
                                key={item.orderItemId}
                                id={item.orderItemId}
                                name={item.title}
                                price={item.finalPrice}
                                quantity={item.quantity}
                                isVeg={item.vegNonVeg}
                                onIncrement={() => increment(item.orderItemId, item.quantity + 1, item.itemId)}
                                onDecrement={() => decrement(item.orderItemId, item.quantity - 1, item.itemId)}
                                isSmallLoading={isSmallLoading}
                                instruction={item?.specialInstruction}
                                customization={item?.customization}
                                onEdit={() => { setShowCookingPopup(true); setGetItemIdForCook({ localId: item.itemId, id: item.orderItemId }); setItemInstruction(item?.specialInstruction ? item?.specialInstruction : '') }}
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
                            setShowTax={setShowTax}
                            packing={orderDetail?.packingCharges}
                            coin={orderDetail?.deliveryFee}
                            total={orderDetail?.orderTotal}
                        />
                        {(orderDetail?.orderType === "HomeDelivery" || orderDetail?.orderType === "TakeAway") &&
                            <DeliveryAddressBox
                                address={`301 Kakad Industrial Area, Kakad Industrial Estate,\n32 Sitaram Keer Marg, VSNL Colony,\nMahim, Mumbai, Maharashtra 400016, India`}
                                onChange={() => setShowAddressDrawer(true)}
                            />}
                        <PaymentSection
                            walletChecked={isWalletUsed}
                            onWalletChange={(e) => { setIsWalletUsed(e.target.checked); }}
                            walletAmount={Number(balance?.walletBalance)}
                            onAddPayment={() => setShowPaymentModeList(true)}
                            selectPaymentType={selectPaymentType}
                        />
                        {
                            selectPaymentType && <div className="d-flex justify-content-evenly gap-2 fixed-bottom pb-3 bg-white pt-2 shadow-sm">
                                <button className='border-0 px-3 py-2 bg-dark text-white'>Delivery Later</button>
                                <button className='border-0 px-3 py-2 bg-dark text-white' onClick={generateOrder}>Deliver Now</button>
                            </div>
                        }
                    </div>}
                </div>
            </div>

            <PromoCodePannel
                visible={isPromoOpen}
                onClose={() => { setPromoOpen(false); }}
                onApply={handlePromoApply}
                code={promoCode}
                setCode={setPromoCode}
            />

            <CookingInstructionModal
                show={showCookingPopup}
                instruction={itemInstruction}
                setInstruction={setItemInstruction}
                onClose={() => { setShowCookingPopup(false); }}
                onAdd={handleAddInstruction}
            />
            <AddressDrawer show={showAddressDrawer} onClose={() => { setShowAddressDrawer(false); }} />
            <PaymentMode
                visible={showPaymentModeList}
                onClose={() => { setShowPaymentModeList(false); }}
                orderTotal={orderDetail?.orderTotal}
                selectPaymentType={selectPaymentType}
                setSelectPaymentType={setSelectPaymentType}
            />
            <TaxPopup show={showTax} onClose={() => setShowTax(false)} taxJson={orderDetail?.taxJson} />
        </>
    );
};

export default CartPanel;