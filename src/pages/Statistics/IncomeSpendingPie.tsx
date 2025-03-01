import { Category } from '@/store/categories/catgoriesSlice';
import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface IncomeSpendingPieProps {
  incomeCategories: Category[];
  spendingCategories: Category[];
}

const IncomeSpendingPie: React.FC<IncomeSpendingPieProps> = ({ incomeCategories, spendingCategories }) => {
  // Calculate totals
  const allEarnings = incomeCategories.reduce((sum, item) => sum + (item.used || 0), 0);
  const allSpendings = spendingCategories.reduce((sum, item) => sum + (item.used || 0), 0);

  const colors = {
    income: '#16a34a', 
    spending: '#dc2626',
  };
  // Prepare chart data
  const chartData = [
    { categoryType: 'Income', amount: allEarnings, fill: colors.income },
    { categoryType: 'Spending', amount: allSpendings, fill: colors.spending },
  ];

  // Chart configuration
  const chartConfig: ChartConfig = {
    amount: { label: 'Amount' },
    income: { label: 'Income' },
    spending: { label: 'Spending' },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income vs Spending</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="categoryType" outerRadius={130}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Data based on selected month</div>
      </CardFooter>
    </Card>
  );
};

export default IncomeSpendingPie;
