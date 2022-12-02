import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import loaderReducer from '../features/loader/loaderSlice';
import boardListReducer from '../features/boardList/boardListSlice';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    boardlist: boardListReducer,
    board: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
