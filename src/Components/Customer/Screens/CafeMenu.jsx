import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../CommonComponent/Navbar";
import Banner from "../CommonComponent/Banner";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CafeItems from "../ScreenComponents/CafeMenuComponent/CafeItems";
import CartButton from "../CommonComponent/CartButton";
import CartPanel from "./CartPanel";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import { useParams } from "react-router-dom";
import Categories from "../ScreenComponents/CafeMenuComponent/Categories";
import { CartContext, useCart } from "../../../Utilities/CartProvider";

function CafeMenu() {
    const [cartVisible, setCartVisible] = useState(false);
    const { id } = useParams();

    const [items, setItems] = useState([]);

    const [resMenu, setResMenu] = useState([]);
    const [activeCategory, setActiveCategory] = useState(resMenu[0]?.categoryUuid);
    // const [filterVegNon, setFilterVegNon] = useState([]);
    // const [itemCategories,setItemCategories] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getItemListWithCatSubCat`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantId: id,
                    orderType: "Cafe",
                    tableNumber: 0,
                    length: -1,
                    searchKey: "",
                })
            })
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
console.log(cart,"cart");
    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };
    const removeFromCart = (itemId) => {
        dispatch({ type: "REMOVE_ITEM", payload: itemId });
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
        } else {
            dispatch({ type: "UPDATE_QUANTITY", payload: { uuid: itemId, quantity } });
        }
    };

    // const addAddress = (uuid) => {
    //     dispatch({ type: 'SET_ADDRESS', payload: uuid });
    // };

    const increment = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decrement = (id) => {
        setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
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

    return (
        <>
            <ScrollToTop />
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                {/* <Banner /> */}
                <Categories list={resMenu} activeCategory={activeCategory} scrollToCategory={scrollToCategory} />
                {/* <CafeCategory /> */}
                {hotSelling?.length > 0 && <PopularItem hotSelling={hotSelling} />}
                <CafeItems
                    resMenu={resMenu}
                    categoryRefs={categoryRefs}
                    cart={cart}
                    dispatch={dispatch}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                />

                {/* cartsection */}
                <CartButton openClose={() => setCartVisible(true)} />
                <CartPanel
                    show={cartVisible}
                    onClose={() => setCartVisible(false)}
                    items={items}
                    increment={increment}
                    decrement={decrement}
                    edit={editItem}
                />
            </div>
        </>
    )
}
export default CafeMenu;
