import React, { useState } from "react";
import Header from "../CommonComponent/Navbar";
import Banner from "../CommonComponent/Banner";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CafeItems from "../ScreenComponents/CafeMenuComponent/CafeItems";
import CartButton from "../CommonComponent/CartButton";
import CartPanel from "./CartPanel";
import ServiceTabs from "../DeskTopUi/DeskCommonComponent/ServiceTab";
import ScrollToTop from "../../../Utilities/ScrollToTop";

function CafeMenu() {
    const [cartVisible, setCartVisible] = useState(false);

    const [items, setItems] = useState([
        { id: 1, name: 'Laksa Soup - Chicken', price: 525, quantity: 1, isVeg: false },
        { id: 2, name: 'Tom Kha Gai - Veg', price: 299, quantity: 1, isVeg: true },
    ]);

    const increment = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decrement = (id) => {
        setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const editItem = (id) => alert(`Edit item ${id}`);

    return (
        <>
        <ScrollToTop/>
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                <Banner />
                <ServiceTabs />
                <CafeCategory />
                <PopularItem />
                <CafeItems />
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
