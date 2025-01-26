import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfile } from './profile.Thunk';

interface Profile {
  firstName: string,
  lastName: string,
  email: string,

}

interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
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
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.firstName = action.payload.first_name
        state.profile.lastName = action.payload.last_name
        state.profile.email = action.payload.email
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      
  },
});

export default profileSlice.reducer;
