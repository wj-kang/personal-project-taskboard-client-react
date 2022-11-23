import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  email: string;
  type: string;
}

const initialState: UserState = {
  id: '',
  email: '',
  type: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.type = action.payload.type;
    },
    logout: (state) => {
      state.id = '';
      state.email = '';
      state.type = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
