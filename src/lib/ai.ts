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
      message: "Expanse AI initialized. Log your first expense to begin strategic analysis.",
      recommendation: "Record a meal or bill to start training your advisor."
    }];
  }

  const insightList: AIInsight[] = [];
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // Category Analysis
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a);
  const [dominantCategory, dominantAmount] = sortedCategories[0];
  const dominantPercent = (dominantAmount / total) * 100;

  // 1. Dominance Insight
  if (dominantPercent > 40) {
    insightList.push({
      type: 'warning',
      message: `${dominantCategory} represents ${dominantPercent.toFixed(0)}% of your spending.`,
      recommendation: `Strategic Nudge: Try reducing ${dominantCategory} by 10% this week.`
    });
  }

  // 2. Velocity/Burn Rate Insight
  const uniqueDates = new Set(expenses.map(e => e.date)).size;
  const avgPerDay = total / (uniqueDates || 1);

  if (avgPerDay > 150) {
    insightList.push({
      type: 'warning',
      message: `Strategic Alert: High daily burn rate detected ($${avgPerDay.toFixed(0)}/day).`,
      recommendation: "Consider a 'No-Spend Day' tomorrow to reset your velocity."
    });
  } else if (avgPerDay < 50 && expenses.length > 5) {
    insightList.push({
      type: 'success',
      message: "Efficiency Award! Your spending velocity is excellently controlled.",
      recommendation: "Maintain this momentum to reach your monthly goals faster."
    });
  }

  // 3. Category Specific Advice
  if (categoryTotals['Food'] && categoryTotals['Food'] > (total * 0.3)) {
     insightList.push({
        type: 'info',
        message: "Culinary Insight: Food is your primary driver.",
        recommendation: "Prepping meals at home could save you roughly $50 per week."
     });
  }

  // Fallback
  if (insightList.length === 0) {
    insightList.push({
      type: 'info',
      message: "Strategic analysis active. You are maintaining a standard spending profile.",
      recommendation: "Keep logging to unlock deeper pattern recognition."
    });
  }

  return insightList;
}
