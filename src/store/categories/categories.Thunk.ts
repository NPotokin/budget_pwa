import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
		try {
      const { data, error } = await supabase.from('categories').select('*');
          if (error) throw error;
          return data;
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

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
  async (categoryId) => {
    const { data, error } = await supabase.from('categories').delete().eq('id', categoryId).select();
        if (error) throw error;
        return categoryId;
	}
)