import { useEffect, useState } from 'react';
import { firestoreApp } from '../../config/firebase.js';
import moment from 'moment';
const AuctionHistory = ({ auctionId }) => {
  const [auctionHistory, setAuctionHistory] = useState([]);

  useEffect(() => {
    const fetchAuctionHistory = async () => {
      try {
        const auctionHistoryRef = firestoreApp.collection('auctions')
          .doc(auctionId)
          .collection('auctionHistory');

        const snapshot = await auctionHistoryRef.get();
        const historyData = snapshot.docs.map(doc => doc.data());
        setAuctionHistory(historyData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchAuctionHistory();
  }, [auctionId,auctionHistory]);
  return (
    <div className=" ">
      <h2 class="text-2xl font-bold mb-4">lịch sử bước nhảy giá: </h2>
      <div className="border border-gray-300 rounded-md w-[500px]">
        <div className="flex bg-gray-200 text-gray-800 font-semibold p-2">
          <div className="w-1/3">Mức giá</div>
          <div className="w-1/3">Tên</div>
          <div className="w-1/3">Thời gian</div>
        </div>
        <ul className='h-[300px] overflow-y-auto'>
          {auctionHistory.map((history, index) => (
            <li key={index} className="flex p-2 border-b border-gray-300">
              <div className="w-1/3">$ {history.bidPrice}</div>
              <div className="w-1/3">{history.bidder}</div>
              <div className="w-1/3">{moment(history.timestamp.toDate()).format('DD/MM/YYYY HH:mm:ss')}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuctionHistory;