import React, { useContext, useEffect, useState } from "react";
import CafeCategory from "../ScreenComponents/CafeMenuComponent/CafeCategory";
import RestaurantList from "../ScreenComponents/RestaurantsComponent/RestaurantsList";
import Nav from "../ScreenComponents/RestaurantsComponent/Nav";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import Banner from "../CommonComponent/Banner";
import { LocationContext } from "../../../Utilities/LocationContext";
import ServiceTabs from "../DeskTopUi/DeskCommonComponent/ServiceTab";
import BottomNav from "../CommonComponent/BottomNav";
import useIsMobile from "../../../Utilities/IsMobile";

function Restaurants() {
    const location = useContext(LocationContext);
    const [RestaurantLists, setRestaurantLists] = useState([]);
    // const [filterResList, setFilterResList] = useState([...RestaurantList]);
    // const [cuisineList,setCuisineList] = useState([]);
    const [orderType, setOrderType] = useState("HomeDelivery");

    const getList = async (typeOrder) => {
        const token = localStorage.getItem("secretKey");
        const latitude = 23.8623 // 18.964340379970906 // Number(location?.latitude);
        const longitude = 91.2825 //72.80848659347991 // Number(location?.longitude);
        if (!latitude || !longitude || !token) {
            console.error("Missing location or token");
            return;
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/restaurantList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    latitude,
                    longitude,
                    cityId: 0,
                    length: -1,
                    searchKey: "",
                    startCount: 0,
                    orderType: typeOrder,
                }),
            });

            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setRestaurantLists(getRes.responsePacket);
                // setFilterResList(getRes.responsePacket);
            }

        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    useEffect(() => {
        if (location && orderType) {
            getList(orderType);
        }
    }, [location, orderType]);
    const isMobile = useIsMobile();
    return (
        <>
            <ScrollToTop />
            <Nav />
            <Banner />
            {!isMobile && <ServiceTabs orderType={orderType} setOrderType={setOrderType} />}
            <CafeCategory />
            {isMobile && <BottomNav />}
            <RestaurantList restaurants={RestaurantLists} />
        </>
    )
}

export default Restaurants;
