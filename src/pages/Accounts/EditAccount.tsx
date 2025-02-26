import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { updateAccountName, updateAccountBalance, deleteAccount, fetchAccountsThisMonth } from '@/store/accounts/accounts.Thunk';
import { useNavigate, useParams } from 'react-router-dom';
import { Account } from '@/store/accounts/accountsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AccountCardSkeleton } from './AccountCardSkeleton';
import { CircleChevronLeft } from 'lucide-react';

const EditAccount: React.FC = () => {
	const { accountId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const account = useTypedSelector(
		(state) => state.accounts.list.find((account) => account.id === accountId) as Account
	);

	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingBalance, setIsEditingBalance] = useState(false);

	const nameForm = useForm<{ name: string }>({
		resolver: zodResolver(
			z.object({
				name: z.string().min(2, 'Account name must be at least 2 characters.'),
			})
		),
		defaultValues: { name: account?.name || '' },
	});

	const balanceForm = useForm<{ balance: number }>({
		resolver: zodResolver(
			z.object({
				balance: z
					.string()
					.regex(/^\d+$/, 'Balance must be a valid number.')
					.transform((val) => Number(val)),
			})
		),
		defaultValues: { balance: account?.balance || 0 },
	});

	useEffect(() => {
		if (!account) dispatch(fetchAccountsThisMonth());
	}, [account, dispatch]);

	const handleUpdateName = async (data: { name: string }) => {
		await dispatch(updateAccountName({ id: account.id, name: data.name }));
		await dispatch(fetchAccountsThisMonth());
		setIsEditingName(false);
	};

	const handleUpdateBalance = async (data: { balance: number }) => {
		await dispatch(updateAccountBalance({ id: account.id, balance: data.balance }));
		await dispatch(fetchAccountsThisMonth());
		setIsEditingBalance(false);
	};

	const deleteThisAccout = () => {
		dispatch(deleteAccount(accountId as string));
		navigate('/accounts');
	};

	if (!account)
		return (
			<div className="flex flex-col space-y-4">
				<Title name="Edit Account" />
				<AccountCardSkeleton />
			</div>
		);

	return (
		<div className="flex flex-col space-y-4">
			<Title name="Edit Account" />
			<Button className="justify-start" variant="link" onClick={() => navigate(`/accounts/${accountId}`)}>
				<CircleChevronLeft />
				Back to Account Overview
			</Button>

			<Card key={account.id} className="mx-4">
				<CardHeader>
					<CardTitle className="text-2xl font-light flex justify-between">
						<p>{account?.name}</p>
					</CardTitle>
					<CardDescription>
						<div className="flex justify-between">
							<p className="text-primary w-1/3 text-xs">Balance:</p>
							<p className="text-primary w-1/3 text-xs">Earnings:</p>
							<p className="text-primary w-1/3 text-xs">Spendings:</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl w-1/3 font-mono">{account?.balance}</p>
							<p className="text-green-800 text-xl w-1/3 font-mono">{account?.earning}</p>
							<p className="text-red-800 text-xl w-1/3 font-mono">{account?.spending}</p>
						</div>
					</CardDescription>
				</CardHeader>
			</Card>

			{/* Update Account Name */}
			<div className="flex flex-col mx-4">
				{isEditingName ? (
					<Form {...nameForm}>
						<form onSubmit={nameForm.handleSubmit(handleUpdateName)} className="flex flex-col space-y-2">
							<FormField
								control={nameForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input className="w-[90vw] mx-0" placeholder="Enter new name" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingName(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-0" variant="link" onClick={() => setIsEditingName(true)}>
						Change Name
					</Button>
				)}
			</div>

			{/* Update Account Balance */}
			<div className="flex flex-col mx-4">
				{isEditingBalance ? (
					<Form {...balanceForm}>
						<form
							onSubmit={balanceForm.handleSubmit(handleUpdateBalance)}
							className="flex flex-col space-y-2"
						>
							<FormField
								control={balanceForm.control}
								name="balance"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-[90vw] mx-0"
												type="number"
												placeholder="Enter new balance"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingBalance(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-0" variant="link" onClick={() => setIsEditingBalance(true)}>
						Change Balance
					</Button>
				)}
			</div>
			<Button
				type={'button'}
				variant={'link'}
				className="justify-start text-md text-red-800 mx-0"
				onClick={deleteThisAccout}
			>
				Delete Account
			</Button>
		</div>
	);
};

export default EditAccount;
