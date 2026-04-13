import { Expense, Category } from './types';

export interface AIInsight {
  type: 'info' | 'warning' | 'success';
  message: string;
  recommendation?: string;
  icon?: any;
}

export function calculateInsights(expenses: Expense[]): AIInsight[] {
  if (expenses.length === 0) {
    return [{
      type: 'info',
      message: "Intelligence Engine Ready.",
      recommendation: "Log your first transaction to initialize heuristic analysis."
    }];
  }

  const insightList: AIInsight[] = [];
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // 1. ANOMALY DETECTION (Today vs 2x Avg)
  const today = new Date().toISOString().split('T')[0];
  const todaySpend = expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0);
  
  const dailyTotals = expenses.reduce((acc, e) => {
    acc[e.date] = (acc[e.date] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const uniqueDates = Object.keys(dailyTotals).length;
  const avgDailySpend = total / uniqueDates;

  if (todaySpend > (avgDailySpend * 2) && todaySpend > 0) {
    insightList.push({
      type: 'warning',
      message: `ANOMALY DETECTED: Spending is 2x above daily average.`,
      recommendation: `Critical Alert: Unusual liquidity drift detected today ($${todaySpend.toFixed(2)}).`
    });
  }

  // 2. SPENDING PREDICTION
  const now = new Date();
  const dayOfMonth = now.getDate();
  const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthlyExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const currentMonthTotal = monthlyExpenses.reduce((s, e) => s + e.amount, 0);
  const predictedSpend = (currentMonthTotal / dayOfMonth) * totalDays;

  if (predictedSpend > 1200) { // arbitrary threshold for warning
     insightList.push({
       type: 'warning',
       message: `PREDICTION: At this rate, you will spend $${predictedSpend.toFixed(0)} this month.`,
       recommendation: "Implementation Plan: Reduce non-essential velocity by 15% to maintain budget."
     });
  }

  // 3. CATEGORY ANALYSIS & DOMINANCE
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);
  const [dominantCategory, dominantAmount] = sortedCategories[0];
  const dominantPercent = (dominantAmount / total) * 100;

  if (dominantPercent > 50) {
    insightList.push({
      type: 'info',
      message: `${dominantCategory} represents ${dominantPercent.toFixed(0)}% of your total impact.`,
      recommendation: `Strategy: Diversify spending to reduce ${dominantCategory} dominance.`
    });
  }

  // 4. FINANCIAL PERSONALITY
  const personality = calculatePersonality(expenses, categoryTotals, avgDailySpend);
  insightList.push({
    type: 'success',
    message: `Financial Personality: ${personality}`,
    recommendation: "Your spending profile has been successfully categorized by the Agentic Engine."
  });

  return insightList;
}

function calculatePersonality(expenses: Expense[], totals: Record<string, number>, avg: number): string {
  if (expenses.length < 3) return "Analyzing...";
  
  const mostExpensive = Object.entries(totals).sort(([, a], [, b]) => b - a)[0][0];
  
  if (mostExpensive === 'Food') return "Food Lover 🍔";
  if (mostExpensive === 'Shopping') return "Impulse Spender 🛍️";
  if (avg < 30) return "Smart Saver 💡";
  if (mostExpensive === 'Travel') return "Globetrotter ✈️";
  
  return "Balanced Strategist ⚖️";
}
