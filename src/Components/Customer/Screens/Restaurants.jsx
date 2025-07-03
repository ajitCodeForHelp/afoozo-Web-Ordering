import React, { useContext, useEffect, useState } from "react";
import CafeCategory from "../ScreenComponents/RestaurantsComponent/CafeCategory";
import RestaurantList from "../ScreenComponents/RestaurantsComponent/RestaurantsList";
import Nav from "../ScreenComponents/RestaurantsComponent/Nav";
import ScrollToTop from "../../../Utilities/ScrollToTop";
import Banner from "../CommonComponent/Banner";
import { LocationContext } from "../../../Utilities/LocationContext";
import ServiceTabs from "../DeskTopUi/DeskCommonComponent/ServiceTab";
import BottomNav from "../CommonComponent/BottomNav";
import useIsMobile from "../../../Utilities/IsMobile";
import { useNavigate } from "react-router-dom";
import DineInScan from "../ScreenComponents/RestaurantsComponent/DineInScan";
import QRCodeScanner from "../CommonComponent/QRCodeScanner";

function Restaurants() {
    const location = useContext(LocationContext);
    const [RestaurantLists, setRestaurantLists] = useState([]);
    const [filterResList, setFilterResList] = useState([]);
    const [cuisineList, setCuisineList] = useState([]);
    const [orderType, setOrderType] = useState("Cafe");

    const navigate = useNavigate();
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
                if (getRes?.responsePacket?.length === 1) {
                    navigate(`cafeMenu/${getRes.responsePacket[0]?.restaurantUuid}`)
                } else {
                    setRestaurantLists(getRes.responsePacket);
                    setFilterResList(getRes.responsePacket);
                }
            }

        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };
    useEffect(() => {
        if (location && orderType && orderType !== 'DineIn') {
            getList(orderType);
        }
    }, [location, orderType]);

    const getCuisine = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/cuisineList`);
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setCuisineList(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getCusine");
        }
    };
    useEffect(() => {
        getCuisine();
    }, []);

    const [selectedCuisine, setSelectedCuisine] = useState('');
    const filterByCuisine = (cuisine) => {
        setSelectedCuisine(cuisine);
        const res = RestaurantLists?.filter((itm) => itm?.cuisineList?.some((item) => item === cuisine));
        setFilterResList(res)
    };
    useEffect(() => {
        if (!selectedCuisine) {
            setFilterResList(RestaurantLists);
            console.log("run run");
        }
    }, [selectedCuisine]);
    const isMobile = useIsMobile();

    const [scannedData, setScannedData] = useState(null);

    const handleScanSuccess = (data) => {
        setScannedData(data);
        // Parse data or route user to menu page
        console.log("Scanned:", data);
    };

    return (
        <>
            <ScrollToTop />
            <Nav />
            <Banner />
            {!isMobile && <ServiceTabs orderType={orderType} setOrderType={setOrderType} />}
            {orderType !== "DineIn" && <CafeCategory cuisineList={cuisineList} filterByCuisine={filterByCuisine} />}
            {orderType === "DineIn" && <DineInScan />}
            {isMobile && <BottomNav orderType={orderType} setOrderType={setOrderType} />}
            {orderType !== "DineIn" && <RestaurantList restaurants={filterResList} selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} orderType={orderType} />}
            {/* {orderType === "DineIn" && <QRCodeScanner onScanSuccess={handleScanSuccess}/>} */}
        </>
    )
}

export default Restaurants;
