import React, { useEffect, useRef, useState } from "react";
import Header from "../CommonComponent/Navbar";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CartButton from "../CommonComponent/CartButton";
import CartPanel from "./CartPanel";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import { useLocation, useParams } from "react-router-dom";
import Categories from "../ScreenComponents/CafeMenuComponent/Categories";
import { useCart } from "../../../Utilities/CartProvider";
import MenuItemCard from "../ScreenComponents/DineInComponent/MenuItems";
import PopupModal from "../CommonComponent/Modals/PopUpModal";

function DineInMenu() {
    const [cartVisible, setCartVisible] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const { resDetail, orderType } = location.state || {}
    const [resMenu, setResMenu] = useState([]);
    const [activeCategory, setActiveCategory] = useState(resMenu[0]?.categoryUuid);

    const getData = async () => {
        try {
            const key = localStorage.getItem("secretKey");

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getItemListWithCatSubCat`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantId: id,
                    orderType: orderType,
                    tableNumber: resDetail?.tableNumber,
                    length: -1,
                    searchKey: "",
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setResMenu(getRes.responsePacket);
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

    const { cart, dispatch } = useCart();
    // order detail
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderRefId, setOrderRefId] = useState('');
    const saveOrder = async () => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/saveOrder`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderType: orderType,
                    addressId: orderType === "HomeDelivery" || orderType === "TakeAway" ? 7592 : null,
                    specialInstruction: "Please deliver ASAP",
                    itemList: cart?.items?.map((itm) => ({
                        itemId: itm.itemId,
                        quantity: itm.quantity,
                        specialInstruction: itm?.specialInstruction || "",
                        customization: itm?.customization || []
                    })),
                    restaurantId: id,
                    tableNumber: resDetail?.tableNumber,
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                getOrderDetail(getRes.responsePacket);
                setOrderRefId(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in saveOrder");
        }
    };

    const getOrderDetail = async (orderReferenceId) => {
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
            }
        } catch (e) {
            console.log(e, "error in get Order detail");
        }
    };

    const updateItemQuantity = async (orderItemId, operation) => {
        try {
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
                getOrderDetail(orderRefId);
            }
        } catch (e) {
            console.log(e, "error in update quantity");
        }
    };

    // const addToCart = (product) => {
    //     dispatch({ type: 'ADD_ITEM', payload: product });
    // };
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [pendingItem, setPendingItem] = useState(null);
    const addToCart = (item) => {
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

    // const addToCart = (item) => {
    //     const currentRestaurant = cart.restaurant;

    //     if (cart.items.length > 0 && currentRestaurant?.restaurantUuid !== id) {
    //         // Prompt user to clear cart
    //         const confirmReset = window.confirm(
    //             "You already have items from another restaurant. Clear the cart and add this item?"
    //         );

    //         if (confirmReset) {
    //             dispatch({ type: 'CLEAR_CART' });
    //             dispatch({
    //                 type: 'ADD_ITEM',
    //                 payload: { ...item, restaurant: { restaurantUuid: id } }
    //             });
    //         }
    //     } else {
    //         dispatch({
    //             type: 'ADD_ITEM',
    //             payload: { ...item, restaurant: { restaurantUuid: id } }
    //         });
    //     }
    // };


    const removeFromCart = (itemId) => {
        dispatch({ type: "REMOVE_ITEM", payload: itemId });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            dispatch({ type: "UPDATE_QUANTITY", payload: { uuid: itemId, quantity } });
            console.log("localId", itemId, quantity);
        }
    };

    // const addAddress = (uuid) => {
    //     dispatch({ type: 'SET_ADDRESS', payload: uuid });
    // };

    const increment = (id, quantity, localId) => {
        // setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
        updateQuantity(localId, quantity)
        updateItemQuantity(id, "add");
        console.log(id, quantity, "modal", localId);
    };

    const decrement = (id, quantity, localId) => {
        // setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
        updateQuantity(localId, quantity);
        updateItemQuantity(id, "less");
    };

    const editItem = (id) => alert(`Edit item ${id}`);

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

    return (
        <>
            <ScrollToTop />
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                {/* <Banner /> */}
                <Categories list={resMenu} activeCategory={activeCategory} scrollToCategory={scrollToCategory} />
                {/* <CafeCategory /> */}
                {hotSelling?.length > 0 && <PopularItem hotSelling={hotSelling} />}
                {/* <CafeItems
                    resMenu={resMenu}
                    categoryRefs={categoryRefs}
                    cart={cart}
                    dispatch={dispatch}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                /> */}
                {
                    resMenu?.flatMap((itm, idx) => {
                        return (
                            <>
                                <div className="d-flex flex-column justify-content-center gap-2">
                                    <div ref={(el) => (categoryRefs.current[itm?.categoryUuid] = el)} data-id={itm?.categoryUuid} key={idx} className="pt-2">
                                        <h5 className="text-warning px-4 py-2">{itm?.categoryName}</h5>
                                    </div>
                                    {
                                        itm?.menuList?.map((item, index) => {
                                            const cartItem = cart?.items?.find((pro) => pro.uuid === item.uuid);
                                            const quantity = cartItem?.quantity || 0;

                                            return (
                                                <div className="px-4">
                                                    <MenuItemCard key={index} item={item} addToCart={addToCart} cart={cart} dispatch={dispatch} cartItem={cartItem} quantity={quantity} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }

                {/* cartsection */}
                {cart.items.length > 0 && cart?.restaurant?.restaurantUuid === id && <CartButton openClose={() => { setCartVisible(true); saveOrder() }} orderType={orderType} restaurantId={id} />}
                <CartPanel
                    show={cartVisible}
                    onClose={() => setCartVisible(false)}
                    orderDetail={orderDetail}
                    orderRefId={orderRefId}
                    increment={increment}
                    decrement={decrement}
                    edit={editItem}
                    saveOrder={saveOrder}
                    dispatch={dispatch}
                    orderType={orderType}
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
        </>
    )
}
export default DineInMenu;
