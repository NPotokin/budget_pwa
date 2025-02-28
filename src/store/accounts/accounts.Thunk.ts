import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Account } from './accountsSlice';

export const fetchAccounts = createAsyncThunk(
	'accounts/fetchAccounts',
	async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
		try {
			const firstDay = new Date(year, month - 1, 1);
			const lastDay = new Date(year, month, 0, 23, 59, 59);

			const firstDayISO = firstDay.toISOString();
			const lastDayISO = lastDay.toISOString();

			const { data: accounts, error: accountsError } = await supabase.from('accounts').select('*');
			if (accountsError) throw accountsError;

			const { data: transactions, error: transactionsError } = await supabase
				.from('transactions')
				.select('id, amount, account_from, account_to')
				.gte('date', firstDayISO)
				.lte('date', lastDayISO);

			if (transactionsError) throw transactionsError;

			const accountStats: Record<string, { earning: number; spending: number }> = {};

			accounts.forEach((account) => {
				accountStats[account.id] = { earning: 0, spending: 0 };
			});

			transactions.forEach((tx) => {
				if (tx.account_from && accountStats[tx.account_from]) {
					accountStats[tx.account_from].spending += tx.amount;
				}
				if (tx.account_to && accountStats[tx.account_to]) {
					accountStats[tx.account_to].earning += tx.amount;
				}
			});

			const accountsWithStats: Account[] = accounts.map((account) => ({
				...account,
				earning: accountStats[account.id]?.earning || 0,
				spending: accountStats[account.id]?.spending || 0,
			}));

			return accountsWithStats;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchAccountsThisMonth = createAsyncThunk(
	'accounts/fetchAccountsThisMonth',
	async (_, { rejectWithValue }) => {
		try {
			const now = new Date();
			const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
			const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

			const firstDayISO = firstDay.toISOString();
			const lastDayISO = lastDay.toISOString();

			const { data: accounts, error: accountsError } = await supabase.from('accounts').select('*');
			if (accountsError) throw accountsError;

			const { data: transactions, error: transactionsError } = await supabase
				.from('transactions')
				.select('id, amount, account_from, account_to')
				.gte('date', firstDayISO)
				.lte('date', lastDayISO);

			if (transactionsError) throw transactionsError;

			const accountStats: Record<string, { earning: number; spending: number }> = {};

			accounts.forEach((account) => {
				accountStats[account.id] = { earning: 0, spending: 0 };
			});

			transactions.forEach((tx) => {
				if (tx.account_from && accountStats[tx.account_from]) {
					accountStats[tx.account_from].spending += tx.amount;
				}
				if (tx.account_to && accountStats[tx.account_to]) {
					accountStats[tx.account_to].earning += tx.amount;
				}
			});

			const accountsWithStats: Account[] = accounts.map((account) => ({
				...account,
				earning: accountStats[account.id]?.earning || 0,
				spending: accountStats[account.id]?.spending || 0,
			}));

			return accountsWithStats;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createAccount = createAsyncThunk<Account, Account>('accounts/createAccount', async (account: Account) => {
	const { data, error } = await supabase.from('accounts').insert([account]).select().single();
	if (error) throw error;
	return data as Account;
});

export const updateAccountName = createAsyncThunk(
	'accounts/updateAccountName',
	async ({ id, name }: { id: string; name: string }) => {
		const { data, error } = await supabase.from('accounts').update({ name }).eq('id', id).select().single();
		if (error) throw error;
		console.log(data);
		return data as Account;
	}
);

export const updateAccountBalance = createAsyncThunk(
	'accounts/updateAccountBalance',
	async ({ id, balance }: { id: string; balance: number }) => {
		const { data, error } = await supabase.from('accounts').update({ balance }).eq('id', id).select().single();
		if (error) throw error;
		return data as Account;
	}
);

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (accountId: string) => {
	const { error } = await supabase.from('accounts').delete().eq('id', accountId);
	if (error) throw error;
	return accountId;
});
