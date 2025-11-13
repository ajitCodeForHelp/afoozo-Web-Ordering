import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/**
 * PopupManager v2
 * - Handles nested popups with back button support
 * - Keeps each popup navigation in browser history
 */
const PopupManager = ({ popupKey, children }) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const popupStack = search.get("sub")?.split(",").filter(Boolean) || [];
  const isOpen = popupStack.includes(popupKey);

  // Open a popup (pushes a new state to history)
  const openPopup = (key) => {
    const newStack = [...popupStack, key].filter(Boolean);
    navigate(`?sub=${newStack.join(",")}`, { replace: false }); // ✅ push new history entry
  };

  // Close only the top popup
  const closePopup = () => {
    const newStack = popupStack.slice(0, -1);
    if (newStack.length) {
      navigate(`?sub=${newStack.join(",")}`, { replace: false }); // ✅ also push state
    } else {
      navigate(window.location.pathname, { replace: false }); // ✅ go back to base route
    }
  };

  // Close top popup when browser back button is pressed
  useEffect(() => {
    const handlePopState = () => {
      // when user presses back, remove top popup manually if multiple
      if (popupStack.length > 1) {
        const newStack = popupStack.slice(0, -1);
        navigate(`?sub=${newStack.join(",")}`, { replace: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [popupStack, navigate]);

  if (!isOpen) return null;

  return React.cloneElement(children, { closePopup, openPopup });
};

export default PopupManager;
