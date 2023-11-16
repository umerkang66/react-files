import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const useAppDispatch: () => AppDispatch = useDispatch;
