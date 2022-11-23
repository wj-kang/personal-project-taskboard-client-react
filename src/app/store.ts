import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import counterReducer from '../features/counter/counterSlice';
import boardListReducer from '../features/boardList/boardListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    boardlist: boardListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
