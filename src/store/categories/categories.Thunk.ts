import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Category } from './catgoriesSlice';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
      try {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  
        const firstDayISO = firstDay.toISOString();
        const lastDayISO = lastDay.toISOString();
  
        const { data: categories, error: categoriesError } = await supabase
          .from("categories")
          .select("*");
  
        if (categoriesError) throw categoriesError;
  
        const { data: transactions, error: transactionsError } = await supabase
          .from("transactions")
          .select("id, amount, category")
          .gte("date", firstDayISO)
          .lte("date", lastDayISO);
  
        if (transactionsError) throw transactionsError;
  
        const categoriesStats: Record<string, { used: number }> = {};
  
        categories.forEach(category => {
          categoriesStats[category.id] = { used: 0 };
        });
  
        transactions.forEach(tx => {
          if (tx.category && categoriesStats[tx.category]) {
            categoriesStats[tx.category].used += tx.amount;
          }
        })
  
        const categoriesWithStats: Category[] = categories.map(category => ({
          ...category,
          used: categoriesStats[category.id]?.used || 0,
        }));
  
        return categoriesWithStats;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category) => {
    const { data, error } = await supabase.from('categories').insert([category]).select().single();
        if (error) throw error;
        return data;
	}
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
		try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId).select();
      if (error) throw error;
      return categoryId;
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

