import { Button } from '@/components/ui/button';
import Title from '@/components/ui/title';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAccounts } from '@/store/accounts/accounts.Thunk';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountCard } from './AccountCard';
import { AccountCardSkeleton } from './AccountCardSkeleton';
import { Card } from '@/components/ui/card';
import { fetchAllTransactions } from '@/store/transactions/transactions.Thunk';
import { Transaction } from '@/store/transactions/transactionsSlice';
import { Account } from '@/store/accounts/accountsSlice';
import { CircleChevronLeft } from 'lucide-react';
import { MonthSelector } from '@/components/ui/monthSelector';

const AccountOverview: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { accountId } = useParams();

	const {
		list: accounts,
		loading: accountsLoading,
		error: accountsError,
	} = useTypedSelector((state) => state.accounts);
	const {
		transactions,
		loading: transactionsLoading,
		error: transactionsError,
	} = useTypedSelector((state) => state.transactions);

	const [selectedDate, setSelectedDate] = useState(new Date());

	// Fetch data when selectedDate changes
	useEffect(() => {
		dispatch(fetchAccounts({ month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() }));
		dispatch(fetchAllTransactions({ month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate]);

	const handleMonthChange = (newDate: Date) => {
		setSelectedDate(newDate);
	};

	const thisAccount = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId]);

	const thisAccountTransactions = useMemo(() => {
		if (!thisAccount) return [];
		return transactions
			.filter(
				(transaction) =>
					transaction.account_to === thisAccount.name || transaction.account_from === thisAccount.name
			)
			.reverse();
	}, [transactions, thisAccount]);

	const getTransactionTarget = (transaction: Transaction, thisAccount: Account) => {
		return transaction.account_from === thisAccount.name
			? transaction.account_to || transaction.category
			: transaction.account_from || transaction.category;
	};

	return (
		<div className="flex flex-col space-y-2">
			<Title name="Account Overview" />
			<Button className="justify-start flex" type="button" variant="link" onClick={() => navigate('/accounts')}>
				<CircleChevronLeft /> Back to Accounts
			</Button>

			{accountsLoading ? (
				<AccountCardSkeleton />
			) : accountsError || !thisAccount ? (
				<p className="text-red-500 text-center py-4">
					Failed to load account data.
					<Button
						variant="link"
						onClick={() =>
							dispatch(
								fetchAccounts({ month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() })
							)
						}
					>
						Retry
					</Button>
				</p>
			) : (
				<AccountCard account={thisAccount} />
			)}

			<MonthSelector selectedDate={selectedDate} onMonthChange={handleMonthChange} />

			{transactionsLoading ? (
				<>
					<h2 className="text-xl m-5 text-primary">Latest Account transactions:</h2>
					<AccountCardSkeleton />
					<AccountCardSkeleton />
				</>
			) : transactionsError ? (
				<p className="text-red-500 text-center py-4">
					Failed to load transactions.
					<Button
						variant="link"
						onClick={() =>
							dispatch(
								fetchAllTransactions({
									month: selectedDate.getMonth() + 1,
									year: selectedDate.getFullYear(),
								})
							)
						}
					>
						Retry
					</Button>
				</p>
			) : transactions.length === 0 ? (
				<p className="text-red-500 text-center py-4">No transaction fot this month</p>
			) : (
				thisAccountTransactions.length > 0 && (
					<>
						<h2 className="text-xl m-5 text-primary">Latest Account transactions:</h2>
						<div className="max-h-[60vh] overflow-y-auto">
							{thisAccountTransactions.map((transaction) => (
								<Card
									key={transaction.id}
									onClick={() => navigate(`/transactions/${transaction.id}`)}
									className="mx-4 my-0.5"
								>
									<div className="flex flex-col">
										<h4 className="text-sm px-2 py-1 text-primary">{transaction.comment}</h4>
										<div className="flex justify-between px-2">
											<p className="text-primary pr-2 w-1/3 text-xs">Date:</p>
											<p className="text-primary pr-2 w-1/3 text-xs">
												{transaction.account_from === thisAccount!.name ? 'To:' : 'From'}
											</p>
											<p className="text-primary pr-2 w-1/3 text-xs">Amount:</p>
										</div>
										<div className="flex justify-between px-2 mb-2">
											<p className="text-md pr-2 w-1/3">{transaction.date}</p>
											<p
												className={`${transaction.account_from === thisAccount!.name ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3`}
											>
												{getTransactionTarget(transaction, thisAccount!)}
											</p>
											<p
												className={`${transaction.account_from === thisAccount!.name ? 'text-red-800' : 'text-green-800'} text-md pr-2 w-1/3 font-mono`}
											>
												{transaction.amount}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					</>
				)
			)}
		</div>
	);
};

export default AccountOverview;
