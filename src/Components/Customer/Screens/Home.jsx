import React from "react";
import HomeCards from "../ScreenComponents/HomeComponent/HomeCards";
import Header from "../CommonComponent/Navbar";
import BottomNav from "../CommonComponent/BottomNav";
import Banner from "../CommonComponent/Banner";

function Home() {

    return (
        <>
            <div className="" style={{ paddingBottom: "70px" }}>
                <Header />
                <Banner />
                <HomeCards />
                <Banner />
                <BottomNav />
            </div>
        </>
    )
}
export default Home;