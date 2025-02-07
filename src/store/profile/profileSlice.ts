import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from './profile.Thunk';
import { Tables } from 'database.types';

export type Profile = Omit<Tables<'profiles'>, 'id'>
interface ProfileState {
  profile: Profile
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {
    email:  null,
    first_name: null,
    last_name: null
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.loading = false;
        state.profile.first_name = action.payload.first_name
        state.profile.last_name = action.payload.last_name
        state.profile.email = action.payload.email
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      
  },
});

export default profileSlice.reducer;
