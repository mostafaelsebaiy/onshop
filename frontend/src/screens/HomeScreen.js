import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getListProduct } from '../actions/productActions';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumbe = match.params.pageNumbe;

  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products, page, pages } = productlist;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct(keyword, pageNumbe));
  }, [dispatch, keyword, pageNumbe]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <Paginate pages={pages} page={page} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
