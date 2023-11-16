import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTasks = () => {
  const { data: tasks, isLoading } = useAppSelector(state => state.tasks);

  return { tasks, isLoading };
};
