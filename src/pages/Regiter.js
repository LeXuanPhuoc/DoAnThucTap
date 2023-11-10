import { Button, Form, Modal, Alert } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext} from'./../context/AuthContext.js'

export const Register = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();

  const { register } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordRef.current.value !== cmfPasswordRef.current.value) {
      return setError('Passwords does not match');
    }

    try {
      await register(emailRef.current.value, passwordRef.current.value);
      closeForm();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <span onClick={openForm} className="hover:text-blue-500 cursor-pointer	">
        Tạo tài khoản mới.
      </span>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
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
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={cmfPasswordRef} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className='bg-gray-500 hover:bg-red-500 border-0'  onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" className='bg-blue-500' type="submit">
              Register
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default Register;
