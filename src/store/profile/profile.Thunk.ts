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


