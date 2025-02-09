import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Account } from './accountsSlice';

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      const firstDayISO = firstDay.toISOString();
      const lastDayISO = lastDay.toISOString();

      const { data: accounts, error: accountsError } = await supabase
        .from("accounts")
        .select("*");

      if (accountsError) throw accountsError;

      const { data: transactions, error: transactionsError } = await supabase
        .from("transactions")
        .select("id, amount, account_from, account_to")
        .gte("date", firstDayISO)
        .lte("date", lastDayISO);

      if (transactionsError) throw transactionsError;

      const accountStats: Record<string, { earning: number; spending: number }> = {};

      accounts.forEach(account => {
        accountStats[account.id] = { earning: 0, spending: 0 };
      });

      transactions.forEach(tx => {
        if (tx.account_from && accountStats[tx.account_from]) {
          accountStats[tx.account_from].spending += tx.amount;
        }
        if (tx.account_to && accountStats[tx.account_to]) {
          accountStats[tx.account_to].earning += tx.amount;
        }
      });

      const accountsWithStats: Account[] = accounts.map(account => ({
        ...account,
        earning: accountStats[account.id]?.earning || 0,
        spending: accountStats[account.id]?.spending || 0,
      }));

      return accountsWithStats;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const createAccount =  createAsyncThunk<Account>(
  'accounts/createAccount',
  async (account) => {
    const { data, error } = await supabase.from('accounts').insert([account]).select().single();
    if (error) throw error;
    return data as Account;
  }
);

export const updateAccount = createAsyncThunk<Account, Account>(
  'accounts/updateAccount',
  async (account) => {
    const { data, error } = await supabase
      .from('accounts')
      .update({ name: account.name, balance: account.balance })
      .eq('id', account.id)
      .single();
    if (error) throw error;
    return data as Account;
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (accountId: string) => {
    const { error } = await supabase.from('accounts').delete().eq('id', accountId);
    if (error) throw error;
    return accountId;
  }
);
