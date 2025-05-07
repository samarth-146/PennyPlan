const express=require('express');
const expenseRouter=express.Router();
const expenseController=require('../controllers/expenseController');

expenseRouter.get('/allexpense',expenseController.getAllExpenses);
expenseRouter.post('/expense',expenseController.addExpenses);
expenseRouter.get('/expense/:userId',expenseController.getAllExpensesByUserId);
expenseRouter.get('/roundupcount/:userId',expenseController.getRoundupTransactionCount);
expenseRouter.get('/weekly-behavior/:userId',expenseController.analyzeWeeklyBehaviour);
expenseRouter.get('/weekly-suggestion/:userId',expenseController.getWeeklySuggestions);

module.exports=expenseRouter;