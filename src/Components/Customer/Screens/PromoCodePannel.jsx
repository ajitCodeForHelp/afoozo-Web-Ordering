import React, { useEffect } from "react";
import ApplyPromoCodeBox from "../ScreenComponents/PromoCode/PromoCodeBox";

function PromoCodePannel({ visible, onClose, onApply, code, setCode }) {
   

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "auto";
    }, [visible]);

    return (
        <ApplyPromoCodeBox
            visible={visible}
            onClose={onClose}
            onApply={onApply}
            code={code}
            setCode={setCode}
        />
    )
}

export default PromoCodePannel;
