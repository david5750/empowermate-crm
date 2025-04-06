
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  crm_type: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  selectedCrmType: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  selectedCrmType: localStorage.getItem('selectedCrmType') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    },
    setSelectedCrmType: (state, action: PayloadAction<string | null>) => {
      state.selectedCrmType = action.payload;
      if (action.payload) {
        localStorage.setItem('selectedCrmType', action.payload);
      } else {
        localStorage.removeItem('selectedCrmType');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(payload.user));
        localStorage.setItem('token', payload.token);
        localStorage.setItem('isLoggedIn', 'true');
      }
    );
  },
});

export const { setCredentials, logout, setSelectedCrmType } = authSlice.actions;
export default authSlice.reducer;
