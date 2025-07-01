import React, { useEffect, useState } from "react";
import Header from "../CommonComponent/Navbar";
import Banner from "../CommonComponent/Banner";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CafeItems from "../ScreenComponents/CafeMenuComponent/CafeItems";
import CartButton from "../CommonComponent/CartButton";
import CartPanel from "./CartPanel";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import { useParams } from "react-router-dom";

function CafeMenu() {
    const [cartVisible, setCartVisible] = useState(false);
    const { id } = useParams();

    const [items, setItems] = useState([
        { id: 1, name: 'Laksa Soup - Chicken', price: 525, quantity: 1, isVeg: false },
        { id: 2, name: 'Tom Kha Gai - Veg', price: 299, quantity: 1, isVeg: true },
    ]);

    const [resMenu, setResMenu] = useState([]);

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

    const increment = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decrement = (id) => {
        setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const editItem = (id) => alert(`Edit item ${id}`);

    return (
        <>
            <ScrollToTop />
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                <Banner />

                {/* <CafeCategory /> */}
                {hotSelling?.length > 0 && <PopularItem hotSelling={hotSelling} />}
                <CafeItems resMenu={resMenu} />

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
