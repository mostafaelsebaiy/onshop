import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import products from './routes/productRoutes.js';
import users from './routes/userRoutes.js';
import orders from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(cors());

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`running server om ${PORT}`.yellow.bold));
