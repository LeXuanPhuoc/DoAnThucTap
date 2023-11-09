

// import { useEffect, useState,useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { firestoreApp } from '../config/firebase.js';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col } from 'reactstrap';
// import { Alert } from 'react-bootstrap';

// import { AuthContext } from '../context/AuthContext.js';
// const AuctionDetail = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [bidders, setBidders] = useState([]);
      
//       const { currentUser, bidAuction, endAuction,globalMsg } = useContext(AuthContext);
//   const navigate = useNavigate(); 
//    useEffect(() => {
//     const fetchAuction = async () => {
//       try {
//         const auctionRef = firestoreApp.collection('auctions').doc(id);
//         const doc = await auctionRef.get();
//         if (doc.exists) {
//           setItem(doc.data());
//         } else {
//           console.log('Không tìm thấy đấu giá');
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu đấu giá:', error);
//       }
     
//     };

//     fetchAuction();

//   }, [id,item]);
//   const handleEndAuction = () => {
//     const confirm = window.confirm('Bạn có chắc chắn muốn Hủy đấu giá?');
//     if (confirm) {
//       confirmEndAuction();
//     }
//   };
//   const confirmEndAuction = () => {
//     // Thực hiện các hành động khi kết thúc đấu giá
//     endAuction(id);
//     // Chuyển về trang chủ
//     navigate('/home');
//   };
  

//   if (!item) {
//     return <p>Loading...</p>;
//   }
 
//  console.log(id);
//   return (
//     <section>
//       {globalMsg && <Alert className='rounded shadow-md bg-white text-[#b41712] text-[20px] font-semibold border-0	text-center '>{globalMsg}</Alert>}
//       <Container className='px-10'>
//         <Row className=" text-center flex items-center h-[150px] bg-no-repeat bg-cover bg-[url('/src/assets/images/auction.png')]">
//           <h2 className="text-[#fff] text-center text-[35px] font-semibold">Chi tiết phiên đấu giá</h2>
//           <h4 className="text-[#fff] text-center text-[25px] font-semibold ">Sản phẩm: {item.title}</h4>
//         </Row>
//         <Row className='pt-3 pb-3'>
//           <Col lg="12">
//             <div>
//               <Link to='/home'><span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>tài sản đấu giá - {item.title}</span>
//             </div>
//             <hr />
//           </Col>
//         </Row>
//         <Row>
//           <Col lg="5" className='flex justify-center'>
//             <div className='max-w-[460px] max-h-[460px]  '>
//               <img src={item.itemImage} alt={item.title} className='rounded-md' />
//             </div>
//           </Col>
//           <Col lg="7">
//             {!currentUser ? (
//               <button
//                 onClick={() => bidAuction()}
//                 className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
//               >
//                 Đấu giá
//               </button>
//             ) :               
//             currentUser.email === item.email ? (
//               <button
//                 onClick={() => handleEndAuction(id)}
//                 className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
             
//               >
//                 Kết thúc đấu giá
//               </button>
//             ) : currentUser.email === item.curWinner ? (
//               // Nếu người dùng hiện tại là người giữ giá cao nhất, hiển thị thông báo "Người thắng"
//               <p  className="display-6 text-[18px] text-[#b41712] font-bold  flex gap-1 items-center">Your bid top  <div class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
//               aspect-square w-8 flex justify-center items-center text-yellow-700">$</div></p>
//             ) : (
//               // Ngược lại, hiển thị nút "Đấu giá"
//               <button
//                 onClick={() =>
//                   bidAuction(id,item.curPrice)
//                 }
//                 className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
//               >
//                 Đấu giá
//               </button>
//               )
//               }
//               <span className=" text-[18px] font-[700] mt-4 text-[#a42222] ml-2">
//             {/* giá khởi điểm: { item.price}vnđ */}giá hiện tại: ${item.curPrice}
//           </span>
//           <div className='flex '>
//           <div class=" property-info bg-white  p-3 rounded mb-4 shadow-sm ">
//  <h2 class="text-2xl font-bold mb-4">Thông tin tài sản</h2>
//  {/* <p><span class="label font-bold">Mã tài sản:</span> MTS-PLVPSQ</p> */}
//  {/* <p><span class="label font-bold">Thời gian mở đăng ký:</span> 06/10/2023 08:00:00</p>
//  <p><span class="label font-bold">Thời gian kết thúc đăng ký:</span> 16/10/2023 17:00:00</p> */}
//  <p><span class="label font-bold">Giá khởi điểm:</span> {item.startPrice}$ </p>
//  {/* <p><span class="label font-bold">Phí đăng ký tham gia đấu giá:</span> 500.000 VNĐ</p> */}
//  <p><span class="label font-bold">Bước giá:</span> 10%</p>
//  <p><span class="label font-bold">Số bước giá tối đa/ lần trả:</span> Bước giá không giới hạn</p>
//  <p><span class="label font-bold">Tiền đặt trước:</span> 198.000.000 $</p>
//   <p><span class="label font-bold">Phương thức đấu giá:</span> Trả giá lên và liên tục</p>
//   <p><span class="label font-bold">Thời gian bắt đầu trả giá:</span> 19/10/2023 09:00:00</p>
//   <p><span class="label font-bold">Mô tả sản phẩm:</span> {item.desc}</p>
//  </div>
//  </div>
//  <div>
  
    

