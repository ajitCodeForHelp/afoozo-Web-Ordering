import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import SidebarDrawer from './Drawer';
import { FaWallet } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import DeskHeader from '../DeskTopUi/DeskCommonComponent/DeskHeader';
import useIsMobile from '../../../Utilities/IsMobile';

export default function Header({ filterVegNonVeg, handleSearch }) {
  const [showDrop, setShowDrop] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);

  // useEffect(() => {
  //   if (window.innerWidth > 768) {
  //     setIsMobile(false);
  //   } else if (window.innerWidth < 768) {
  //     setIsMobile(true);
  //   }
  // }, []);
  const isMobile = useIsMobile();

  return (
    <>
      {/* <div className="main-header shadow-sm hide-992" style={{ marginBottom: "1px" }}>
        <div className="top-bar px-3 py-1 text-white ">
          <div>
            <i className="fas fa-phone-alt me-2"></i> (+0)-000-0000-000
            <span className="ms-3">
              <i className="fas fa-envelope me-2"></i> support@websitename.com
            </span>
          </div>
          <div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-white pt-0 dis-none">
          <div className="container-fluid px-0 pt-0 pb-0">
            <div className="logo-container d-flex align-items-center text-warning them-bg-black">
              <img src={logo} alt="logo" style={{ height: '40px' }} className="me-2" />
              <h4 className="mb-0 fw-semibold">AFOOZO</h4>
            </div>

            <button className="nav-menu-btn" onClick={() => setShowDrawer(!showDrawer)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
                  <a className="nav-link" href="#">
                    Favorities
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Setting</a>
                </li>
                <li className="nav-item mx-2">
                  <span className='search-input form-control bg-light rounded-pill'>
                    <FaWallet className='text-warning' /> ₹2999.00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div> */}
      {
        !isMobile && <DeskHeader handleSearch={handleSearch}/>
      }

      {isMobile && <header className="header show-992 justify-content-between align-items-center p-3 shadow-sm bg-white">
        <button className="nav-menu-btn" onClick={() => setShowDrawer(!showDrawer)} type="button">
          <span className=""><RxHamburgerMenu /></span>
        </button>

        <h1 className="logo m-0 text-dark">AFOOZO</h1>
        <div className="wallet d-flex align-items-center rounded-pill px-3 py-1">
          <div className="wallet-icon d-flex align-items-center justify-content-center text-white fw-bold them-color bg-light rounded-pill">
            <FaWallet className='text-dark' />
          </div>
          <span className="wallet-amount ms-2">₹124.50</span>
        </div>
      </header>}

      {isMobile && <div className="container-fluid bg-white shadow-sm py-3 px-3 sticky-top">
        <div className="row gx-2 align-items-center">
          <div className="col-12 col-md flex-grow-1 position-relative w-75 d-flex align-items-center">
            <IoIosSearch className='position-absolute search-icon' />
            <input type="text" className="search-input form-control ps-5 py-2 bg-light rounded-pill" onChange={(e) => handleSearch(e.target.value)} placeholder="Search food..." />
          </div>
          <div className="col-auto mt-md-0">
            <div className="dropdown" ref={dropdownRef}>
              <button className="btn btn-danger d-flex align-items-center gap-1 rounded-pill px-3 py-2 them-bg-black text-white border-dark" onClick={() => setShowDrop(!showDrop)} type="button">
                <IoFilterSharp />
                <span className='dis-none'>Filters</span>
              </button>

              {showDrop &&
                <ul className="dropdown-menu dropdown-menu-end p-3 shadow"
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    minWidth: "200px",
                    zIndex: 2000,
                  }}
                >
                  <li>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="vegNonVeg" id="vegetarian" value="Veg" onChange={filterVegNonVeg} />
                      <label className="form-check-label" for="vegetarian">Vegetarian</label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="vegNonVeg" id="nonVegetarian" value="NonVeg" onChange={filterVegNonVeg} />
                      <label className="form-check-label" for="nonVegetarian">Non-Vegetarian</label>
                    </div>
                  </li>
                  {/* <li>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="vegNonVeg" id="allergens" />
                      <label className="form-check-label" for="allergens">Contains Allergens</label>
                    </div>
                  </li> */}
                </ul>}
            </div>
          </div>
        </div>
      </div>}
      <SidebarDrawer isOpen={showDrawer} onClose={() => setShowDrawer(!showDrawer)} />
    </>
  );
}