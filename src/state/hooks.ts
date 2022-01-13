import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use instead of plain `useDispatch` and `useSelector`
// so dispatch can accept thunks which aren't plain action objects
export const useAppDispatch = () => useDispatch<AppDispatch>();
// so selectors always know the state is 'RootState'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
