
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, User, DecodedToken } from '../apis/authApi';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  selectedCrmType: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  selectedCrmType: localStorage.getItem('selectedCrmType') || null,
};

interface SetCredentialsPayload {
  user?: User;
  decodedToken?: DecodedToken;
  token: string;
  refreshToken?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user, decodedToken, token, refreshToken } = action.payload;
      
      // Determine user data from either direct user object or decoded token
      if (user) {
        state.user = user;
      } else if (decodedToken) {
        // Create user object from decoded token
        state.user = {
          id: decodedToken.id,
          email: decodedToken.email,
          first_name: decodedToken.first_name || decodedToken.name?.split(' ')[0] || '',
          last_name: decodedToken.last_name || decodedToken.name?.split(' ')[1] || '',
          crm_type: decodedToken.crm_type
        };
      }
      
      state.token = token;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;
      
      // Save to localStorage
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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
        if (payload.user && (payload.token || payload.access_token)) {
          const token = payload.token || payload.access_token;
          const refreshToken = payload.refreshToken || payload.refresh_token;
          
          if (token) {
            state.user = payload.user;
            state.token = token;
            if (refreshToken) {
              state.refreshToken = refreshToken;
              localStorage.setItem('refreshToken', refreshToken);
            }
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(payload.user));
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', 'true');
          }
        }
      }
    );
  },
});

export const { setCredentials, logout, setSelectedCrmType } = authSlice.actions;
export default authSlice.reducer;
