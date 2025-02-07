// accountsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Tables} from '../../../database.types'
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from './accounts.Thunk';

interface AccountsState {
  list: Tables<'accounts'>[];
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
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Tables<'accounts'>[]>) => {
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
        state.error = action.error.message || 'Failed to fetch accounts';
      })


      .addCase(createAccount.fulfilled, (state, action: PayloadAction<Tables<'accounts'>>) => {
        state.list.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<Tables<'accounts'>>) => {
        const index = state.list.findIndex((acc) => acc.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default accountsSlice.reducer;
