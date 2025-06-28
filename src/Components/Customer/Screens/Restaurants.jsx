import React from "react";
import DeskHeader from "../DeskTopUi/DeskCommonComponent/DeskHeader";
import DeskBanner from "../DeskTopUi/DeskCommonComponent/DeskBanner";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import RestaurantList from "../ScreenComponents/RestaurantsComponent/RestaurantsList";
import Nav from "../ScreenComponents/RestaurantsComponent/Nav";
import ScrollToTop from "../../../Utilities/ScrollToTop";

function Restaurants() {
    return (
        <>
            <ScrollToTop />
            <Nav />
            <DeskBanner />
            <CafeCategory />
            <RestaurantList />
        </>
    )
}

export default Restaurants;
