import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestoreApp } from '../config/firebase.js';

export const AuctionForm = ({ setAuction ,onCreateSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();

  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

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

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Vui lòng sử dụng hình ảnh hợp lệ');
    }

    try {
      
      

      let currentDate = new Date();
      let dueDate = currentDate.setHours(
        currentDate.getHours() + itemDuration.current.value
      );

      let newAuction = {
        email: currentUser.email,
        title: itemTitle.current.value,
        desc: itemDesc.current.value,
        startPrice: startPrice.current.value,
        duration: dueDate,
      };
      closeForm();

      const imageFile = itemImage.current.files[0];
      const imageURL = await convertToURL(imageFile);

      
      newAuction.itemImage = imageURL;

      
      const auctionRef = doc(collection(firestoreApp, 'auctions'), );
      await setDoc(auctionRef, newAuction);
      setAuction(newAuction);
      closeForm();
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Error adding document to Firestore');
    }
  };


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
                  <Form.Control type="text" required ref={itemTitle} placeholder='
                  ' />
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
            <Button className='bg-gray-500 hover:bg-red-500 border-0'  onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" className='bg-blue-500' type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default AuctionForm;