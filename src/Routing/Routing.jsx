import React from "react";
import { Route, Routes } from "react-router-dom";
import CafeMenu from "../Components/Customer/Screens/CafeMenu";
import Restaurants from "../Components/Customer/Screens/Restaurants";
import LocationGate from "../Utilities/LocationGate";
import Login from "../Components/Customer/Screens/Login";
import AuthGate from "../Utilities/AuthGate";
import { CartProvider } from "../Utilities/CartProvider";
import DineInMenu from "../Components/Customer/Screens/DineInMenu";
import OrderTrack from "../Components/Customer/Screens/OrderTrack";


function Routing() {

    return (
        <CartProvider>
            <LocationGate>
                <Routes>
                    {/* <Route path="/" element={<AuthGate />} /> */}
                    <Route path="/"
                        element={
                            <AuthGate>
                                <Restaurants />
                            </AuthGate>
                        } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cafeMenu/:id" element={
                        <AuthGate>
                            <CafeMenu />
                        </AuthGate>
                    } />
                    <Route path="/dineInMenu/:id" element={
                        <AuthGate>
                            <DineInMenu />
                        </AuthGate>
                    } />
                    <Route path="/orderTrack" element={
                        <AuthGate>
                            <OrderTrack />
                        </AuthGate>
                    } />

                    {/* <Route path="/cafeMenu" element={<Home />} /> */}
                </Routes>
            </LocationGate>
        </CartProvider>
    )
}
export default Routing;