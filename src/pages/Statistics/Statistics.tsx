import { MonthSelector } from '@/components/ui/monthSelector';
import Title from '@/components/ui/title';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React, { useEffect, useState } from 'react';
import IncomeSpendingPie from './IncomeSpendingPie';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchCategories } from '@/store/categories/categories.Thunk';
import SpendingCategoriesPie from './SpendingCategoriesPie';
import SpendingCategoriesBar from './SpendingCategoriesBar';

const Statistics: React.FC = () => {
	const dispatch = useAppDispatch();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const handleMonthChange = (newDate: Date) => {
		setSelectedDate(newDate);
	};

	useEffect(() => {
		dispatch(
			fetchCategories({
				month: selectedDate.getMonth() + 1,
				year: selectedDate.getFullYear(),
			})
		);
	}, [dispatch, selectedDate]);

	const categories = useTypedSelector((state) => state.categories);
	const spendingCategories = categories.categories.filter((cat) => cat.type === 'spending');
	const incomeCategories = categories.categories.filter((cat) => cat.type === 'income');

	return (
		<div className="flex flex-col h-screen">
			<div className="sticky top-0 bg-white z-10 shadow-md">
				<Title name="Statistics" />
				<MonthSelector selectedDate={selectedDate} onMonthChange={handleMonthChange} />
			</div>

			<div className="overflow-y-auto flex flex-col flex-1 max-h[50vh]">
				<IncomeSpendingPie incomeCategories={incomeCategories} spendingCategories={spendingCategories} />
				<SpendingCategoriesBar spendingCategories={spendingCategories}/>
				<div className="mb-28">
					<SpendingCategoriesPie spendingCategories={spendingCategories} />
				</div>
			</div>
		</div>
	);
};

export default Statistics;
