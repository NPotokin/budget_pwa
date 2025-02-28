import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	deleteTransaction,
	fetchAllTransactions,
	fetchOneTransaction,
	updateTransactionAmount,
	updateTransactionComment,
} from './transactions.Thunk';
import { Tables } from 'database.types';

export type Transaction = Tables<'transactions'>;

interface TransactionState {
	transactions: Transaction[];
	currentTransaction: Transaction;
	loading: boolean;
	error: string | null;
}

const initialState: TransactionState = {
	transactions: [],
	//@ts-expect-error types
	currentTransaction: {},
	loading: false,
	error: null,
};

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllTransactions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			//@ts-expect-error mismatch
			.addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
				state.loading = false;
				state.transactions = action.payload;
			})
			.addCase(fetchAllTransactions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch transaction';
			})

			.addCase(updateTransactionAmount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTransactionAmount.fulfilled, (state, action: PayloadAction<Transaction>) => {
				state.loading = false;
				const index = state.transactions.findIndex((tr) => tr.id === action.payload.id);
				if (index !== -1) {
					state.transactions[index] = action.payload;
				}
			})
			.addCase(updateTransactionAmount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update transaction';
			})

			.addCase(updateTransactionComment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTransactionComment.fulfilled, (state, action: PayloadAction<Transaction>) => {
				state.loading = false;
				const index = state.transactions.findIndex((tr) => tr.id === action.payload.id);
				if (index !== -1) {
					state.transactions[index] = action.payload;
				}
			})
			.addCase(updateTransactionComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update transaction';
			})

			.addCase(deleteTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteTransaction.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions = state.transactions.filter((tr) => tr.id !== action.payload);
			})
			.addCase(deleteTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete transaction';
			})

			.addCase(fetchOneTransaction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOneTransaction.fulfilled, (state, action) => {
				state.loading = false;
				//@ts-expect-error mismatch
				state.currentTransaction = action.payload;
			})
			.addCase(fetchOneTransaction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete transaction';
			});
	},
});

export default transactionsSlice.reducer;
