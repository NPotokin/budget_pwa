import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';
import { Button } from '@/components/ui/button';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';
import { TransactionCard } from '../Transactions/TransactionCard';
import Title from '@/components/ui/title';
import { MonthSelector } from '../../components/ui/monthSelector';

const RecentTransactions: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { transactions, loading, error } = useTypedSelector((state) => state.transactions);

	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		dispatch(
			fetchAllTransactions({
				month: selectedDate.getMonth() + 1,
				year: selectedDate.getFullYear(),
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate]); // Removed `dispatch` from dependencies

	const handleMonthChange = (newDate: Date) => setSelectedDate(newDate);

	// Memoize reversed transactions to prevent unnecessary calculations on re-renders
	const sortedTransactions = useMemo(() => {
		return transactions.length > 0 ? [...transactions].reverse() : [];
	}, [transactions]);

	return (
		<div className="flex flex-col">
			<Title name="Recent Transactions" />
			<MonthSelector selectedDate={selectedDate} onMonthChange={handleMonthChange} />

			<div className="h-[60vh] overflow-y-auto">
				{loading && transactions.length === 0 ? (
					<>
						<AccountCardSkeleton />
						<AccountCardSkeleton />
						<AccountCardSkeleton />
						<AccountCardSkeleton />
					</>
				) : error ? (
					<p className="mx-4 py-24 text-red-500 text-lg">Failed to load transactions</p>
				) : sortedTransactions.length === 0 ? (
					<p className="mx-4 h-[65vh] py-24 text-primary text-lg">No recent transactions</p>
				) : (
					sortedTransactions.map((transaction) => (
						<TransactionCard key={transaction.id} transaction={transaction} />
					))
				)}
			</div>

			<Button onClick={() => navigate('/')} variant={'default'} className="mx-4 mt-8 py-6">
				Add Transaction
			</Button>
		</div>
	);
};

export default RecentTransactions;
