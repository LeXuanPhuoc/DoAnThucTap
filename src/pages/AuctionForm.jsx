import React, { useState } from 'react';

const AuctionForm = () => {
  const [auctionTitle, setAuctionTitle] = useState(''); 
  const [auctionProduct, setAuctionProduct] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Thực hiện xử lý dữ liệu nhập vào ở đây, ví dụ: gửi yêu cầu tạo phiên đấu giá đến server

    // Reset các trường sau khi gửi thành công
    setAuctionTitle('');
    setAuctionStartTime('');
    setAuctionEndTime('');
    setStartingPrice('');
    setExpectedPrice('');
    setAuctionProduct('');

  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="auctionTitle">Tiêu đề phiên đấu giá:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="text"
          id="auctionTitle"
          value={auctionTitle}
          onChange={(e) => setAuctionTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="auctionProduct">Sản phẩm đấu giá:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="text"
          id="auctionProduct"
          value={auctionProduct}
          onChange={(e) => setAuctionProduct(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="auctionImage">Ảnh Sản phẩm:</label>
        <img
          className="border border-gray-300 rounded-md mb-2"
          src="path_to_image.jpg"
          alt="Product Image"
        />
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="file"
          id="auctionImage"
          accept="image/*"
          // onChange handler để xử lý tải lên ảnh
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="auctionStartTime">Thời gian bắt đầu:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="datetime-local"
          id="auctionStartTime"
          value={auctionStartTime}
          onChange={(e) => setAuctionStartTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="auctionEndTime">Thời gian kết thúc:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="datetime-local"
          id="auctionEndTime"
          value={auctionEndTime}
          onChange={(e) => setAuctionEndTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="startingPrice">Giá khởi điểm:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="number"
          id="startingPrice"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-bold mb-2" htmlFor="expectedPrice">Giá mong đợi:</label>
        <input
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
          type="number"
          id="expectedPrice"
          value={expectedPrice}
          onChange={(e) => setExpectedPrice(e.target.value)}
          required
        />
        </div>
      

      <button className="bg-[#b41712] hover:bg-[#d85952] text-white font-bold py-2 px-4 rounded" type="submit">Tạo phiên đấu giá</button>
    </form>
  );
};

export default AuctionForm;