// store.ts
import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './accounts/accountsSlice';
import profileReducer from './profile/profileSlice'

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    profile: profileReducer,
    // other reducers...
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
