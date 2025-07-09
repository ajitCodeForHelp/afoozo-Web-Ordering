import React from "react";

function DeliveryLocationMap({ lati, long }) {
    return (
        <>
            <div className="">
                <iframe
                    width="100%"
                    height="400"
                    frameborder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${lati},${long}&z=15&output=embed`}
                    allowfullscreen>
                </iframe>
            </div>
        </>
    )
}

export default DeliveryLocationMap;
