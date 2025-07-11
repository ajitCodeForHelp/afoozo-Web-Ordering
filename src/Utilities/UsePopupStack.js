import { useEffect, useRef } from "react";

export default function usePopupBackHandler(popupStack) {
  const pushedStack = useRef([]);
  const skipNextPop = useRef(false); // ← Key to fixing double-closes
  const recentlyClosed = useRef(new Set());

  useEffect(() => {
    const handlePopState = () => {
      if (skipNextPop.current) {
        skipNextPop.current = false;
        return; // ❌ Do not handle this popstate — it's artificial
      }

      const last = pushedStack.current.pop();
      if (last?.onClose) {
        recentlyClosed.current.add(last.id);
        last.onClose(); // This will set isOpen = false in your state
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    popupStack.forEach((popup) => {
      const isInStack = pushedStack.current.find(p => p.id === popup.id);

      // Opening
      if (popup.isOpen && !isInStack) {
        window.history.pushState({ popupId: popup.id }, "");
        pushedStack.current.push(popup);
      }

      // Closing
      if (!popup.isOpen && isInStack) {
        pushedStack.current = pushedStack.current.filter(p => p.id !== popup.id);
        const currentPopupId = window.history.state?.popupId;

        if (recentlyClosed.current.has(popup.id)) {
          recentlyClosed.current.delete(popup.id);
        } else if (currentPopupId === popup.id) {
          skipNextPop.current = true;
          window.history.back(); // ← Prevents triggering popstate handler
        }
      }
    });
  }, [popupStack]);
}
