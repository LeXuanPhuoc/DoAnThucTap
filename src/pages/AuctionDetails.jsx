import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestoreApp } from '../config/firebase.js';


const AuctionDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const auctionRef = firestoreApp.collection('auctions').doc(id);
        const doc = await auctionRef.get();
        if (doc.exists) {
          setAuction(doc.data());
        } else {
          console.log('Không tìm thấy đấu giá');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đấu giá:', error);
      }
    };

    fetchAuction();
  }, [id]);

  if (!auction) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Auction Detail Page</h1>
      <p>Auction ID: {id}</p>
      <img src={auction.itemImage} alt={auction.title} />
      {/* Hiển thị các chi tiết khác về đấu giá */}
    </div>
  );
};

export default AuctionDetail;