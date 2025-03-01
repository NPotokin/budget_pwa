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

interface SpendingCategoriesPieProps {
  spendingCategories: Category[];
}

const SpendingCategoriesPie: React.FC<SpendingCategoriesPieProps> = ({ spendingCategories }) => {

  const colorPalette = [
    '#16a34a', '#dc2626', '#facc15', '#3b82f6', '#9333ea', '#f43f5e', '#14b8a6', '#ef4444', '#22c55e', '#0ea5e9',
  ];

  const chartData = spendingCategories.map((category) => ({
    categoryType: category.name,
    amount: category.used || 0,
  }));

  const chartConfig: ChartConfig = {
    amount: { label: 'Amount' },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="categoryType" outerRadius={130} label>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
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

export default SpendingCategoriesPie;
