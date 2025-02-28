import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
	selectedDate: Date;
	onMonthChange: (newDate: Date) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedDate, onMonthChange }) => {
	const formattedMonth = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

	const prevMonth = () => onMonthChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
	const nextMonth = () => onMonthChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

	return (
		<div className="flex items-center justify-between mx-4 my-2">
			<Button variant={'outline'} size="icon" onClick={prevMonth}>
				<ChevronLeft className="w-5 h-5" />
			</Button>

			<span className="text-lg font-medium">{formattedMonth}</span>

			<Button variant={'outline'} size="icon" onClick={nextMonth}>
				<ChevronRight className="w-5 h-5" />
			</Button>
		</div>
	);
};
