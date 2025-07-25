import React, { useEffect, useRef, useState } from "react";
import Header from "../CommonComponent/Navbar";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CafeItems from "../ScreenComponents/CafeMenuComponent/CafeItems";
import CartButton from "../CommonComponent/CartButton";
import CartPanel from "./CartPanel";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import { useLocation, useParams } from "react-router-dom";
import Categories from "../ScreenComponents/CafeMenuComponent/Categories";
import { useCart } from "../../../Utilities/CartProvider";
import PopupModal from "../CommonComponent/Modals/PopUpModal";
import MessagePopup from "../CommonComponent/Modals/MessagePopup";
import ItemCustomPopup from "../CommonComponent/Modals/ItemCustomPopup";
import CookingInstructionModal from "../CommonComponent/Modals/CookingInstructionModal";

function CafeMenu() {

    const [cartVisible, setCartVisible] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const { orderType } = location.state || {}

    const [resMenu, setResMenu] = useState([]);
    const [filterResMenu, setFilterResMenu] = useState([...resMenu]);
    const [activeCategory, setActiveCategory] = useState(resMenu[0]?.categoryUuid);
    const getData = async () => {
        try {
            const type = sessionStorage.getItem("orderType");
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getItemListWithCatSubCat`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantId: id,
                    orderType: type,
                    tableNumber: 0,
                    length: -1,
                    searchKey: "",
                })
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setResMenu(getRes.responsePacket);
                setFilterResMenu(getRes.responsePacket);
                setActiveCategory(getRes.responsePacket[0]?.categoryUuid);
            }
        } catch (e) {
            console.log(e, "error in getData");
        }
    };
    useEffect(() => {
        if (id) {
            getData();
        }
    }, []);

    const [hotSelling, setHotSelling] = useState([]);
    useEffect(() => {
        if (resMenu) {
            const getPopularItems = () => {
                const get = resMenu?.flatMap((itm) => itm.menuList?.filter((res) => res.sticker === "hotSelling"));
                setHotSelling(get);
            };
            getPopularItems();
        }

    }, [resMenu]);

    const filterVegNonVeg = (e) => {
        const { value } = e.target;
        const res = [...resMenu].map((itm) => ({ ...itm, menuList: itm.menuList?.filter((item) => item.vegNonVeg === value) }));
        const filter = res.filter((itm) => itm.menuList && itm.menuList?.length > 0);
        setFilterResMenu(filter);
    };

    const handleSearch = (e) => {
        const res = [...resMenu].map((itm) => ({ ...itm, menuList: itm?.menuList.filter((item) => item.title.toLowerCase().includes(e.toLowerCase())) }));
        const filter = res.filter((itm) => itm.menuList && itm.menuList.length > 0);
        console.log(res, "res")
        setFilterResMenu(filter);
    };

    // message popup
    const [showMessagePopup, setShowMessagePopup] = useState(false);

    const { cart, dispatch } = useCart();
    // order detail
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderRefId, setOrderRefId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const saveOrder = async () => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);
            const type = sessionStorage.getItem("orderType");

            setIsLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/saveOrder`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderType: type,
                    addressId: type === "HomeDelivery" || type === "TakeAway" ? cart?.address?.recordId : null,
                    specialInstruction: "Please deliver ASAP",
                    itemList: cart?.items?.map((itm) => ({
                        itemId: itm.itemId,
                        quantity: itm.quantity,
                        specialInstruction: itm.specialInstruction || "",
                        customization: itm?.customization || []
                    })),
                    restaurantId: id,
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                getOrderDetail(getRes.responsePacket);
                setOrderRefId(getRes.responsePacket);
            } else {
                setShowMessagePopup(true);
                setMessage(getRes.message);
            }
        } catch (e) {
            console.log(e, "error in saveOrder");
        } finally {
            setIsLoading(false);
        }
    };
    const getOrderDetail = async (orderReferenceId, noLoading) => {
        if (!noLoading) {
            setIsLoading(true);
        }
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`)
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/orderDetail/${orderReferenceId}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setOrderDetail(getRes.responsePacket);
                const orderData = {
                    orderId: getRes.responsePacket?.orderRefId,
                    orderTotal: getRes?.responsePacket.orderTotal,
                    specialInstruction: getRes.responsePacket.specialInstruction,
                };
                localStorage.setItem("orderData", JSON.stringify(orderData));
            };
        } catch (e) {
            console.log(e, "error in get Order detail");
        } finally {
            setIsLoading(false);
        }
    };

    const [isSmallLoading, setIsSmallLoading] = useState({});

    const updateItemQuantity = async (orderItemId, operation) => {
        try {
            setIsSmallLoading((prev) => ({ ...prev, [`${orderItemId}-${operation}`]: true }));

            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`)
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/updateOrderItemQuantity/${orderRefId}/${orderItemId}/${operation}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                getOrderDetail(orderRefId, "noLoading");
            } else {
                setShowMessagePopup(true);
                setMessage(getRes.message);
            }
        } catch (e) {
            console.log(e, "error in update quantity");
        } finally {
            setIsSmallLoading((prev) => ({ ...prev, [`${orderItemId}-${operation}`]: false }));
        }
    };

    const [showItemCustom, setShowItemCustom] = useState(false);
    const [customData, setCustomData] = useState({});
    const customizable = (item) => {
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrates the device for 100 milliseconds
        }
        setCustomData(item);
        setShowItemCustom(true);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [pendingItem, setPendingItem] = useState(null);
    const addToCart = (item) => {
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrates the device for 100 milliseconds
        }
        const currentRestaurant = cart.restaurant;
        if (cart.items.length > 0 && currentRestaurant?.restaurantUuid !== id) {
            setPendingItem(item);
            setMessage("You already have items from another restaurant. Clear the cart and add this item?");
            setModalVisible(true);
        } else {
            dispatch({
                type: 'ADD_ITEM',
                payload: { ...item, restaurant: { restaurantUuid: id } }
            });
        }
    };

    const handleConfirm = () => {
        if (!pendingItem) return;
        dispatch({ type: 'CLEAR_CART' });
        dispatch({
            type: 'ADD_ITEM',
            payload: { ...pendingItem, restaurant: { restaurantUuid: id } }
        });
        setModalVisible(false);
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: "REMOVE_ITEM", payload: itemId });
    };

    // customisable item


    const updateQuantity = (itemId, quantity) => {
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrates the device for 100 milliseconds
        }
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            dispatch({ type: "UPDATE_QUANTITY", payload: { uuid: itemId, quantity } });
        }
    };

    const increment = (id, quantity, localId) => {
        updateQuantity(localId, quantity)
        updateItemQuantity(id, "add");
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrates the device for 100 milliseconds
        }
    };

    const decrement = (id, quantity, localId) => {
        updateQuantity(localId, quantity);
        updateItemQuantity(id, "less");
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrates the device for 100 milliseconds
        }
    };


    const categoryRefs = useRef({});
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveCategory(entry.target.getAttribute('data-id'));
                        break;
                    }
                }
            },
            // { rootMargin: '-50% 0px -49% 0px', threshold: 0.1 }
            { rootMargin: '-30% 0px -50% 0px', threshold: 0.3 }
        );

        Object.values(categoryRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [resMenu]);

    const scrollToCategory = (uuid) => {
        const section = categoryRefs.current[uuid];
        section?.scrollIntoView({ behavior: 'smooth', block: 'center', });
        setActiveCategory(uuid);
    };

    const [showCookingPopup, setShowCookingPopup] = useState(false);
    const [itemInstruction, setItemInstruction] = useState('');
    const [getItemIdForCook, setGetItemIdForCook] = useState({ localId: '' });

    const onAddInstruction = (item) => {
        const currentItem = cart.items.find((itm) => itm.itemId === item.itemId);
        if (currentItem) {
            setShowCookingPopup(true);
            setItemInstruction(currentItem.specialInstruction ? currentItem.specialInstruction : '');
            setGetItemIdForCook({ localId: currentItem.itemId });
        }
    };

    const handleAddInstruction = () => {
        setShowCookingPopup(false);
        dispatch({
            type: 'UPDATE_SPECIAL_ITEM_INSTRUCTION',
            payload: {
                uuid: getItemIdForCook.localId,
                specialInstruction: itemInstruction,
            },
        });
    };

    return (
        <>
            <ScrollToTop />
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header filterVegNonVeg={filterVegNonVeg} handleSearch={handleSearch} />
                {/* <Banner /> */}
                <Categories list={resMenu} activeCategory={activeCategory} scrollToCategory={scrollToCategory} />
                {/* <CafeCategory /> */}
                {hotSelling?.length > 0 && <PopularItem hotSelling={hotSelling} />}
                <CafeItems
                    resMenu={filterResMenu}
                    categoryRefs={categoryRefs}
                    cart={cart}
                    dispatch={dispatch}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    customizable={customizable}
                    onEdit={onAddInstruction}
                />

                {/* cartsection */}
                {cart.items.length > 0 && cart?.restaurant?.restaurantUuid === id && <CartButton openClose={() => { setCartVisible(true); saveOrder() }} orderType={orderType} restaurantId={id} />}
                <CartPanel
                    show={cartVisible}
                    onClose={() => { setCartVisible(false) }}
                    orderDetail={orderDetail}
                    orderRefId={orderRefId}
                    increment={increment}
                    decrement={decrement}
                    saveOrder={saveOrder}
                    dispatch={dispatch}
                    orderType={orderType}
                    isLoading={isLoading}
                    isSmallLoading={isSmallLoading}
                    cart={cart}

                />
            </div>

            <PopupModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                title="Confirm Action"
                message={message}
                confirmText="Yes"
                cancelText="Cancel"
                type="confirm" // or "message"
            />

            <MessagePopup show={showMessagePopup} title="Afoozo" onClose={() => setShowMessagePopup(false)} message={message} />
            <ItemCustomPopup show={showItemCustom} onClose={() => setShowItemCustom(false)} data={customData} dispatch={dispatch} id={id} cart={cart} />
            <CookingInstructionModal
                show={showCookingPopup}
                instruction={itemInstruction}
                setInstruction={setItemInstruction}
                onClose={() => { setShowCookingPopup(false); }}
                onAdd={handleAddInstruction}
            />
        </>
    )
}
export default CafeMenu;
