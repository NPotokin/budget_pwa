import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
	updateTransactionAmount,
	updateTransactionComment,
	deleteTransaction,
	fetchOneTransaction,
} from '@/store/transactions/transactions.Thunk';
import { CircleChevronLeft } from 'lucide-react';

export const TransactionOverview: React.FC = () => {
	const navigate = useNavigate();
	const { transactionId } = useParams();
	const dispatch = useAppDispatch();
	const transaction = useTypedSelector((state) => state.transactions.currentTransaction);

	const [isEditingAmount, setIsEditingAmount] = useState(false);
	const [isEditingComment, setIsEditingComment] = useState(false);

	useEffect(() => {
		dispatch(fetchOneTransaction(transactionId!));
	}, [dispatch, transactionId]);

	const amountForm = useForm<{ amount: number }>({
		resolver: zodResolver(
			z.object({
				amount: z
					.string()
					.regex(/^\d+$/, 'Amount must be a valid number.')
					.transform((val) => Number(val)),
			})
		),
		defaultValues: { amount: transaction?.amount || 0 },
	});

	const commentForm = useForm<{ comment: string }>({
		resolver: zodResolver(
			z.object({
				comment: z.string().min(2, 'Comment must be at least 2 characters.'),
			})
		),
		defaultValues: { comment: transaction?.comment || '' },
	});

	const handleUpdateAmount = async (data: { amount: number }) => {
		await dispatch(
			updateTransactionAmount({
				id: transaction!.id,
				amount: data.amount,
			})
		);
		await dispatch(fetchOneTransaction(transactionId!));
		setIsEditingAmount(false);
	};

	const handleUpdateComment = async (data: { comment: string }) => {
		await dispatch(
			updateTransactionComment({
				id: transaction!.id,
				comment: data.comment,
			})
		);
		await dispatch(fetchOneTransaction(transactionId!));
		setIsEditingComment(false);
	};

	const handleDeleteTransaction = () => {
		dispatch(deleteTransaction(transactionId as string));
		navigate('/');
	};

	if (!transaction) {
		return <p className="text-red-500">Transaction not found</p>;
	}

	return (
		<div className="flex flex-col">
			<Title name="Transaction overview" />
			<Button className="justify-start" variant="link" onClick={() => navigate(-1)}>
				<CircleChevronLeft />
				Back
			</Button>
			<Card className="mx-4 my-0.5">
				<CardHeader className="p-3">
					<div className="flex flex-col">
						<CardTitle className="text-sm font-normal mb-0 flex justify-between">
							<p>{transaction.comment}</p>
						</CardTitle>
						<CardDescription>
							<div className="flex">
								<p className="text-primary pr-2 w-1/4 text-xs">Date:</p>
								<p className="text-primary pr-2 w-1/4 text-xs">From:</p>
								<p className="text-primary pr-2 w-1/4 text-xs">To:</p>
								<p className="text-primary pr-2 w-1/4 text-xs">Amount:</p>
							</div>
							<div className="flex">
								<p className="pr-2 w-1/4 text-xs">{transaction.date}</p>
								<p className="pr-2 w-1/4 text-xs">
									{transaction.account_from ? transaction.account_from : transaction.category}
								</p>
								<p className="pr-2 w-1/4 text-xs">
									{transaction.account_to ? transaction.account_to : transaction.category}
								</p>
								<p className="pr-2 w-1/4 text-xs font-mono">{transaction.amount}</p>
							</div>
						</CardDescription>
					</div>
				</CardHeader>
			</Card>

			{/* Update Amount */}
			<div className="flex flex-col mx-4 my-2">
				{isEditingAmount ? (
					<Form {...amountForm}>
						<form
							onSubmit={amountForm.handleSubmit(handleUpdateAmount)}
							className="flex flex-col space-y-2"
						>
							<FormField
								control={amountForm.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-[92vw] mx-0"
												type="number"
												placeholder="Enter new amount"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingAmount(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-1" variant="link" onClick={() => setIsEditingAmount(true)}>
						Change Amount
					</Button>
				)}
			</div>

			{/* Update Comment */}
			<div className="flex flex-col mx-4 my-2">
				{isEditingComment ? (
					<Form {...commentForm}>
						<form
							onSubmit={commentForm.handleSubmit(handleUpdateComment)}
							className="flex flex-col space-y-2"
						>
							<FormField
								control={commentForm.control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-[92vw] mx-0"
												placeholder="Enter new comment"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<div className="flex space-x-4">
								<Button type="submit">Save</Button>
								<Button variant="outline" onClick={() => setIsEditingComment(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<Button className="justify-start px-1" variant="link" onClick={() => setIsEditingComment(true)}>
						Change Comment
					</Button>
				)}
			</div>

			{/* Delete Transaction */}
			<Button variant="link" className="text-red-800 mx-1 justify-start my-2" onClick={handleDeleteTransaction}>
				Delete Transaction
			</Button>
		</div>
	);
};
