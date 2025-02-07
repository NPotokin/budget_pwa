import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { Profile } from './profileSlice';

export const fetchProfile = createAsyncThunk< Profile, void, { rejectValue: string }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error; 

      const { email, first_name, last_name } = data.user.user_metadata;
      return { email, first_name, last_name };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);


