import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'a@example.com',
    password: bcrypt.hashSync('000000', 10),
    isAdmin: true,
  },
  {
    name: 'b',
    email: 'b@example.com',
    password: bcrypt.hashSync('000000', 10),
  },
  {
    name: 'c',
    email: 'c@example.com',
    password: bcrypt.hashSync('000000', 10),
  },
];

export default users;
