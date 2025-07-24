import React, { useState } from 'react';
import logo from '../../../Assets/notification_icon.png'; // Replace with your logo path
import OtpScreen from './Otp';
import loginPic from "../../../Assets/loginPic.jpeg";
import useIsMobile from '../../../Utilities/IsMobile';

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
                // alert("otp send successfully !");
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
    const isMobile = useIsMobile();
    return (
        <>

            {!isOtpSend ?
                (isMobile ?
                    <div className="min-vh-100 d-flex flex-column bg-white">
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <div className="text-center" style={{ width: '100%', maxWidth: 350 }}>
                                <div className="bg-white rounded-4 shadow">
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
                                        <button className="btn btn-dark w-100 rounded-pill fw-bold text-white" onClick={handleSendOtp}>
                                            LOGIN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="container-fluid login-wrapper d-flex justify-content-center align-items-center">
                        <div className="login-container d-flex">
                            {/* Left Panel */}
                            <div className="col-md-6 login-form d-flex flex-column justify-content-center align-items-start">
                                <div className="logo mb-5">
                                    <img src={logo} alt="logo" className="me-2" />
                                    <span className="brand-name">Afoozo</span>
                                </div>
                                <input type="text" placeholder="Mobile No."
                                    className="form-control z-2 input-field mb-4 rounded-5 shadow-sm p-3"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    min={10}
                                />
                                <button className="btn login-btn rounded-5 bg-dark text-white" onClick={handleSendOtp}>LOGIN</button>
                            </div>
                            <div className="col-md-6 login-image p-0 rounded-5 z-1">
                                <img
                                    src={loginPic}
                                    alt="bowl food"
                                    className="img-fluid h-100 w-100 object-fit-cover rounded-5"
                                />
                            </div>
                        </div>
                    </div>
                )
                : <OtpScreen mobileNumber={mobileNo} resend={handleSendOtp} onBack={() => setIsOtpSend(false)} />}

        </>
    );
};

export default Login;