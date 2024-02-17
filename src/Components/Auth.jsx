import React, { useState } from "react";
import "../style/style.css";
import { Modal, Button } from "react-bootstrap";
import { loginUser } from "../features/user/userSlice";
import { registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const Auth = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const dispatch = useDispatch();
  const { userData, registerMsg, isLogin, isRegister } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const login = () => {
    dispatch(loginUser(user));
    console.log(userData);
    if (isLogin === "failed") {
      setShow1(true);
    }
  };

  const register = () => {
    dispatch(registerUser(newUser));
    console.log(registerMsg);
    if (isRegister === "failed") {
      setShow2(true);
    }
  };

  return (
    <div>
      {/* header butns  */}
      <button className="login btn border-0" onClick={handleShow1}>
        Login
      </button>
      <button className="createA btn rounded-1" onClick={handleShow2}>
        Create an account
      </button>

      {/* login modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={user.email} placeholder="Enter email" onChange={handleLogin} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={user.password} placeholder="Password" onChange={handleLogin} />
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="light" onClick={handleClose1}>
                Don't have Account? <span className="font-weight-bold">Sign Up</span>
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p className="text-danger">{isLogin === "succeeded" ? userData.message : isLogin === "failed" ? "Login Failed" : ""}</p>
        </Modal.Footer>
      </Modal>

      {/* register modal  */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={register}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="name" value={newUser.name} onChange={handleRegister} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={newUser.email} onChange={handleRegister} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={newUser.password} onChange={handleRegister} />
              <Form.Text className="text-muted">create your Password.</Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="light" onClick={handleClose2}>
                Allready have account? <span className="font-weight-bold">Login</span>
              </Button>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p className={isRegister === "succeeded" ? "text-success" : "text-danger"}>{isRegister === "succeeded" ? registerMsg.message : isRegister === "failed" ? "Registration Failed" : ""}</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Auth;
