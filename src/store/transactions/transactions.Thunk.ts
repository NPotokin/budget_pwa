import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Transaction } from './transactionsSlice';
import { Account } from '../accounts/accountsSlice';

export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      // Get the first and last day of the current month
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      // Convert to ISO format for database filtering
      const firstDayISO = firstDay.toISOString();
      const lastDayISO = lastDay.toISOString();

      // Fetch transactions for the current month
      const { data, error } = await supabase
        .from("transactions")
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
        .gte("date", firstDayISO)
        .lte("date", lastDayISO); // Filter transactions by current month

      if (error) throw error;

      return data.map((t) => ({
        id: t.id,
        date: t.date,
        amount: t.amount,
        account_from: t.account_from?.name || null,
        account_to: t.account_to?.name || null,
        category: t.category?.name || null,
        comment: t.comment,
      }));
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);


export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: Transaction, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([transaction])
        .select()
        .single();

      if (error) throw error; 

      if (!transaction.account_to) { // spending
        const { data: accountData, error: accountError } = await supabase
          .from("accounts")
          .select("balance")
          .eq("id", transaction.account_from)
          .single();

        if (accountError) throw accountError; 
        
        const newBalance = accountData.balance - transaction.amount!;
        const { error: updateBalanceError } = await supabase
          .from("accounts")
          .update({ balance: newBalance })
          .eq("id", transaction.account_from);

        if (updateBalanceError) throw updateBalanceError; 
      }

      if (!transaction.account_from) { // earning
        const { data: accountData, error: accountError } = await supabase
          .from("accounts")
          .select("balance")
          .eq("id", transaction.account_to)
          .single();

        if (accountError) throw accountError; 
        
        const newBalance = accountData.balance + transaction.amount!;
        const { error: updateBalanceError } = await supabase
          .from("accounts")
          .update({ balance: newBalance })
          .eq("id", transaction.account_to);

        if (updateBalanceError) throw updateBalanceError; 
      }

      if (!transaction.category) { // between accounts
        const { data: accountDataFrom, error: accountFromError } = await supabase
          .from("accounts")
          .select("balance")
          .eq("id", transaction.account_from)
          .single();

        if (accountFromError) throw accountFromError; 

        const { data: accountDataTo, error: accountToError } = await supabase
          .from("accounts")
          .select("balance")
          .eq("id", transaction.account_to)
          .single();

        if (accountToError) throw accountToError; 
        
        const newBalanceFrom = accountDataFrom.balance - transaction.amount!;
        const { error: updateBalanceFromError } = await supabase
          .from("accounts")
          .update({ balance: newBalanceFrom })
          .eq("id", transaction.account_from);

        if (updateBalanceFromError) throw updateBalanceFromError; 

        const newBalanceTo = accountDataTo.balance + transaction.amount!;
        const { error: updateBalanceToError } = await supabase
          .from("accounts")
          .update({ balance: newBalanceTo })
          .eq("id", transaction.account_to);

        if (updateBalanceToError) throw updateBalanceToError; 
      }

      return data; 
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);




