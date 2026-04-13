'use server';

import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';
import Budget from '@/models/Budget';
import { revalidatePath } from 'next/cache';

export async function getExpenses() {
  await dbConnect();
  try {
    const expenses = await Expense.find({}).sort({ date: -1 });
    // Convert to plain objects for serialization
    return JSON.parse(JSON.stringify(expenses));
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
}

export async function addExpense(data: { amount: number; category: string; date: string }) {
  await dbConnect();
  try {
    const newExpense = await Expense.create(data);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true, id: newExpense._id.toString() };
  } catch (error) {
    console.error('Error adding expense:', error);
    return { success: false };
  }
}

export async function deleteExpense(id: string) {
  await dbConnect();
  try {
    await Expense.findByIdAndDelete(id);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting expense:', error);
    return { success: false };
  }
}
export async function getBudget() {
  await dbConnect();
  try {
    const budget = await Budget.findOne({}).sort({ updatedAt: -1 });
    return budget ? budget.amount : 1000;
  } catch (error) {
    console.error('Error fetching budget:', error);
    return 1000;
  }
}

export async function updateBudget(amount: number) {
  await dbConnect();
  try {
    const budget = await Budget.findOneAndUpdate(
      {}, 
      { amount, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    revalidatePath('/dashboard');
    return { success: true, amount: budget.amount };
  } catch (error) {
    console.error('Error updating budget:', error);
    return { success: false };
  }
}

export async function resetData() {
  await dbConnect();
  try {
    await Expense.deleteMany({});
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error resetting data:', error);
    return { success: false };
  }
}
