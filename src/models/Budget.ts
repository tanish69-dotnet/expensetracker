import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide a budget amount'],
    default: 1000,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
