const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'shopping', 'bills', 'entertainment', 'education', 'beverage', 'other'],
    default: 'Other',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  roundupAmount:{
    type:Number,
    min:0
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
