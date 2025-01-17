import express from "express";
import { authenticate } from "../authenticate.js";
import { User, Account } from '../schema.js';
import mongoose from "mongoose";


export const accountRouter = express.Router();

accountRouter.get('/details', authenticate, async (req, res) => {
    const email = req.user.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userAccountInfo = await Account.findOne({ userId: user._id });
        return res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            balance: userAccountInfo.balance,
        });
    } catch (e) {
        console.error('Error fetching account details:', e);
        res.status(500).json({ error: "Internal server error" });
    }
});

accountRouter.post("/transfer", authenticate, async (req, res) => {
    const user = req.user;
    console.log(user);
    const email = user.email
    const { to, amount } = req.body;
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        const user = await User.findOne({ email: email.trim() }).session(session);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const userId = user._id;
        const userAccountInfo = await Account.findOne({ userId }).session(session);
        if (!userAccountInfo) {
            return res.status(400).json({ message: "User account not found" });
        }
        
        let myBalance = userAccountInfo.balance;
        
        const receiver = await User.findOne({ email: to }).session(session);
        if (!receiver) return res.status(400).json({ message: "Invalid Account" });
        
        const receiverId = receiver._id;
        const receiverAcc = await Account.findOne({ userId: receiverId }).session(session);
        if (!receiverAcc) return res.status(400).json({ message: "Receiver's account not found" });

        if (myBalance < amount) return res.status(400).json({ message: "Insufficient Balance" });
        userAccountInfo.balance -= amount;
        receiverAcc.balance += amount;
        await userAccountInfo.save({ session });
        await receiverAcc.save({ session });
        
        await session.commitTransaction();
        
        return res.status(200).json({
            message: "Transfer successful",
            yourBalance: userAccountInfo.balance, 
        });
    } catch (e) {
        console.log(e);
        await session.abortTransaction();  // Rollback the transaction if there's an error
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        session.endSession();
    }
});

