import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/**
 * A reusable popup handler that supports nested popups.
 * - Each popup has its own key (e.g., ?popup=updateProfile,editAddress)
 * - Pressing back removes the top popup and keeps the previous open
 */
const PopupManager = ({ popupKey, children }) => {
    const [search] = useSearchParams();
    const navigate = useNavigate();

    const popupStack = search.get("sub")?.split(",") || [];

    // const isTopPopup = popupStack[popupStack.length - 1] === popupKey;
    const isOpen = popupStack.includes(popupKey);

    const openPopup = (key) => {
        const newStack = [...popupStack, key].filter(Boolean);
        navigate(`?sub=${newStack.join(",")}`);
    };

    const closePopup = () => {
        const newStack = popupStack.slice(0, -1);
        if (newStack.length) {
            navigate(`?sub=${newStack.join(",")}`);
        } else {
            navigate(window.location.pathname); // remove popup param
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {React.cloneElement(children, { closePopup, openPopup })}
        </>

    );
};

export default PopupManager;
