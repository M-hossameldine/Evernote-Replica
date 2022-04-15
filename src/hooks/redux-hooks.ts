import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../store/index';

// use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
