const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { addToBlackList } = require('../blacklist');

dotenv.config();

async function predictRisk({ income, expanses, quiz_score, goal_amount }) {
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", {
            income,
            expenses: expanses,
            quiz_score,
            goal_amount
        });
        return response.data.risk_profile;
    } catch (err) {
        console.error("Prediction API failed:", err.message);
        return null;
    }
}
const getAllUsers = async (req, res) => {
    const user = await User.find();
    if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json(user);
}

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json(user);
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const checkUsername = await User.findOne({ username });
        const checkEmail = await User.findOne({ email });
        if (checkUsername) {
            return res.status(400).json({ message: "Username already exist" });
        }
        if (checkEmail) {
            return res.status(403).json({ message: "Email already exist" });
        }
        const newUser = new User({
            username: username,
            email: email,
            password: password
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const id = newUser._id;
        res.status(201).json({ message: "User created successfully", token, id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const userId = user._id;
        res.status(200).json({ message: "Logged in successfully", id: userId, token: token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const onboardingDetail = async (req, res) => {
    try {
        const { userId } = req.params;
        const { income, expanse, goalAmount, goalDescription, quizAnswers } = req.body;
        // console.log(req.body);
        if (expanse > income) {
            return res.status(406).json({ message: "Expanse cannot be more than income" });
        }
        const quizScore = quizAnswers.reduce((sum, val) => sum + val, 0) / quizAnswers.length;
        const riskProfile = await predictRisk({ income: income, expanses: expanse, quiz_score: quizScore, goal_amount: goalAmount });

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "monthlyIncome": income,
                    "monthlyExpanse": expanse,
                    "savingsGoal.amount": goalAmount,
                    "savingsGoal.purpose": goalDescription,
                    "quizAnswers": quizAnswers,
                    "quizScore": quizScore,
                    "riskTolerance": riskProfile
                }
            },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Onboarding completed", user });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const toggleRoundup = async (req, res) => {
    const { enabled, method, customValue } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                roundUp: {
                    enabled,
                    method,
                    customValue: method === 'custom' ? customValue : 0
                }
            },
            { new: true }
        );

        res.json({ message: 'Settings updated', user: updatedUser });

    } catch (e) {
        res.status(500).json({ message: 'Error updating round-up settings' });
    }
};

const editProfile = async (req, res) => {
    const { userId } = req.params;
    const { email, monthlyIncome, monthlyExpanse, savingTarget } = req.body;
    try {
        const updateData = {};
        if (email) updateData.email = email;
        if (monthlyIncome !== undefined) updateData.monthlyIncome = monthlyIncome;
        if (monthlyExpanse !== undefined) updateData.monthlyExpanse = monthlyExpanse;
        if (savingTarget !== undefined) updateData['savingsGoal.amount'] = savingTarget;

        // Update user document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout=async(req,res)=>{
    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(400).json({message:"No token is provided"});
    }
    addToBlackList(token);
    res.status(200).json({message:"Logged out successfully"});
}

module.exports = {
    getAllUsers,
    getUserById,
    signup,
    login,
    onboardingDetail,
    toggleRoundup,
    editProfile,
    logout
};
