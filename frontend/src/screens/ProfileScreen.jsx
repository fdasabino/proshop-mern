import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../redux-actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfileScreen = ({ toast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
      setPassword("");
      setConfirmPassword("");
    }
  }, [navigate, userInfo, user, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Your passwords don't match! Try again...");
    } else {
      //Dispatch update
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      toast.success("Your profile has been updated successfully");
    }
  };
  return (
    <Row>
      <Col md={12} xl={9}>
        <h1>Order Details</h1>
      </Col>
      <Col md={12} xl={3}>
        <h1>Profile</h1>
        {loading && <LoadingSpinner />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">
            <div className="text-center">Profile Updated Successfully</div>
          </Message>
        )}

        <Accordion>
          <Accordion.Item>
            <Accordion.Header className="">Update Profile</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <hr />

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <hr />

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <hr />
                <Form.Group controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <hr />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!name || !email || !password || !confirmPassword}
                >
                  Update Profile
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
