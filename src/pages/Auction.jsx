// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import products from '../assets/data/products';
// import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast,ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Auction = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [remainingTime, setRemainingTime] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const foundProduct = products.find(item => item.id === id);
//     setProduct(foundProduct);

//     const startTime = new Date(foundProduct.startTime);
//     const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);
//     const currentTime = new Date();
//     const timeDiff = endTime.getTime() - currentTime.getTime();

//     const timer = setInterval(() => {
//       const updatedTime = new Date().getTime();
//       const remaining = endTime.getTime() - updatedTime;

//       if (remaining <= 0) {
//         clearInterval(timer);
//         setRemainingTime(null);
//         handleAuctionEnd();
//       } else {
//         const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
//         setRemainingTime(`${hours} Giờ : ${minutes} phút : ${seconds} giây`);
//       }
//     }, 1000);


//     ////////////////////////////////////////////////////////////////
//     const [currentPrice, setCurrentPrice] = useState(100);
//     const [bidAmount, setBidAmount] = useState(10);
//     const [step, setStep] = useState(5);
  
//     const handleBid = () => {
//       const newPrice = currentPrice + bidAmount;
//       setCurrentPrice(newPrice);
//     };

//     return () => {
//       clearInterval(timer);
//     };
//   }, [id, navigate]);

//   const handleAuctionEnd = () => {
//     // Thực hiện các hành động sau khi kết thúc phiên đấu giá
//     // Ví dụ: thông báo, lưu trữ kết quả, điều hướng người dùng
//     toast.success('Phiên đấu giá đã kết thúc');
//     navigate(`/auction-results/${id}`);
//   };

//   if (!product) {
//     return <div>Sản phẩm không tồn tại</div>;
//   }

//   const { imgUrl, productName } = product;

//   return (
//     <Container>
//        <ToastContainer />
//       <Row className="flex items-center h-[150px] bg-no-repeat bg-cover bg-[url('/src/assets/images/auction.png')]">
//         <h2 className='text-[#fff] text-center text-[45px] font-semibold'>Sàn đấu giá sản phẩm</h2>
//       </Row>
//       <Row className='pt-3 pb-3'>
//         <Col lg="12">
//           <div>
//             <Link to='/home'><span className='hover:text-[#b41712]'>Trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>Tài sản đấu giá</span>
//           </div>
//           <hr />
//         </Col>
//       </Row>
//       <Row>
//         <Col lg="5">
//           <img src={imgUrl} alt={productName} className='rounded-md' />
//           <h2 className='pt-3 pb-3 font-semibold'>{productName}</h2>
//         </Col>
//         <Col lg="7">
//           {remainingTime ? (
//             <div className=" shadow-lg p-3 rounded">
//               <h3 className='text-[#b41712] text-xl text-center font-semibold '>Thời gian còn lại: {remainingTime}</h3>
//               {/* Hiển thị các thông tin khác về phiên đấu giá */}
//             </div>
//           ) : (
//             <div>
//               <h2>Phiên đấu giá đã kết thúc</h2>
//               {/* Hiển thị thông báo kết thúc phiên đấu giá */}
//             </div>
//           )}
//         </Col>
//         <Col lg="7" className='cart-auction'>
//         <h2>Cart Đấu giá</h2>
//       <p>Giá Đang Đấu: {currentPrice}</p>
//       <p>Bước Nhảy: {step}</p>

//       <input
//         type="number"
//         value={bidAmount}
//         onChange={(e) => setBidAmount(Number(e.target.value))}
//       />

//       <button onClick={handleBid}>Bid</button>

//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Auction;






import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import products from '../assets/data/products';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [bidAmount, setBidAmount] = useState(10);
  const [step, setStep] = useState(5);

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === id);
    setProduct(foundProduct);

    const startTime = new Date(foundProduct.startTime);
    const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const currentTime = new Date();
      const remaining = endTime - currentTime;

      if (remaining <= 0) {
        clearInterval(timer);
        setRemainingTime(null);
        handleAuctionEnd();
      } else {
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setRemainingTime(`${hours} Giờ : ${minutes} phút : ${seconds} giây`);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [id, navigate]);

  const handleAuctionEnd = () => {
    toast.success('Phiên đấu giá đã kết thúc');
    navigate(`/auction-results/${id}`);
  };

  const handleBid = () => {
    const newPrice = currentPrice + bidAmount;
    setCurrentPrice(newPrice);
  };

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  const { imgUrl, productName } = product;

  return (
    <Container>
      <ToastContainer />
      <Row className="flex items-center h-[150px] bg-no-repeat bg-cover bg-[url('/src/assets/images/auction.png')]">
        <h2 className="text-[#fff] text-center text-[45px] font-semibold">Sàn đấu giá sản phẩm</h2>
      </Row>
      <Row className="pt-3 pb-3">
        <Col lg="12">
          <div>
            <Link to="/home">
              <span className="hover:text-[#b41712]">Trang chủ</span>
            </Link>{' '}
            / <span className="text-[#b41712] cursor-pointer">Tài sản đấu giá</span>
          </div>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <img src={imgUrl} alt={productName} className="rounded-md" />
          <h2 className="pt-3 pb-3 font-semibold">{productName}</h2>
        </Col>
        <Col lg="7">
          {remainingTime ? (
            <div className="shadow-lg p-3 rounded">
              <h3 className="text-[#b41712] text-xl text-center font-semibold ">
                Thời gian còn lại: {remainingTime}
              </h3>
              {/* Display other auction information */}
            </div>
          ) : (
            <div>
              <h2>Phiên đấu giá đã kết thúc</h2>
              {/* Display auction end notification */}
            </div>
          )}
           <div className="cart-auction">
      <h2>Cart Đấu giá</h2>
      <p>Giá Đang Đấu: {currentPrice}</p>
      <p>Bước Nhảy: {step}</p>

      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
      />

      <button onClick={handleBid}>Bid</button>

     </div>
        </Col>
       
      </Row>
      
    </Container>
  );
};

export default Auction;