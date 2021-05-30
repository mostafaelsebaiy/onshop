import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingToCart } from '../actions/cartActions';
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');
  const [country, setCountry] = useState(shippingInfo.country || '');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingToCart({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>shipping</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
