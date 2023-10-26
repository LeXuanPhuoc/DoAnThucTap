

import React, { useState, useEffect } from 'react';
import products from '../../assets/data/products';
import { Link } from 'react-router-dom';


    const Clock = ({ productId }) => {
          const product = products.find(item => item.id === productId);
          const startTime = product.startTime;
          const targetDateTime = new Date(startTime).getTime();
          const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
        
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [isAuctionFinished, setIsAuctionFinished] = useState(false);
  const [showAuctionButton, setShowAuctionButton] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetDateTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remainingTime = targetDateTime - now;

      if (remainingTime <= 0) {
        setIsAuctionStarted(true);
        setShowAuctionButton(true);
        setIsAuctionFinished(true);
        setTimeRemaining(0);
      } else if (!isAuctionStarted) {
        setIsAuctionStarted(true);
      }

      setTimeRemaining(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [,productId]);

 
  const endTime = product.endTime;
  const formatTime = time => {
    if (time <= 0) {
      const oneDay = endTime; // Số milliseconds trong 1 ngày
      if (Math.abs(time) >= oneDay) {
        return 'Phiên đấu giá đã kết thúc !';
      } else {
        return 'Phiên đấu giá đang diễn ra !';
      }
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  return (
    <div className='clock__wrapper flex justify-center items-center w-auto'>
      {isAuctionStarted ? ( // Nếu đấu giá đã bắt đầu
        <div className='flex gap-2'>
          <p className='text-black w-[220px] flex items-center font-medium'  style={{ display: timeRemaining > 0 ? '' : 'none' }}>Thời gian bắt đầu đấu giá:</p>
          {showAuctionButton && timeRemaining <= 0 && ( // Nếu hiển thị nút "Đấu giá ngay" và thời gian còn lại <= 0 (đấu giá đã kết thúc)
           <Link to={`/auction/${productId}`}> <button style={{ display: Math.abs(timeRemaining) < endTime ? '' : 'none' }} className='cursor-pointer transition-all bg-[#b41712] text-white px-6 py-2 rounded-lg border-[#675c5b] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-[#675c5b] shadow-[#675c5b] active:shadow-none'

>
  Đấu giá ngay!
</button></Link>
          )}
          <span className='w-[300px] flex items-center pl-3 font-bold ' 
          style={{ color: timeRemaining > 0 ? 'black' : '#b41712' }}>
  {formatTime(timeRemaining)}
</span>
        </div>
      ) : (
        <p className='text-black w-[220px]'>Phiên đấu giá đã bắt đầu:</p>
      )}
    </div>
  );
};

export default Clock;

