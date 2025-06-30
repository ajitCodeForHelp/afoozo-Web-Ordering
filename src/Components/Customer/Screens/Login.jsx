import React from 'react';
import logo from '../../../Assets/notification_icon.png'; // Replace with your logo path

const Login = () => {
    return (
        <div className="min-vh-100 d-flex flex-column bg-white">
            {/* Top Nav */}


            {/* Centered Content */}
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="text-center" style={{ width: '100%', maxWidth: 350 }}>


                    <div className="bg-white rounded-4 shadow">

                        <div className="promo-header them-bg-black d-flex align-items-center justify-content-center mb-2" style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0,borderTopLeftRadius:"10px",borderTopRightRadius:"10px" }}>
                            <h5 className="text-warning m-auto">Login</h5>
                            <span></span>
                        </div>
<div className="p-4">
                        <img
                            src={logo}
                            alt="Logo"
                            className="mb-4"
                            style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                        />

                        <input
                            type="text"
                            className="form-control mb-3 rounded-pill text-center "
                            placeholder="Mobile No."
                        />
                        <button className="btn btn-dark w-100 rounded-pill fw-bold ">
                            LOGIN
                        </button>
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;