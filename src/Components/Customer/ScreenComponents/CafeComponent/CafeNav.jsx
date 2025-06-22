import React from "react";
import logo from "../../../../Assets/notification_icon-removebg-preview.png";
import { MdLocationPin } from "react-icons/md";
function CafeNav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white pt-0">
        <div className="container-fluid px-0 pt-0 pb-0">
          {/* Logo with angled background */}
          <div className="logo-container d-flex align-items-center text-white them-bg w-25">
            <img src={logo} alt="logo" style={{ height: '40px' }} className="me-2" />
            <h4 className="mb-0 fw-semibold">Menu is For</h4>
          </div>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-end align-items-center w-50">
              {/* <MapPin size={18} /> */}
              <div className="fs-1 them-color">
                <span><MdLocationPin /></span>
              </div>
              <div className="mt-2 w-75">
                <p className="fw-medium change-location m-0 p-0">Change Location</p>
                <p className="m-0 p-0 two-line-ellipsis">32, Sitaram Keer Marg, VSNL C... ,kanta choraha jhotwara, jaipur</p>
              </div>
              {/* <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Orders</a>
                </li>
                <li className="nav-item dropdown mx-2">
                  <a className="nav-link" href="#">
                    Favorities
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Setting</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Help & Support</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Logout</a>
                </li> */}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default CafeNav;
