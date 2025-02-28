import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Transaction } from './transactionsSlice';

export const fetchAllTransactions = createAsyncThunk(
	'transactions/fetchAllTransactions',
	async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
		try {
			// Get first and last day of the selected month
			const firstDay = new Date(year, month - 1, 1);
			const lastDay = new Date(year, month, 0, 23, 59, 59);

			const firstDayISO = firstDay.toISOString();
			const lastDayISO = lastDay.toISOString();

			// Fetch transactions for the selected month
			const { data, error } = await supabase
				.from('transactions')
				.select(
					`
			id, 
			amount, 
			comment, 
			date,
			account_from:accounts!transactions_account_from_fkey(id, name),
			account_to:accounts!transactions_account_to_fkey(id, name),
			category:categories!transactions_category_fkey(id, name)
		  `
				)
				.gte('date', firstDayISO)
				.lte('date', lastDayISO);

			if (error) throw error;

			return data.map((t) => ({
				id: t.id,
				date: t.date,
				amount: t.amount,
				//@ts-expect-error mismatch
				account_from: t.account_from?.name || null,
				//@ts-expect-error mismatc
				account_to: t.account_to?.name || null,
				//@ts-expect-error mismatch
				category: t.category?.name || null,
				comment: t.comment,
			}));
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const addTransaction = createAsyncThunk(
	'transactions/addTransaction',
	async (transaction: Transaction, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase.from('transactions').insert([transaction]).select().single();

			if (error) throw error;

			if (!transaction.account_to) {
				// spending
				const { data: accountData, error: accountError } = await supabase
					.from('accounts')
					.select('balance')
					.eq('id', transaction.account_from)
					.single();

				if (accountError) throw accountError;

				const newBalance = accountData.balance - transaction.amount!;
				const { error: updateBalanceError } = await supabase
					.from('accounts')
					.update({ balance: newBalance })
					.eq('id', transaction.account_from);

				if (updateBalanceError) throw updateBalanceError;
			}

			if (!transaction.account_from) {
				// earning
				const { data: accountData, error: accountError } = await supabase
					.from('accounts')
					.select('balance')
					.eq('id', transaction.account_to)
					.single();

				if (accountError) throw accountError;

				const newBalance = accountData.balance + transaction.amount!;
				const { error: updateBalanceError } = await supabase
					.from('accounts')
					.update({ balance: newBalance })
					.eq('id', transaction.account_to);

				if (updateBalanceError) throw updateBalanceError;
			}

			if (!transaction.category) {
				// between accounts
				const { data: accountDataFrom, error: accountFromError } = await supabase
					.from('accounts')
					.select('balance')
					.eq('id', transaction.account_from)
					.single();

				if (accountFromError) throw accountFromError;

				const { data: accountDataTo, error: accountToError } = await supabase
					.from('accounts')
					.select('balance')
					.eq('id', transaction.account_to)
					.single();

				if (accountToError) throw accountToError;

				const newBalanceFrom = accountDataFrom.balance - transaction.amount!;
				const { error: updateBalanceFromError } = await supabase
					.from('accounts')
					.update({ balance: newBalanceFrom })
					.eq('id', transaction.account_from);

				if (updateBalanceFromError) throw updateBalanceFromError;

				const newBalanceTo = accountDataTo.balance + transaction.amount!;
				const { error: updateBalanceToError } = await supabase
					.from('accounts')
					.update({ balance: newBalanceTo })
					.eq('id', transaction.account_to);

				if (updateBalanceToError) throw updateBalanceToError;
			}

			return data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const updateTransactionComment = createAsyncThunk(
	'accounts/updateTransactionComment',
	async ({ id, comment }: { id: string; comment: string }) => {
		const { data, error } = await supabase.from('transactions').update({ comment }).eq('id', id).select().single();
		if (error) throw error;
		console.log(data);
		return data as Transaction;
	}
);

export const updateTransactionAmount = createAsyncThunk(
	'accounts/updateTransactionAmount',
	async ({ id, amount }: { id: string; amount: number }) => {
		const { data, error } = await supabase.from('transactions').update({ amount }).eq('id', id).select().single();
		if (error) throw error;
		return data as Transaction;
	}
);

export const deleteTransaction = createAsyncThunk('accounts/deleteTransaction', async (transactionId: string) => {
	const { error } = await supabase.from('transactions').delete().eq('id', transactionId);
	if (error) throw error;
	return transactionId;
});

export const fetchOneTransaction = createAsyncThunk(
	'accounts/fetchOneTransaction',
	async (transactionId: string, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from('transactions')
				.select(
					`
			id, 
			amount, 
			comment, 
			date,
			account_from:accounts!transactions_account_from_fkey(id, name),
			account_to:accounts!transactions_account_to_fkey(id, name),
			category:categories!transactions_category_fkey(id, name)
		  `
				)
				.eq('id', transactionId)
				.single(); // Ensure we get a single transaction

			if (error) throw error;

			return {
				id: data.id,
				date: data.date,
				amount: data.amount,
				//@ts-expect-error mismatch
				account_from: data.account_from?.name || null,
				//@ts-expect-error mismatch
				account_to: data.account_to?.name || null,
				//@ts-expect-error mismatch
				category: data.category?.name || null,
				comment: data.comment,
			};
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
