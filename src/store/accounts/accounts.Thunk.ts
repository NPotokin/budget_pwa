import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Account } from '../../types';

export const fetchAccounts = createAsyncThunk<Account[]>(
  'accounts/fetchAccounts',
  async () => {
    const { data, error } = await supabase.from('accounts').select('*');
    if (error) throw error;
    return data as Account[];
});

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
