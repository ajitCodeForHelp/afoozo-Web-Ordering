import { useEffect, useRef } from "react";

/**
 * Hook to handle Android/iOS browser back button popup closing
 * @param {Array<{ id: string, isOpen: boolean, onClose: Function }>} popupStack
 */
export default function usePopupBackHandler(popupStack) {
  const pushedStack = useRef([]);

  // Track browser back
  useEffect(() => {
    const handlePopState = () => {
      const lastPushed = pushedStack.current.pop();
      if (lastPushed && lastPushed.onClose) {
        lastPushed.onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Monitor open state changes
  useEffect(() => {
    popupStack.forEach(popup => {
      const alreadyPushed = pushedStack.current.find(p => p.id === popup.id);

      if (popup.isOpen && !alreadyPushed) {
        window.history.pushState({ popup: popup.id }, "");
        pushedStack.current.push(popup);
      }

      if (!popup.isOpen && alreadyPushed) {
        pushedStack.current = pushedStack.current.filter(p => p.id !== popup.id);
      }
    });
  }, [popupStack]);
}
