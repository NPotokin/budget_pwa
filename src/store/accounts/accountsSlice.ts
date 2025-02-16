// accountsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Tables} from '../../../database.types'
import { fetchAccounts, createAccount, deleteAccount, updateAccountName, updateAccountBalance } from './accounts.Thunk';


export type Account = Tables<"accounts"> & {
  spending: number;
  earning: number;
};
interface AccountsState {
  list: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  list: [],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(account => account.id !== action.payload)
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete account';
      })

      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.list.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create account';
      })
      
      .addCase(updateAccountName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountName.fulfilled, (state, action: PayloadAction<Account>) => {
        const index = state.list.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAccountName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update account name';
      })
      
      .addCase(updateAccountBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountBalance.fulfilled, (state, action: PayloadAction<Account>) => {
        const index = state.list.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAccountBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update account name';
      });
  },
});

export default accountsSlice.reducer;
