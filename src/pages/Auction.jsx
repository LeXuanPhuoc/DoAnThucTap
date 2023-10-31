






import React, { useState, useEffect,useRef  } from 'react';
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
  const [currentPrice, setCurrentPrice] = useState(100000);
  const [bidAmount, setBidAmount] = useState( );
  const [step, setStep] = useState(50000);
  const [bidList, setBidList] = useState([]);


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
    const newPrice = currentPrice + step;
    setCurrentPrice(newPrice);

    const newBid = {
      price: newPrice,
      bidder: 'Tên người dùng', // Thay 'Tên người dùng' bằng tên thực tế của người dùng
      time: new Date().toLocaleString(),
    };
  
    setBidList((prevBidList) => [...prevBidList, newBid]);
  
  };

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  const { imgUrl, productName,price } = product;

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
          <div>
          <h3 className=" pt-3 pb-1 font-semibold">{productName}</h3>
          <span className="">Giá khởi điểm:  {price} vnđ</span>

          </div>
          
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
          <div className=' min-h-[346px] shadow-lg p-3 rounded flex gap-5 justify-center'>
           <div className="cart-auction border-1 rounded p-5 text-center ">
      <h2>Cart Đấu giá</h2>
      <p className='text-black'>Giá Đang Đấu: {currentPrice} </p>
      <p className='text-black'>Bước Nhảy: {step}</p>

      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
      />

      <button onClick={handleBid} className='p-3 bg-gradient-to-r from-red-600 to-gray-600 hover:from-gray-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce'>
       Bid </button>

     </div>
     <div className='list-name border-1 rounded   '>
      <h2> danh sách đặt giá:</h2><hr/>

      
      <ul className=' max-h-[250px] overflow-y-auto' >
    {bidList.map((bid, index) => (
      <li key={index} className=' text-[15px]'>
        Mức giá: {bid.price} | Người đấu giá: {bid.bidder} | Thời gian: {bid.time}
      </li>
    ))}
  </ul>

     </div>
     </div>
        </Col>
       
      </Row>
      
    </Container>
  );
};

export default Auction;






