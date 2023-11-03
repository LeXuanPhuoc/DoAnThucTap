import React, { useState,useContext, useEffect } from 'react';

import logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { NavComp } from '../../pages/Navcomp';
import AuctionForm from '../../pages/AuctionForm';

import {AuthContext} from '../../context/AuthContext';

function Header() {
  const [currentDateTime, setCurrentDateTime] = useState('');


  const [auction, setAuction] = useState(null);
  const { currentUser, globalMsg } = useContext(AuthContext);


  useEffect(() => {
    // Lấy thời gian hiện tại và định dạng ngày tháng
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between p-1">
        <div className="flex items-center justify-center">
         <Link to={"/home"}> <img
            src={logo}
            alt="logo"
            className="h-[44px] w-full min-w-[120px]"
          /></Link>
        </div>
        <div className="flex flex-row items-center gap-[35px] mx-auto">
  <NavLink
    to="/tai-san-dau-gia"
    className="hover:text-[#b41712] font-medium text-[#333]"
    activeClassName="text-[#b41712]"
  >
    Tài sản đấu giá
  </NavLink>
  <NavLink
    to="/cuoc-dau-gia"
    className="hover:text-[#b41712] font-medium text-[#333]"
    activeClassName="text-[#b41712]"
  >
    Cuộc đấu giá
  </NavLink>
  <span
    className="hover:text-[#b41712] font-medium text-[#333] cursor-pointer	"
    activeClassName="text-[#b41712]"
  >

{currentUser && <AuctionForm setAuction={setAuction} />}
  </span>
  <NavLink
    to="/gioi-thieu"
    className="hover:text-[#b41712] font-medium text-[#333]"
    activeClassName="text-[#b41712]"
  >
    Giới thiệu
  </NavLink>
  <NavLink
    to="/lien-he"
    className="hover:text-[#b41712] font-medium text-[#333]"
    activeClassName="text-[#b41712]"
  >
    Liên hệ
  </NavLink>
  
</div>
        <div className="flex  items-center  ">
          {/* Hiển thị thời gian và ngày tháng */}
  <span className="text-[#333] font-medium w-[190px] ">{currentDateTime}</span>
          <span className="flex items-center justify-center text-[#b41712] text-[30px] cursor-pointer hover:text-[#ff9264]">
            <i className="ri-search-eye-line"></i>
          </span>
             <div><NavComp/></div>
          
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;