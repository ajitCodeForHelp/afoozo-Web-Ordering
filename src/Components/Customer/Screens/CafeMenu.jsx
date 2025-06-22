import React from "react";
import Header from "../CommonComponent/Navbar";
import Banner from "../CommonComponent/Banner";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import PopularItem from "../ScreenComponents/CafeMenuComponent/PopularItem";
import CafeItems from "../ScreenComponents/CafeMenuComponent/CafeItems";
import BottomNav from "../CommonComponent/BottomNav";

function CafeMenu() {
    return (
        <>
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                <Banner />
                <CafeCategory />
                <PopularItem />
                <CafeItems />
                <BottomNav />
            </div>
        </>
    )
}
export default CafeMenu;