// </div>
 
//   </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };
// export default AuctionDetail;









import { useEffect, useState,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestoreApp } from '../config/firebase.js';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Alert } from 'react-bootstrap';

import { AuthContext } from '../context/AuthContext.js';
import AuctionHistory from '../components/UI/AuctionHistory.jsx';
const AuctionDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
    
      const { currentUser, bidAuction, endAuction,globalMsg } = useContext(AuthContext);
  const navigate = useNavigate(); 
   useEffect(() => {
    const fetchAuction = async () => {
      try {
        const auctionRef = firestoreApp.collection('auctions').doc(id);
        const doc = await auctionRef.get();
        if (doc.exists) {
          setItem(doc.data());
        } else {
          console.log('Không tìm thấy đấu giá');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đấu giá:', error);
      }
    };
    
    fetchAuction();
    

  }, [id,item]);
  const handleEndAuction = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn Hủy đấu giá?');
    if (confirm) {
      confirmEndAuction();
    }
  };
  const confirmEndAuction = () => {
    // Thực hiện các hành động khi kết thúc đấu giá
    endAuction(id);
    // Chuyển về trang chủ
    navigate('/home');
  };

  if (!item) {
    return <p>Loading...</p>;
  }
 
  return (
    <section>
      {globalMsg && <Alert className='rounded shadow-md bg-white text-[#b41712] text-[20px] font-semibold border-0	text-center '>{globalMsg}</Alert>}
      <Container className='px-10'>
        <Row className=" text-center flex items-center h-[150px] bg-no-repeat bg-cover bg-[url('/src/assets/images/auction.png')]">
          <h2 className="text-[#fff] text-center text-[35px] font-semibold">Chi tiết phiên đấu giá</h2>
          <h4 className="text-[#fff] text-center text-[25px] font-semibold ">Sản phẩm: {item.title}</h4>
        </Row>
        <Row className='pt-3 pb-3'>
          <Col lg="12">
            <div>
              <Link to='/home'><span className='hover:text-[#b41712]'>trang chủ</span></Link> / <span className='text-[#b41712] cursor-pointer'>tài sản đấu giá - {item.title}</span>
            </div>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col lg="5" className='flex justify-center'>
            <div className='max-w-[460px] max-h-[460px]  '>
              <img src={item.itemImage} alt={item.title} className='rounded-md' />
            </div>
          </Col>
          <Col lg="7">
            {!currentUser ? (
              <button
                onClick={() => bidAuction()}
                className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
              >
                Đấu giá
              </button>
            ) :               
            currentUser.email === item.email ? (
              <button
                onClick={() => handleEndAuction(id)}
                className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
             
              >
                Kết thúc đấu giá
              </button>
            ) : currentUser.email === item.curWinner ? (
              // Nếu người dùng hiện tại là người giữ giá cao nhất, hiển thị thông báo "Người thắng"
              <p  className="display-6 text-[18px] text-[#b41712] font-bold  flex gap-1 items-center">Your bid top  <div class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
              aspect-square w-8 flex justify-center items-center text-yellow-700">$</div></p>
            ) : (
              // Ngược lại, hiển thị nút "Đấu giá"
              <button 
                onClick={() =>
                bidAuction(id,item.curPrice)
                }
                className=" bg-blue-200 hover:bg-[#b41712] text-[#333] font-bold  px-3 h-10 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce "
              >
                Đấu giá
              </button>
              )
              }
              <span className=" text-[18px] font-[700] mt-4 text-[#a42222] ml-2">
            {/* giá khởi điểm: { item.price}vnđ */}giá hiện tại: ${item.curPrice}
          </span>
          <div className='flex '>
          <div class=" property-info bg-white  p-3 rounded mb-4 shadow-sm ">
 <h2 class="text-2xl font-bold mb-4">Thông tin tài sản</h2>
 {/* <p><span class="label font-bold">Mã tài sản:</span> MTS-PLVPSQ</p> */}
 {/* <p><span class="label font-bold">Thời gian mở đăng ký:</span> 06/10/2023 08:00:00</p>
 <p><span class="label font-bold">Thời gian kết thúc đăng ký:</span> 16/10/2023 17:00:00</p> */}
 <p><span class="label font-bold">Giá khởi điểm:</span> {item.startPrice}$ </p>
 {/* <p><span class="label font-bold">Phí đăng ký tham gia đấu giá:</span> 500.000 VNĐ</p> */}
 <p><span class="label font-bold">Bước giá:</span> 10%</p>
 <p><span class="label font-bold">Số bước giá tối đa/ lần trả:</span> Bước giá không giới hạn</p>
 <p><span class="label font-bold">Tiền đặt trước:</span> 198.000.000 $</p>
  <p><span class="label font-bold">Phương thức đấu giá:</span> Trả giá lên và liên tục</p>
  <p><span class="label font-bold">Thời gian bắt đầu trả giá:</span> 19/10/2023 09:00:00</p>
  <p><span class="label font-bold">Mô tả sản phẩm:</span> {item.desc}</p>
 </div>
 <AuctionHistory auctionId = {id} />
 </div> 
 
  </Col>
        </Row>
      </Container>
    </section>
  );
};
export default AuctionDetail;







































