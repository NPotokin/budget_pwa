import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchAllTransactions } from "@/store/transactions/transactions.Thunk";
import { Button } from "@/components/ui/button";
import { AccountCardSkeleton } from "../Accounts/AccountCardSkeleton";
import { TransactionCard } from '../Transactions/TransactionCard'
import Title from "@/components/ui/title";
import { MonthSelector } from "../../components/ui/monthSelector"

const RecentTransactions: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const transactions = useTypedSelector((state) => state.transactions)

	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		dispatch(fetchAllTransactions({ 
			month: selectedDate.getMonth() + 1, // Months are 0-based in JS
			year: selectedDate.getFullYear()
		}));
	}, [selectedDate, dispatch]);

	// Handle month change from MonthSelector
	const handleMonthChange = (newDate: Date) => {
		setSelectedDate(newDate);
	};

	if (transactions.error || transactions.loading) {
		return (
			<div className="flex flex-col space-y-2">
				<Title name="Recent Transactions" />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
				<AccountCardSkeleton />
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<Title name="Recent Transactions" />
			<MonthSelector selectedDate={selectedDate} onMonthChange={handleMonthChange} />

			<div className="h-[60vh] overflow-y-auto">
				{transactions.transactions.length === 0 ? (
					<p className="mx-4 h-[65vh] py-24 text-primary text-lg">No recent transactions</p>
				) : (
					transactions.transactions.map((transaction) => (
						<TransactionCard key={transaction.id} transaction={transaction} />
					)).reverse()
				)}
			</div>

			<Button onClick={() => navigate('/')} variant={'default'} className="mx-4 mt-8 py-6">
				Add Transaction
			</Button>
		</div>
	);
};

export default RecentTransactions;
