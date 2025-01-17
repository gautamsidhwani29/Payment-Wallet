import express from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { signupSchema, loginSchema } from '../validationSchema.js';
import { User, Account } from '../schema.js';
import { authenticate } from '../authenticate.js';
import mongoose, { mongo } from 'mongoose';

const SECRET_KEY = process.env.SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';  
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
   try {
      const { success, error, data } = signupSchema.safeParse(req.body);
      if (!success) {
         return res.status(400).json({ message: error.errors.map(err => err.message) });
      }

      const { firstName, lastName, email, password } = data;

      const userExists = await User.findOne({ where: { email: email.trim() } });
      if (userExists) return res.status(409).json({ message: "User Already Exists" });

      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({ firstName, lastName, email, password: hashedPass });
      const userId = newUser._id;

      await Account.create({ userId, balance: 1 + Math.random() * 1000 });

      const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         maxAge: 3600000 // 1 hour 
      });

      return res.status(201).json({ message: 'User created successfully', token });
   } catch (e) {
      console.error('Signup Error:', e);
      res.status(500).json({ error: "Signup Failed, Either User Exists or Server Error" });
   }
});

userRouter.post("/signin", async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.trim() });
      if (!user) return res.status(404).json({ error: "User Not Found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: "Invalid Password" });

      const sessionToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
      res.cookie("token", sessionToken, { httpOnly: true, secure:false});
      res.status(200).json({ message: "Login Successful" });
   } catch (e) {
      console.error('Signin Error:', e);
      res.status(500).json({ error: "Login Failed" });
   }
});

userRouter.post('/signout', (req, res) => {
   try {
      res.clearCookie('token', { httpOnly: true, secure: false });

      return res.status(200).json({ message: 'Logged out successfully!' });
   } catch (e) {
      console.error('Signout Error:', e);
      return res.status(500).json({ error: 'An error occurred during sign out' });
   }
});

userRouter.get('/users', authenticate, async (req, res) => {
   try {
     const currentUser = req.user;
     
     if (!currentUser) {
       return res.status(401).json({ message: 'User Not Authenticated' });
     }
     const currentUserDetails = await User.findOne({email : currentUser.email});
     const users = await User.find({_id : {$ne: new mongoose.Types.ObjectId(currentUserDetails._id)}});
 
     res.status(200).json({
       message: 'Users retrieved successfully',
       users: users,
     });
   } catch (e) {
     console.error('Error fetching users:', e);
     res.status(500).json({
       error: 'An error occurred while fetching users',
     });
   }
 });
 
export default userRouter;
