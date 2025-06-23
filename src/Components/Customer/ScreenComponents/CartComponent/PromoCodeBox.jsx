import React from 'react';
import { PiSealPercentBold } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";

const PromoCodeBox = ({ onClick }) => {
    return (
        <div className="promo-box d-flex justify-content-between align-items-center p-3 mb-3 shadow-sm bg-white rounded cursor-pointer" onClick={onClick}>
            <div className="d-flex align-items-center gap-2">
                <PiSealPercentBold />
                <strong>Apply Promo Code</strong>
            </div>
            <RiArrowRightSLine />
        </div>
    );
};

export default PromoCodeBox;
