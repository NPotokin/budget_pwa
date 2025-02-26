import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	addCategory,
	deleteCategory,
	fetchCategories,
	fetchCategoriesThisMonth,
	updateCategoryLimit,
	updateCategoryName,
} from './categories.Thunk';
import { Tables } from 'database.types';

export type Category = Tables<'categories'> & {
	used: number;
};

interface CategoryState {
	categories: Category[];
	loading: boolean;
	error: string | null;
}

const initialState: CategoryState = {
	categories: [],
	loading: false,
	error: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})

			.addCase(fetchCategoriesThisMonth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCategoriesThisMonth.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategoriesThisMonth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})

			.addCase(addCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = [...state.categories, action.payload];
			})
			.addCase(addCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})

			.addCase(updateCategoryName.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCategoryName.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
				if (index !== -1) {
					state.categories[index] = action.payload;
				}
			})
			.addCase(updateCategoryName.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})

			.addCase(updateCategoryLimit.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCategoryLimit.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
				if (index !== -1) {
					state.categories[index] = action.payload;
				}
			})
			.addCase(updateCategoryLimit.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})

			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
				state.loading = false;
				state.categories = state.categories.filter((category) => category.id !== action.payload);
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			});
	},
});

export default categoriesSlice.reducer;
