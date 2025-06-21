import React from 'react';
import logo from "../../../Assets/notification_icon-removebg-preview.png";
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

export default function Header() {
  return (
    <>
      <div className="main-header shadow-sm" style={{ marginBottom: "1px" }}>
        {/* Top Info Bar */}
        <div className="top-bar d-flex justify-content-end align-items-center px-3 py-1 text-white">
          <div>
            <i className="fas fa-phone-alt me-2"></i> (+0)-000-0000-000
            <span className="ms-3">
              <i className="fas fa-envelope me-2"></i> support@websitename.com
            </span>
          </div>
          <div>
            <i className="fab fa-facebook-f me-3"></i>
            <i className="fab fa-instagram me-3"></i>
            <i className="fab fa-twitter me-3"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white pt-0">
          <div className="container-fluid px-0 pt-0 pb-0">
            {/* Logo with angled background */}
            <div className="logo-container d-flex align-items-center text-white them-bg">
              <img src={logo} alt="logo" style={{ height: '40px' }} className="me-2" />
              <h4 className="mb-0 fw-semibold">AFOOZO</h4>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Orders</a>
                </li>
                <li className="nav-item dropdown mx-2">
                  {/* dropdown-toggle role="button" data-bs-toggle="dropdown" id="navbarDropdown"*/}
                  <a className="nav-link" href="#"  >
                    Favorities
                  </a>
                  {/* <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                </ul> */}
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Setting</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Help & Support</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>


      <div className="container-fluid bg-white shadow-sm py-3 px-3 sticky-top">
        <div className="row gx-2 align-items-center">
          <div className="col-12 col-md flex-grow-1 position-relative">
            {/* <i className="ri-search-line position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary"></i> */}
            <IoIosSearch className='position-absolute search-icon' />
            <input type="text" className="search-input form-control ps-5 py-2 bg-light rounded-pill" placeholder="Search food..." />
          </div>
          <div className="col-auto mt-2 mt-md-0">
            <div className="dropdown">
              <button className="btn btn-danger d-flex align-items-center gap-1 rounded-pill px-3 py-2 them-bg" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <IoFilterSharp />
                <span>Filters</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3 shadow" style={{ minWidth: "200px" }}>
                <li>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="vegetarian" />
                    <label className="form-check-label" for="vegetarian">Vegetarian</label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="nonVegetarian" />
                    <label className="form-check-label" for="nonVegetarian">Non-Vegetarian</label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="allergens" />
                    <label className="form-check-label" for="allergens">Contains Allergens</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}