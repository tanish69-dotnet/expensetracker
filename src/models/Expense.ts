import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  date: {
    type: String, // Storing as ISO String for consistency with previous types
    required: [true, 'Please provide a date'],
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
