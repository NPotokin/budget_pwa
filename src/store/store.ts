// store.ts
import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './accounts/accountsSlice';
import profileReducer from './profile/profileSlice'
import categoriesReducer from './categories/catgoriesSlice'

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    // other reducers...
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
