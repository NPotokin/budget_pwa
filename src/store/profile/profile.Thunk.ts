import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error;
    const {email, first_name, last_name} = data.user.user_metadata 
    return {email, first_name, last_name}
});

// export const createAccount = createAsyncThunk<Account, Omit<Account, 'id'>>(
//   'accounts/createAccount',
//   async (account) => {
//     const { data, error } = await supabase.from('accounts').insert([account]).single();
//     if (error) throw error;
//     return data as Account;
//   }
// );

// export const updateAccount = createAsyncThunk<Account, Account>(
//   'accounts/updateAccount',
//   async (account) => {
//     const { data, error } = await supabase
//       .from('accounts')
//       .update({ name: account.name, balance: account.balance })
//       .eq('id', account.id)
//       .single();
//     if (error) throw error;
//     return data as Account;
//   }
// );
