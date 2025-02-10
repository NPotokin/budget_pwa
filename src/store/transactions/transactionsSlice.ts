import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllTransactions } from './transactions.Thunk';
import { Tables } from 'database.types';

export type Transaction = Tables<'transactions'>

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
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
        state.transactions = action.payload
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transaction';
      })
  },
});

export default transactionsSlice.reducer;
