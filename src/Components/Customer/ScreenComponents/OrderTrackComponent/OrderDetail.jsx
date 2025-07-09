import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCircleInfo } from 'react-icons/fa6';

const OrderDetails = () => {
  return (
    <div className="container my-4 ">
      <div className="card shadow-sm p-3 rounded-4">
        <h6 className="fw-semibold mb-3">
          Order Details <span className="text-muted">ORD-0000406118</span>
        </h6>

        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
            <span>🟢 Fav Paneer Tikka Masala Thali x 1</span>
            <span>₹196.00</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
            <span>🟢 Gharelu thali of the day x 1</span>
            <span>₹148.00</span>
          </li>
        </ul>

        <div className="d-flex justify-content-between">
          <span className="text-muted">Sub Total</span>
          <span className="fw-medium">₹344.00</span>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <span className="text-muted">
            Tax <FaCircleInfo style={{ fontSize: '12px', marginLeft: '5px' }} />
          </span>
          <span className="fw-medium">₹17.20</span>
        </div>

        <div className="d-flex justify-content-between mt-2">
          <span className="text-muted">Packing Charges</span>
          <span className="fw-medium">₹13.76</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Grand Total</span>
          <span>₹375.00</span>
        </div>

        <div className="bg-light text-center mt-3 p-2 rounded-3 text-success fw-semibold">
          Paid By wallet ₹375.00
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;