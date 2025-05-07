const mongoose = require('mongoose');
const User = require('../models/User');
const axios = require('axios');
const dotenv = require('dotenv');
const Expense = require('../models/Expense');

const calculateRoundUp = (amount, method, customValue) => {
    let nearest = method === 'custom' ? customValue : parseInt(method);
    const rounded = Math.ceil(amount / nearest) * nearest;
    return +(rounded - amount).toFixed(2);
};

const getAllExpenses = async (req, res) => {
    const expense = await Expense.find();
    res.status(200).json(expense);
}

const addExpenses = async (req, res) => {
    const { userId, title, amount, category, date } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        let roundUpAmount = 0;
        if (user.roundUp?.enabled) {
            roundUpAmount = calculateRoundUp(amount, user.roundUp.method, user.roundUp.customValue);
        }

        user.roundUpSum = (user.roundUpSum || 0) + roundUpAmount;
        await user.save();

        const newExpense = new Expense({
            userId: userId,
            title: title,
            amount: amount,
            category: category,
            roundupAmount: roundUpAmount,
            date: date
        });

        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (err) {
        console.error("Error adding expense:", err);
        res.status(500).json({ message: 'Error adding expense' });
    }
};

const getAllExpensesByUserId = async (req, res) => {
    const userId = req.params.userId;
    const expenses = await Expense.find({ userId: userId });
    res.status(200).json(expenses);
};

const getRoundupTransactionCount = async (req, res) => {
    try {
        const { userId } = req.params;

        const count = await Expense.countDocuments({
            userId,
            roundupAmount: { $gt: 0 },
        });

        res.status(200).json({ roundUpTransactionCount: count });
    } catch (error) {
        console.error('Error counting round-up transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const analyzeWeeklyBehaviour = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const rawData = await Expense.aggregate([
            { $match: { userId, date: { $gte: startDate } } },
            {
                $group: {
                    _id: {
                        category: "$category",
                        week: { $isoWeek: "$date" }
                    },
                    totalSpent: { $sum: "$amount" }
                }
            }
        ]);


        const spendingData = {};
        rawData.sort((a, b) => a._id.week - b._id.week);

        rawData.forEach(entry => {
            const cat = entry._id.category;
            if (!spendingData[cat]) spendingData[cat] = [];
            spendingData[cat].push(entry.totalSpent);
        });

        const mlResponse = await axios.post('http://127.0.0.1:5000/analyze-behavior', {
            userId,
            spendingData
        });

        res.json({
            alerts: mlResponse.data.alerts
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to analyze spending behavior" });
    }
};

const getWeeklySuggestions=async(req,res)=>{
    const userId=req.params.userId;
    try {
        const expenses = await Expense.find({ userId });
        const formattedExpenses = expenses.map((e) => ({
          category: e.category,
          amount: e.amount,
          date: e.date.toISOString(),
        }));
    
        const mlResponse = await axios.post("http://127.0.0.1:5000/generate-suggestions", {
          expenses: formattedExpenses,
        });    
        res.json({ alerts: mlResponse.data.alerts});
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate suggestions" });
      }
}

module.exports = {
    getAllExpenses,
    addExpenses,
    getAllExpensesByUserId,
    getRoundupTransactionCount,
    analyzeWeeklyBehaviour,
    getWeeklySuggestions
}