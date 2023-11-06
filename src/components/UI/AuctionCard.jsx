
import React, { useState, useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import Countdown from 'react-countdown';
import { Col } from "reactstrap";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
  


// Hàm renderer cho component Countdown
const renderer = ({ completed, props }) => {
  if (completed) {
    // Nếu countdown đã kết thúc, không hiển thị gì
    return null;
  }
  console.log();
  return (
   
<Col lg="3" md="4">
      <div className="p-4 bg-[#fff] rounded-tr-[30px] rounded-bl-[30px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] m-1">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={props.item.itemImage
          } 
          alt={props.item.title}
          className="aspect-[264/180] w-full rounded-tr-[30px] rounded-bl-[30px]"
        />
        <p className="text-[10px] text-[#5d5858] mt-4 ml-2">{props.item.title}</p>
        <div className='p-2'>
          <h3 className="mt-2 font-bold text-black">{props.item.desc}</h3>
          <span className="mt-2 text-sm text-black">Thời gian: </span>
        </div>
        < div className="">
          <span className="text-[14px] font-[700] mt-4 text-[#333] ml-2">
            {/* giá khởi điểm: { item.price}vnđ */}giá khởi điểm: ${props.item.startPrice}
          </span>
          
          <div className='flex gap-3 items-center justify-center'>
          <Link to={`/shop/${props.item.id}`}>
            <button className="w-[100px] bg-[#b41712] h-[35px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#333] before:to-[#665751] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Xem chi tiết
            </button>
          </Link>
              {!props.owner ? (
                // Nếu không có chủ sở hữu, hiển thị nút "Đấu giá"
                <button
                  onClick={() => props.bidAuction()}
                  className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "

                >
                  Đấu giá
                </button>
              ) : props.owner.email === props.item.email ? (
                // Nếu người dùng hiện tại là chủ sở hữu, hiển thị nút "Hủy đấu giá"
                <button
                  onClick={() => props.endAuction(props.item.id)}
                  className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
                >
                  Hủy đấu giá
                </button>
              ) : props.owner.email === props.item.curWinner ? (
                // Nếu người dùng hiện tại là người giữ giá cao nhất, hiển thị thông báo "Người thắng"
                <p className="display-6 text-[25px] mt-2">Your bid:</p>
              ) : (
                // Ngược lại, hiển thị nút "Đấu giá"
                <button
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.startPrice)
                  }
                  className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
                >
                  Đấu giá
                </button>
              )}
            </div>
            <div className='text-center'>
            <span className=" text-[18px] font-[700] mt-4 text-[#a42222] ml-2">
            {/* giá khởi điểm: { item.price}vnđ */}giá hiện tại: ${props.item.curPrice}
          </span>
          </div>




        </div>
      </div>
    </Col>

    
  );
};

export const AuctionCard = ({ item }) => {
  // Lấy các giá trị và hàm cần thiết từ AuthContext
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  // Render component Countdown và truyền các props cần thiết
  return (
    <Countdown
      owner={currentUser}
      date={expiredDate} // Cần định nghĩa expiredDate trước khi sử dụng
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};

export default AuctionCard;



