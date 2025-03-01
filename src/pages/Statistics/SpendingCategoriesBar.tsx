import { Category } from '@/store/categories/catgoriesSlice';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
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
  ChartTooltipContent,
} from '@/components/ui/chart';

interface SpendingCategoriesBarProps {
  spendingCategories: Category[];
}

const SpendingCategoriesBar: React.FC<SpendingCategoriesBarProps> = ({ spendingCategories }) => {

  const limitColor = '#16a34a'; 
  const usedColor = '#dc2626'; 

  const chartData = spendingCategories.map((category) => ({
    category: category.name,
    limit: category.category_limit || 0,
    used: category.used || 0, 
  }));

  const chartConfig: ChartConfig = {
    limit: { label: 'Limit' },
    used: { label: 'Used' },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="w-full max-h-[400px]">
          <ResponsiveContainer width="100%" height={chartData.length * 50}>
            <BarChart layout="vertical" data={chartData}>
              <XAxis type="number" tick={{ fill: '#6b7280' }} axisLine={true} tickLine={false} />

              <YAxis type="category" dataKey="category" width={50} tick={{ fill: '#374151' }} />

              <Tooltip content={<ChartTooltipContent />} cursor={{ fill: '#f3f4f6' }} />

              <Bar dataKey="limit" barSize={20} fill={limitColor} radius={[5, 5, 5, 5]}>
                <LabelList dataKey="limit" position="insideRight" fill="#374151" />
              </Bar>

              {/* Used Bar (Inner, on top of Limit) */}
              <Bar dataKey="used" barSize={20} fill={usedColor} radius={[5, 0, 0, 5]}>
                <LabelList dataKey="used" position="insideLeft" fill="white" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Data based on selected month</div>
      </CardFooter>
    </Card>
  );
};

export default SpendingCategoriesBar;
