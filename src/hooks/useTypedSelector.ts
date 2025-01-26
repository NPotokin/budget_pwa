// hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Create a typed version of the useSelector hook
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
