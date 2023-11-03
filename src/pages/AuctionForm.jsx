// import React, { useState } from 'react';

// const AuctionForm = () => {
//   const [auctionTitle, setAuctionTitle] = useState(''); 
//   const [auctionProduct, setAuctionProduct] = useState('');
//   const [auctionStartTime, setAuctionStartTime] = useState('');
//   const [auctionEndTime, setAuctionEndTime] = useState('');
//   const [startingPrice, setStartingPrice] = useState('');
//   const [expectedPrice, setExpectedPrice] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Thực hiện xử lý dữ liệu nhập vào ở đây, ví dụ: gửi yêu cầu tạo phiên đấu giá đến server

//     // Reset các trường sau khi gửi thành công
//     setAuctionTitle('');
//     setAuctionStartTime('');
//     setAuctionEndTime('');
//     setStartingPrice('');
//     setExpectedPrice('');
//     setAuctionProduct('');

//   };

//   return (
//     <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="auctionTitle">Tiêu đề phiên đấu giá:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="text"
//           id="auctionTitle"
//           value={auctionTitle}
//           onChange={(e) => setAuctionTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="auctionProduct">Sản phẩm đấu giá:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="text"
//           id="auctionProduct"
//           value={auctionProduct}
//           onChange={(e) => setAuctionProduct(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="auctionImage">Ảnh Sản phẩm:</label>
//         <img
//           className="border border-gray-300 rounded-md mb-2"
//           src="path_to_image.jpg"
//           alt="Product Image"
//         />
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="file"
//           id="auctionImage"
//           accept="image/*"
//           // onChange handler để xử lý tải lên ảnh
//         />
//       </div>
//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="auctionStartTime">Thời gian bắt đầu:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="datetime-local"
//           id="auctionStartTime"
//           value={auctionStartTime}
//           onChange={(e) => setAuctionStartTime(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="auctionEndTime">Thời gian kết thúc:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="datetime-local"
//           id="auctionEndTime"
//           value={auctionEndTime}
//           onChange={(e) => setAuctionEndTime(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="startingPrice">Giá khởi điểm:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="number"
//           id="startingPrice"
//           value={startingPrice}
//           onChange={(e) => setStartingPrice(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="font-bold mb-2" htmlFor="expectedPrice">Giá mong đợi:</label>
//         <input
//           className="border border-gray-300 rounded-md py-2 px-3 w-full"
//           type="number"
//           id="expectedPrice"
//           value={expectedPrice}
//           onChange={(e) => setExpectedPrice(e.target.value)}
//           required
//         />
//         </div>
      

//       <button className="bg-[#b41712] hover:bg-[#d85952] text-white font-bold py-2 px-4 rounded" type="submit">Tạo phiên đấu giá</button>
//     </form>
//   );
// };

// export default AuctionForm;



import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { firestoreApp } from '../config/firebase.js';

export const AuctionForm = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false); // State để kiểm soát hiển thị form
  const [error, setError] = useState(''); // State để hiển thị thông báo lỗi

  const itemTitle = useRef(); // Biến tham chiếu cho trường nhập liệu "Item Title"
  const itemDesc = useRef(); // Biến tham chiếu cho trường nhập liệu "Item Description"
  const startPrice = useRef(); // Biến tham chiếu cho trường nhập liệu "Start Price"
  const itemDuration = useRef(); // Biến tham chiếu cho trường nhập liệu "Item Duration"
  const itemImage = useRef(); // Biến tham chiếu cho trường nhập liệu "Item Image"

  const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng hiện tại từ context

  const openForm = () => setShowForm(true); // Hàm để mở form
  const closeForm = () => setShowForm(false); // Hàm để đóng form

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Mảng chứa các kiểu dữ liệu hợp lệ cho hình ảnh

  const convertToURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra kiểu dữ liệu của hình ảnh
    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Please use a valid image');
    }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + itemDuration.current.value
    );

    // Tạo đối tượng mới để đại diện cho phiên đấu giá
    let newAuction = {
      email: currentUser.email, // Email của người đăng phiên đấu giá
      title: itemTitle.current.value, // Tiêu đề của phiên đấu giá
      desc: itemDesc.current.value, // Mô tả của phiên đấu giá
      curPrice: startPrice.current.value, // Giá khởi điểm của phiên đấu giá
      duration: dueDate, // Thời gian kết thúc của phiên đấu giá
    };
    closeForm();
   
    try {
      // Convert the image file to base64 string
      const imageFile = itemImage.current.files[0];
      const imageURL = await convertToURL(imageFile);

      // Add the base64 image to the new auction object
      newAuction.itemImage = imageURL;
      
      // Upload the new auction data to Firestore
      const docRef = await addDoc(collection(firestoreApp, 'auctions'), newAuction);
      console.log('Document written with ID: ', docRef.id);
      setAuction(newAuction); // Gọi callback function để thực hiện hành động tiếp theo với đối tượng đấu giá
      closeForm();
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Error adding document to Firestore');
    }
  };


  // Function to convert a File object to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    
  };

  // ...

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <span onClick={openForm} className="">
          Tạo phiên đấu giá
        </span>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Duration in hours</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentUser.email}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
  <Form.Group>
    <Form.Label>Item Image</Form.Label>
    <Form.Control
      type="file"
      label="Select Item Image"
      custom
      required
      ref={itemImage}
    />
  </Form.Group>
  {itemImage.current && itemImage.current.files[0] && (
    <img
      className="border border-gray-300 rounded-md mb-2"
      src={URL.createObjectURL(itemImage.current.files[0])}
      alt="Product Image"
    />
  )}
</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default AuctionForm;





