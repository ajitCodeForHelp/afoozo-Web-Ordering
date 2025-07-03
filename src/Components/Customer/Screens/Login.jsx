import React, { useState } from 'react';
import logo from '../../../Assets/notification_icon.png'; // Replace with your logo path
import OtpScreen from './Otp';

const Login = () => {

    const [isOtpSend, setIsOtpSend] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    // mobileNumber
    const sendOtp = async () => {
        const url = `${process.env.REACT_APP_BASE_URL}/v1/api/generateOtpForUser`;
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobileNumber: mobileNo
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setIsOtpSend(true);
                alert("otp send successfully !");
            }
        } catch (e) {
            console.log(e, "error in login api");
            alert(e.message, "error1");
        }
    };

    const handleSendOtp = () => {
        if (mobileNo?.length >= 10) {
            sendOtp();
        } else {
            alert("enter Correct mobile number");
        }
    };

    return (
        <>

            {!isOtpSend ? <div className="min-vh-100 d-flex flex-column bg-white">
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <div className="text-center" style={{ width: '100%', maxWidth: 350 }}>
                        <div className="bg-white rounded-4 shadow">

                            {/* <div className="promo-header them-bg-black d-flex align-items-center justify-content-center mb-2" style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                            <h5 className="text-warning m-auto">Login</h5>
                            <span></span>
                        </div> */}
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
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    min={10}
                                />
                                <button className="btn btn-dark w-100 rounded-pill fw-bold text-warning" onClick={handleSendOtp}>
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <OtpScreen mobileNumber={mobileNo} resend={handleSendOtp} />}
        </>
    );
};

export default Login;