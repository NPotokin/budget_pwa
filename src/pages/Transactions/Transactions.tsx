import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Title from '@/components/ui/title';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchAccounts } from '@/store/accounts/accounts.Thunk';
import { Account } from '@/store/accounts/accountsSlice';
import { fetchCategories } from '@/store/categories/categories.Thunk';
import { Category } from '@/store/categories/catgoriesSlice';
import { addTransaction } from '@/store/transactions/transactions.Thunk';
import { Transaction } from '@/store/transactions/transactionsSlice';
import { Minus, Plus, ArrowLeftRight, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transactions: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const categories = useTypedSelector((state) => state.categories.categories) || [];
	const accounts = useTypedSelector((state) => state.accounts.list) || [];

	const categoriesSpending = categories.filter((category) => category.type === 'spending');
	const categoriesEarning = categories.filter((category) => category.type === 'income');

	const [selectedFrom, setSelectedFrom] = useState<Account[] | Category[]>([]);
	const [selectedTo, setSelectedTo] = useState<Account[] | Category[]>([]);

	const [transaction, setTransaction] = useState<Transaction>({
		//@ts-expect-error mismatch
		date: new Date(),
		amount: 0,
		account_from: '',
		account_to: '',
		category: '',
		comment: '',
	});

	useEffect(() => {
		dispatch(fetchAccounts());
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleSpending = () => {
		setSelectedFrom(accounts);
		setSelectedTo(categoriesSpending);
		setTransaction((prev) => ({
			...prev,
			account_from: '',
			category: '',
			account_to: null,
		}));
	};

	const handleTransfer = () => {
		setSelectedFrom(accounts);
		setSelectedTo(accounts.filter((acc) => acc.id !== transaction.account_from));
		setTransaction((prev) => ({
			...prev,
			account_from: '',
			account_to: '',
			category: null,
		}));
	};

	const handleFromChange = (value: string) => {
		setTransaction((prev) => ({ ...prev, account_from: value }));

		if (selectedTo === accounts) {
			setSelectedTo(accounts.filter((acc) => acc.id !== value));
		}
	};

	// Dynamically filter the "From" list when "To" is selected
	const handleToChange = (value: string) => {
		setTransaction((prev) => ({ ...prev, account_to: value }));

		if (selectedFrom === accounts) {
			setSelectedFrom(accounts.filter((acc) => acc.id !== value)); // Filter "From" options in Transfer mode
		}
	};

	const handleEarning = () => {
		setSelectedFrom(categoriesEarning);
		setSelectedTo(accounts);
		setTransaction((prev) => ({
			...prev,
			category: '',
			account_to: '',
			account_from: null,
		}));
	};

	const handleAddTransaction = async () => {
		const result = await dispatch(addTransaction(transaction));

		if (addTransaction.fulfilled.match(result)) {
			setTransaction({
				//@ts-expect-error mismatch date
				date: new Date(),
				amount: 0,
				account_from: '',
				account_to: '',
				category: '',
				comment: '',
			});
		}
	};

	return (
		<div className="flex-flex-col w-full">
			<Title name="Transactions" />

			<div className="flex flex-col space-y-2">
				<Calendar
					weekStartsOn={1}
					className="w-[95vw] mx-4"
					selected={new Date(transaction.date)}
					onDayClick={(date) =>
						setTransaction({
							...transaction,
							date: date.toISOString(),
						})
					}
				/>

				<div className="flex justify-between pt-2 mx-8">
					<button
						onClick={handleEarning}
						className="w-[25vw] h-8 rounded-2xl bg-green-800 items-center justify-center text-secondary flex"
					>
						<Plus size={20} />
					</button>
					<button
						onClick={handleTransfer}
						className="w-[25vw] h-8 rounded-2xl bg-primary items-center justify-center text-secondary flex"
					>
						<ArrowLeftRight size={20} />
					</button>
					<button
						onClick={handleSpending}
						className="w-[25vw] h-8 rounded-2xl bg-red-800 items-center justify-center text-secondary flex"
					>
						<Minus size={20} />
					</button>
				</div>

				<div className="flex justify-evenly items-center m-4">
					<div className="flex flex-col">
						<p>From:</p>
						<Select onValueChange={handleFromChange}>
							<SelectTrigger className="w-[35vw]">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectedFrom.map((item) => (
										<SelectItem key={item.id} value={item.id}>
											{item.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<ArrowRight size={36} className="text-primary" />
					</div>

					<div className="flex flex-col">
						<p>To:</p>
						<Select onValueChange={handleToChange}>
							<SelectTrigger className="w-[35vw]">
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectedTo.map((item) => (
										<SelectItem key={item.id} value={item.id}>
											{item.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<Input
					className="w-[85vw] mx-auto"
					type="number"
					placeholder="Amount"
					min={0}
					required
					value={transaction.amount || ''}
					onChange={(e) =>
						setTransaction({
							...transaction,
							amount: parseFloat(e.target.value) || 0,
						})
					}
				/>

				<div className="flex flex-col">
					<h3 className="mx-8">Comment:</h3>
					<div className="flex items-center mx-8">
						<Textarea
							className="h-[20px]"
							value={transaction.comment!}
							onChange={(e) =>
								setTransaction({
									...transaction,
									comment: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<Button
					disabled={
						!transaction.date ||
						!transaction.amount ||
						!transaction.comment ||
						!(
							(transaction.account_from && transaction.account_to) || // Transfer
							(transaction.account_from && transaction.category) || // Spending
							(transaction.category && transaction.account_to) // Earning
						)
					}
					variant={'default'}
					className="m-8 py-6"
					onClick={handleAddTransaction}
				>
					Add Transaction
				</Button>

				<Button variant={'link'} className="py-4" onClick={() => navigate('/transactions')}>
					See Recent Transactions
				</Button>
			</div>
		</div>
	);
};

export default Transactions;
