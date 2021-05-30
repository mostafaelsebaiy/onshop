import asynchandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      _id: user._id,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('invalid email or password');
  }
});

const registUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  let existUser = await User.findOne({ email });
  if (existUser) {
    res.status(404);
    throw new Error('user already exist choose another one');
  }
  let user = await User.create({
    name,
    password,
    email,
  });
  if (user) {
    res.json({
      name: user.name,
      _id: user._id,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

const getUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      name: user.name,
      _id: user._id,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('no user found');
  }
});
const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUsers = asynchandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  // if (!user.isAdmin) {
  //   res.status(404);
  //   throw new Error('User not allowed');
  // }
  const users = await User.find({});

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const deleteUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  authUser,
  registUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
