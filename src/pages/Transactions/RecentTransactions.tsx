import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionCard } from './TransactionCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AccountCardSkeleton } from '../Accounts/AccountCardSkeleton';

const RecentTransactions: React.FC = () => {
	const navigate = useNavigate();

	const transactions = useTypedSelector((state) => state.transactions);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllTransactions());
	}, [dispatch]);

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

			<div className="h-[65vh] overflow-y-auto">
				{transactions.transactions.length === 0 ? (
					<p className="mx-4 h-[65vh] py-24 text-primary text-lg">No recent transactions</p>
				) : (
					transactions.transactions.map((transaction) => (
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
