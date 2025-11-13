import React, { useContext, useEffect, useRef, useState } from "react";
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
import Loading from "../CommonComponent/LoadingWait";
import { Authorization } from "../../../Utilities/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { setOrderTypeee } from "../../../Redux/orderTypeSlice";
import { fetchRestaurant } from "../../../Redux/ResturantApi";
import LiveOrdersSlide from "../ScreenComponents/RestaurantsComponent/LiveOrdersSlide";

function Restaurants() {
    const location = useContext(LocationContext);
    const { response } = useSelector((state) => state.resturentApi);
    const [RestaurantLists, setRestaurantLists] = useState(response?.responsePacket || []);
    const [filterResList, setFilterResList] = useState(response?.responsePacket || []);
    const [isLoading, setIsLoading] = useState(false);

    const [cuisineList, setCuisineList] = useState([]);
    // const hasRedirected = useRef(false);
    const orderType = useSelector((state) => state.orderType.orderType);
    const setOrderType = useDispatch();

    // console.log(orderType, "orderType");
    // const [orderType, setOrderType] = useState("Cafe");

    const navigate = useNavigate();
    // const getList = async (typeOrder) => {
    //     const token = localStorage.getItem("secretKey");
    //     const latitude = 19.032626310834413 // Number(location?.latitude);19.032626310834413  //23.8623  //
    //     const longitude = 72.84266162663698 // Number(location?.longitude); 72.84266162663698 //91.2825 //
    //     if (!latitude || !longitude || !token) {
    //         console.error("Missing location or token");
    //         return;
    //     }
    //     try {
    //         setIsLoading(true);
    //         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/restaurantList`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 latitude,
    //                 longitude,
    //                 cityId: 0,
    //                 length: -1,
    //                 searchKey: "",
    //                 startCount: 0,
    //                 orderType: typeOrder
    //             })
    //         });

    //         const getRes = await res.json();
    //         if (getRes.errorCode === 0) {

    //             if (getRes?.responsePacket?.length === 1 && !sessionStorage.getItem("hasRedirected")) {
    //                 sessionStorage.setItem("hasRedirected", "true");
    //                 setRestaurantLists(getRes.responsePacket);
    //                 setFilterResList(getRes.responsePacket);
    //                 navigate(`/cafeMenu/${getRes.responsePacket[0]?.restaurantUuid}`, { state: { resDetail: getRes.responsePacket[0], orderType: orderType, open: getRes.responsePacket[0].open } });
    //             } else if (getRes?.responsePacket?.length <= 0 && typeOrder !== "HomeDelivery") {
    //                 getList("HomeDelivery");
    //                 setOrderType(setOrderTypeee("HomeDelivery"));
    //                 // setOrderType("HomeDelivery");
    //             } else {
    //                 setRestaurantLists(getRes.responsePacket);
    //                 setFilterResList(getRes.responsePacket);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Fetch failed:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const getLisz = (order) => {
        try {
            sessionStorage.setItem("orderType", order);
            setOrderType(fetchRestaurant(order)).then((res) => {
                const getRes = res.payload;
                if (getRes?.errorCode === 0) {
                    if (getRes?.responsePacket?.length === 1 && !sessionStorage.getItem("hasRedirected")) {
                        sessionStorage.setItem("hasRedirected", "true");
                        setRestaurantLists(getRes.responsePacket);
                        setFilterResList(getRes.responsePacket);
                        navigate(`/cafeMenu/${getRes.responsePacket[0]?.restaurantUuid}`,
                            {
                                state: {
                                    resDetail: getRes.responsePacket[0],
                                    orderType: order,
                                    open: getRes.responsePacket[0].open
                                }
                            });
                    } else if (getRes?.responsePacket?.length <= 0 && order !== "HomeDelivery" && order !== 'DineIn') {
                        // sessionStorage.setItem("orderType", "HomeDelivery");
                        setOrderType(setOrderTypeee("HomeDelivery"));
                        // setOrderType("HomeDelivery");
                        getLisz("HomeDelivery");
                    }
                    else {
                        setRestaurantLists(getRes.responsePacket);
                        setFilterResList(getRes.responsePacket);
                    }
                }
            });
        } catch (err) {
            console.log(err, "error in fetch restautrent")
        }
    };

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            getLisz(orderType);
        } else if (!hasVisited || response?.length <= 0) {
            getLisz(orderType);
            sessionStorage.setItem("hasVisited", "true");
        }
    }, []);

    // useEffect(() => {
    //     if (!orderType) return;
    //     sessionStorage.setItem("orderType", orderType);

    //     if (orderType !== "DineIn") {
    //         getList(orderType);
    //     }
    //     console.log("run run run run run ");
    //     if (orderType !== "Cafe") {
    //         sessionStorage.removeItem("hasRedirected");
    //     }
    //     if (orderType === "HomeDelivery") {
    //         getCuisine();
    //     }
    // }, [orderType]);

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
        if (orderType === "HomeDelivery") {
            getCuisine();
        }
    }, [orderType]);


    const [selectedCuisine, setSelectedCuisine] = useState('');
    const filterByCuisine = (cuisine) => {
        setSelectedCuisine(cuisine);
        const res = RestaurantLists?.filter((itm) => itm?.cuisineList?.some((item) => item === cuisine));
        setFilterResList(res)
    };

    useEffect(() => {
        if (!selectedCuisine) {
            setFilterResList(RestaurantLists);
        }
    }, [selectedCuisine]);

    const isMobile = useIsMobile();

    const [showScanner, setShowScanner] = useState(false);
    const getScanCode = async (qrCode) => {
        try {
            // const mobile = localStorage.getItem("mobileNo");
            // const key = localStorage.getItem("secretKey");
            // const BasicAuth = btoa(`${mobile}:${key}`);
            const BasicAuth = Authorization();

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/scanQrCode/${qrCode}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                navigate(`/dineInMenu/${getRes?.responsePacket?.restaurantUuid}`, { state: { resDetail: getRes.responsePacket, orderType: orderType } })
            }
        } catch (e) {
            console.log(e, "error in scanQr api")
        }
    };

    const extractQrCode = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.searchParams.keys().next().value; // gets the query key
        } catch (e) {
            console.error("Invalid QR URL:", e);
            return null;
        }
    };

    const handleScanSuccess = (data) => {
        if (data) {
            const tableCode = extractQrCode(data);
            getScanCode(tableCode);
            console.log("Scanned:", data, tableCode);
        }
    };

    // console.log(orderType, "orderType");

    return (
        <>
            <div className={`${isMobile && "pb-5"}`}>
                <ScrollToTop />
                <Nav orderType={orderType} />
                {orderType !== "DineIn" && <Banner orderType={orderType} />}
                {!isMobile && <ServiceTabs orderType={orderType} setOrderType={setOrderType} getList={getLisz} />}
                {orderType === "HomeDelivery" && <CafeCategory cuisineList={cuisineList} filterByCuisine={filterByCuisine} />}
                {orderType === "DineIn" && <DineInScan setShowScanner={setShowScanner} />}
                {isLoading ? <Loading fullScreen={false} /> : orderType !== "DineIn" &&
                    <RestaurantList
                        restaurants={filterResList}
                        selectedCuisine={selectedCuisine}
                        setSelectedCuisine={setSelectedCuisine}
                        orderType={orderType} />
                }
                {orderType === "DineIn" && showScanner &&
                    <QRCodeScanner
                        onScanSuccess={handleScanSuccess}
                        onClose={() => setShowScanner(false)}
                    />}
                <LiveOrdersSlide />
                {isMobile && <BottomNav orderType={orderType} setOrderType={setOrderType} getList={getLisz} />}
            </div>
        </>
    )
}

export default Restaurants;
