import asynchandler from 'express-async-handler';
import Product from '../models/productModel.js';
// import fs from 'fs';

const getProducts = asynchandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (products) {
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error('products not found');
  }
});
const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});
const deleteProduct = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // const imagePath = product.image;
    await product.remove();
    res.json({ message: 'Product removed' });
    // fs.unlink(imagePath, (err) => {
    //   console.log(err);
    // });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asynchandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const addReview = asynchandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('user already reviewed thid product');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ msg: 'reiew added' });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const removeReview = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const matchingUser = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (!matchingUser) {
      res.status(400);
      throw new Error('not allowed');
    }

    product.reviews = product.reviews.filter(
      ({ user }) => user.toString() !== req.user._id.toString()
    );
    product.numReviews = product.reviews.length;
    if (product.reviews.length >= 1) {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    } else {
      product.rating = product.reviews.length;
    }

    await product.save();
    return res.json({ msg: 'review deleted' });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const getTopRatedProducts = asynchandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopRatedProducts,
  removeReview,
};
