import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
		try {
      const { data, error } = await supabase
      .from('transactions')
      .select(`
        id, 
        amount, 
        comment, 
        date,
        account_from:accounts!transactions_account_from_fkey(id, name),
        account_to:accounts!transactions_account_to_fkey(id, name),
        category:categories!transactions_category_fkey(id, name)
      `);
          if (error) throw error;
          return data.map((t) => ({
            id: t.id,
            date: t.date, 
            amount: t.amount,
            account_from: t.account_from.name, 
            account_to: t.account_to ? t.account_to.name : null,  
            category: t.category ? t.category.name : null,      
            comment: t.comment,
          }));
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction) => {
    const { data, error } = await supabase.from('transactions').insert([transaction]).select().single();
        if (error) throw error;
        return data;
	}
)



