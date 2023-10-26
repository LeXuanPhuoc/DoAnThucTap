






// import React, { useState, useEffect } from 'react';
// import Helmet from '../components/Helmet/Helmet';
// import { Container, Row, Col } from 'reactstrap';
// import products from '../assets/data/products';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Clock from '../components/UI/Clock';
// import ProductList from '../components/UI/ProductsList'

// const Auction = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);


//   useEffect(() => {
//     // Tìm sản phẩm theo id và cập nhật state
//     const foundProduct = products.find(item => item.id === id);
//     setProduct(foundProduct);

//     //sự kiện trang sẽ cuộn đầu trang khi product thay đổi.
//     window.scrollTo(0, 0);

   
//   }, [id]);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   const { imgUrl, productName, catrgory } = product;
//   const relateProduct = products.filter((item)=> item.catrgory===catrgory);
  
//   return (
//     <Helmet title={productName}>
//       <section>
//         <Container className='px-10'>
//         <Row className=" flex items-center h-[150px] bg-no-repeat bg-cover	   bg-[url('/src/assets/images/auction.png')]">
//       <h2 className='text-[#fff] text-center text-[45px] font-semibold' >Sàn đấu giá sản phẩm</h2>
//       </Row>
//           <Row className='pt-3 pb-3'>
//             <Col lg="12">
//               <div>
//                 <Link to='/home'><span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>tài sản đấu giá</span>
//               </div>
//               <hr />
//             </Col>
//           </Row>
//           <Row>
//             <Col lg="5">
//               <img src={imgUrl} alt={productName} className='rounded-md' />
//               <h2 className='pt-3 pb-3 font-semibold'>{productName}</h2>
//             </Col>
//             <Col lg="7">
//               <div className='p-2 '>
//                 <div className='p-4 shadow-lg rounded'>
//                   <Clock productId={id} />
//                 </div>
//               </div>

             
//             </Col>
//             <h3 className='font-semibold p-3 text-[20px]'> Các Phiên đấu giá khác:</h3>
//             <ProductList data={relateProduct}/>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default Auction;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import products from '../assets/data/products';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Auction = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(item => item.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { imgUrl, productName } = product;

  const startTime = product.startTime;

  // Thời gian diễn ra của phiên đấu giá (giả sử là ngày 1/11/2023, 10:00 AM)
  const auctionTime = new Date(startTime);

  // Thời gian hiện tại
  const currentTime = new Date();

  // Kiểm tra xem thời gian hiện tại đã vượt qua thời gian diễn ra của phiên đấu giá hay chưa
  const hasAuctionStarted = currentTime >= auctionTime;

  return (
    <Container>
      <Row className="flex items-center h-[150px] bg-no-repeat bg-cover bg-[url('/src/assets/images/auction.png')]">
        <h2 className='text-[#fff] text-center text-[45px] font-semibold' >Sàn đấu giá sản phẩm</h2>
      </Row>
      <Row className='pt-3 pb-3'>
        <Col lg="12">
          <div>
            <Link to='/home'><span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>tài sản đấu giá</span>
          </div>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <img src={imgUrl} alt={productName} className='rounded-md' />
          <h2 className='pt-3 pb-3 font-semibold'>{productName}</h2>
        </Col>
        <Col lg="7">
          {hasAuctionStarted ? (
            // Hiển thị nội dung khi phiên đấu giá đã bắt đầu
            <div className='p-2'>
              <div className='p-4 shadow-lg rounded'>
                {/* Thêm các thành phần liên quan đến phiên đấu giá đã bắt đầu */}
              </div>
            </div>
          ) : (
            // Hiển thị thông báo khi phiên đấu giá chưa diễn ra
            <div className='p-2'>
              <div className='p-4 shadow-lg rounded'>
                <h3>Phiên đấu giá chưa diễn ra</h3>
                <p>Phiên đấu giá này sẽ diễn ra vào ngày 1/11/2023, 10:00 AM.</p>
              </div>
            </div>
          )}
        </Col>
      </Row>
      {!hasAuctionStarted && (
        // Xử lý khi phiên đấu giá chưa diễn ra
        <div className='p-2'>
          <div className='p-4 shadow-lg rounded'>
            {/* Thêm các thành phần xử lý khi phiên đấu giá chưa diễn ra */}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Auction;