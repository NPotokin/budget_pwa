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
      } catch (error: unknown) {
        return rejectWithValue(error);
      }
    }
  );


export const addCategory = createAsyncThunk<Category, Category>(
  'categories/addCategory',
  async (category: Category) => {
    const { data, error } = await supabase.from('categories').insert([category]).select().single();
        if (error) throw error;
        return data;
	}
)

export const updateCategoryName = createAsyncThunk(
  "accounts/updateCategoryName",
  async ({ id, name }: { id: string; name: string }) => {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    console.log(data)
    return data as Category;
  }
);

export const updateCategoryLimit = createAsyncThunk(
  "accounts/updateCategoryLimit",
  async ({ id, category_limit }: { id: string; category_limit: number }) => {
    const { data, error } = await supabase
      .from("categories")
      .update({ category_limit })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Category;
  }
);

export const deleteCategory = createAsyncThunk<string, string>(
  'categories/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
		try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId).select();
      if (error) throw error;
      return categoryId;
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

