import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTransactions } from './transactions.Thunk';

interface Transaction {
  id: string,
  date: Date,
  amount: number,
  account_from: string,
  account_to: string | null,
  category: string | null,
  comment: string
}

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
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transaction';
      })
  },
});

export default transactionsSlice.reducer;
