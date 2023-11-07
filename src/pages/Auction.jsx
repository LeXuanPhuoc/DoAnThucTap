import React,{useContext,useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import AuctionDetail from './AuctionDetails';
import { firestoreApp } from '../config/firebase.js';
import { useParams } from 'react-router-dom';

const Auction = () => {
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
    const { id } = useParams();
    const [item, setItem] = useState(null);
   
    
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
  
    }, [id]);
  return (
    <AuctionDetail
    currentUser={currentUser}
    bidAuction={bidAuction}
    endAuction={endAuction}/>
  )
}

export default Auction









