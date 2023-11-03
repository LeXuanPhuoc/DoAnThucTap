
import React, { useState, useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import Countdown from 'react-countdown';
import { Col } from "reactstrap";

// Hàm renderer cho component Countdown
const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    // Nếu countdown đã kết thúc, không hiển thị gì
    return null;
  }

  return (
    <Col lg="3" md="4">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.itemImage
            })`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />

        <div className="card-body">
          <p className="lead display-6">{props.item.title}</p>
          <div className="d-flex jsutify-content-between align-item-center">
            <h5>
              {days * 24 + hours} giờ: {minutes} phút: {seconds} giây
            </h5>
          </div>
          <p className="card-text">{props.item.desc}</p>
          <div className="d-flex justify-content-between align-item-center">
            <div>
              {!props.owner ? (
                // Nếu không có chủ sở hữu, hiển thị nút "Đấu giá"
                <div
                  onClick={() => props.bidAuction()}
                  className="btn btn-outline-secondary"
                >
                  Đấu giá
                </div>
              ) : props.owner.email === props.item.email ? (
                // Nếu người dùng hiện tại là chủ sở hữu, hiển thị nút "Hủy đấu giá"
                <div
                  onClick={() => props.endAuction(props.item.id)}
                  className="btn btn-outline-secondary"
                >
                  Hủy đấu giá
                </div>
              ) : props.owner.email === props.item.curWinner ? (
                // Nếu người dùng hiện tại là người giữ giá cao nhất, hiển thị thông báo "Người thắng"
                <p className="display-6">Người thắng</p>
              ) : (
                // Ngược lại, hiển thị nút "Đấu giá"
                <div
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.curPrice)
                  }
                  className="btn btn-outline-secondary"
                >
                  Đấu giá
                </div>
              )}
            </div>
            <p className="display-6">${props.item.curPrice}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export const AuctionCard = ({ item }) => {
  // Lấy các giá trị và hàm cần thiết từ AuthContext
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  // Render component Countdown và truyền các props cần thiết
  return (
    <Countdown
      owner={currentUser}
      date={expiredDate} // Cần định nghĩa expiredDate trước khi sử dụng
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};

export default AuctionCard;