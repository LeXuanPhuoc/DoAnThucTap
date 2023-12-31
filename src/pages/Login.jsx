import { Button, Form, Modal, Alert } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext} from'./../context/AuthContext.js'
import Register from './Regiter.js';

export const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      closeForm();
    } catch (error) {
      setError('Invalid login');
    }
  };

  return (
    <>
      <button onClick={openForm}  className="w-[150px] bg-[#b41712] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#b41712] before:to-[#ff9264] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            Đăng nhập
          </button>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <div className='p-3'>
            <Register/>
            </div>
          </Modal.Body>
          
          
          <Modal.Footer>
            <Button className='bg-gray-500 hover:bg-red-500 border-0' onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" className='bg-blue-500' type="submit">
              Login
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default Login;