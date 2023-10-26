import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [currentDateTime, setCurrentDateTime] = useState('');

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
  <NavLink
    to="/auctionform"
    className="hover:text-[#b41712] font-medium text-[#333]"
    activeClassName="text-[#b41712]"
  >
    Tạo phiên đấu giá
  </NavLink>
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
        <div className="flex gap-6 items-center  ">
          {/* Hiển thị thời gian và ngày tháng */}
  <span className="text-[#333] font-medium w-[190px] ">{currentDateTime}</span>
          <span className="flex items-center justify-center text-[#b41712] text-[30px] cursor-pointer hover:text-[#ff9264]">
            <i className="ri-search-eye-line"></i>
          </span>
        <Link to={"/login"}> <button className="w-[150px] bg-[#b41712] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#b41712] before:to-[#ff9264] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            Đăng nhập
          </button></Link> 
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;