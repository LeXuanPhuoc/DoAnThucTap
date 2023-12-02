import React,{useContext} from 'react'
import AuctionCard from '../components/UI/AuctionCard';

import {useFirestore} from'../hooks/useFirestore'
import { AuthContext } from '../context/AuthContext.js';
import { Container, Row, Col, Button } from 'reactstrap';



const MyAuction = () => {
    const { docs } = useFirestore('auctions');
  const { currentUser} = useContext(AuthContext);
  return (
    <Container >
            <Row>
                <Col lg="12  mb-4  flex justify-center bg-[url('/src/assets/images/auction.png')] p-5 item-center">
               <span className='text-[#b41712] text-[30px]'>
                 <i class="ri-pulse-line text-black"></i></span> 
                <h2 className='font-[700] text-white text-[50px]'>My Auction</h2>
                <span className='text-[#b41712] text-[30px]'>
                  <i class="ri-pulse-line text-black "></i></span>
                 
      </Col> 
       <Col lg="12 mt-5 mb-4 ml-[37px] flex justify-center">
       {docs.map((doc) => {
        if (currentUser.email== doc.email) {
          return <AuctionCard item={doc} key={doc.id} />;
        }
        return null; // Không hiển thị phần tử nếu currentUser = email
      })}
                 
      </Col>
    
    
   
   </Row> 
        </Container>
 )
}

export default MyAuction