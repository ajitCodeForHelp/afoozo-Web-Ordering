import React, { useContext, useEffect, useState } from "react";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import RestaurantList from "../ScreenComponents/RestaurantsComponent/RestaurantsList";
import Nav from "../ScreenComponents/RestaurantsComponent/Nav";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import Banner from "../CommonComponent/Banner";
import { LocationContext } from "../../../Utilities/LocationContext";

function Restaurants() {
    const [RestaurantLists, setRestaurantLists] = useState([]);
    const location = useContext(LocationContext);
    const getList = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/restaurantList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                latitude: location?.latitude,
                longitude: location?.longitude,
            })
        })
    };
    useEffect(() => {
        if (location) {
            getList();
        }
    }, [location]);

    return (
        <>
            <ScrollToTop />
            <Nav />
            <Banner />
            <CafeCategory />
            <RestaurantList />
        </>
    )
}

export default Restaurants;
