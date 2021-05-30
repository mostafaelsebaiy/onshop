import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { RegisteUser } from '../actions/userActions';

const RegisterScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(RegisteUser(name, password, email));
    }
  };
  return (
    <FormContainer>
      <h1>signin</h1>
      {message && <Message variant='danger'>{message};</Message>}
      {error && <Message variant='danger'>{error};</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmit} style={{ margin: 'auto' }}>
        <Form.Group controlId='Name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='UserName'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='Email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='Password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='ConfirmPassword'>
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            placeholder='ConfirmPassword'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
