import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import DeliveryLocationMap from './DeliveryLocationMap';
import veg from "../../../../Assets/Veg-symbole.png";
import nonVeg from "../../../../Assets/Non-veg-symbol.png";

const OrderDetails = ({ OrderDetail }) => {
  return (
    <>
      <DeliveryLocationMap lati={OrderDetail?.deliveryLatitude} long={OrderDetail?.deliveryLongitude} />
      <div className="container my-4 ">
        <div className="card shadow-sm p-3 rounded-4">
          <h6 className="fw-semibold mb-3">
            Order Details <span className="text-muted">{OrderDetail?.orderRefId}</span>
          </h6>

          <ul className="list-group list-group-flush mb-3">
            {OrderDetail?.itemList?.map((itm) => {
              return (
                <>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    <span>{itm?.title}</span>
                    <span>₹{itm?.finalPrice * itm?.quantity}</span>
                  </li>
                </>
              )
            })}
          </ul>

          <div className="d-flex justify-content-between">
            <span className="text-muted">Sub Total</span>
            <span className="fw-medium">₹{Number(OrderDetail?.orderSubTotal).toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">
              Tax <FaCircleInfo style={{ fontSize: '12px', marginLeft: '5px' }} />
            </span>
            <span className="fw-medium">₹{Number(OrderDetail?.taxAmount).toFixed(2)}</span>
          </div>

          {OrderDetail?.packingCharges > 0 && <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">Packing Charges</span>
            <span className="fw-medium">₹{Number(OrderDetail?.packingCharges).toFixed(2)}</span>
          </div>}

          <hr />

          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Grand Total</span>
            <span>₹{Number(OrderDetail?.orderTotal).toFixed(2)}</span>
          </div>

          <div className="bg-light text-center mt-3 p-2 rounded-3 text-success fw-semibold">
            Paid By wallet ₹{Number(OrderDetail?.orderTotal).toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;