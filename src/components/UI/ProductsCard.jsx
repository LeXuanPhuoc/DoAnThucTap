// import React from 'react'
// import productImg from '../../assets/images/car1.jpg'

// import { motion } from 'framer-motion';
// import {Link} from 'react-router-dom'
// import  {Col} from"reactstrap"

// const ProductsCard = ({item}) => {
//   return (
    
//       <Col lg="3" md="4">
          
//             <div  className="p-4 bg-[#fff] rounded-tr-[30px] rounded-bl-[30px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] m-1">
//               <motion.img whileHover={{scale:1.1}}
//                 src={item.imgUrl}
//                 alt={item.productName}
//                 className="aspect-[264/180] w-full rounded-tr-[30px] rounded-bl-[30px]   "
//               />
//               <p className="text-[10px] text-[#5d5858] mt-4 ml-2">
//                 {item.Status}
//               </p>
//               <div className='p-2'>
//               <h3 className="mt-2 font-bold text-black">
//                 {item.productName}</h3>
//               <span className="mt-2 text-sm  text-black">
//                 Thời gian: {item.time}</span>
              

//               </div>
             
// 			<div className="">
//             <span className="text-[14px] font-[600] mt-4 text-[#a42222] ml-2">
//                 giá khởi điểm: {item.price} vnđ
//               </span>
// 			<Link to={`/shop/${item.id}`} >	<button class="w-[100px] bg-[#b41712] h-[35px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#333] before:to-[#665751] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
//   Xem chi tiết
// </button></Link>
// 			</div>
//             </div>
//             </Col>
          
       
    
//   )
// }

// export default ProductsCard



import React from 'react';
import productImg from '../../assets/images/car1.jpg';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Col } from "reactstrap";

const ProductsCard = ({ item }) => {
  return (
    <Col lg="3" md="4">
      <div className="p-4 bg-[#fff] rounded-tr-[30px] rounded-bl-[30px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] m-1">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={item.imgUrl || productImg} // Sử dụng productImg nếu không có item.imgUrl
          alt={item.productName}
          className="aspect-[264/180] w-full rounded-tr-[30px] rounded-bl-[30px]"
        />
        <p className="text-[10px] text-[#5d5858] mt-4 ml-2">{item.Status}</p>
        <div className='p-2'>
          <h3 className="mt-2 font-bold text-black">{item.productName}</h3>
          <span className="mt-2 text-sm text-black">Thời gian: {item.time}</span>
        </div>
        <div className="">
          <span className="text-[14px] font-[600] mt-4 text-[#a42222] ml-2">
            giá khởi điểm: {item.price} vnđ
          </span>
          <Link to={`/shop/${item.id}`}>
            <button className="w-[100px] bg-[#b41712] h-[35px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#333] before:to-[#665751] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Xem chi tiết
            </button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default ProductsCard;