import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
		try {
      const { data, error } = await supabase.from('transactions').select('*');
          if (error) throw error;
          return data;
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
