import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await axios.post(`/users/signup`, formData);
      token.set(data.token)
      return data;
      
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await axios.post(`/users/login`, formData);
      token.set(data.token)
      return data;
      
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkApi) => {
    try {
      await axios.post(`/users/logout`);
      token.unset()
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userToken = state.auth.token;

      token.set(userToken);
      const { data } = await axios.get(`users/current`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.token;

      if (!token) return false;
    },
  }
);



const initialState = {
  userData: null,
  token: null,
  isLoading: false,
  authenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
      extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
         state.isLoading = false;
         state.authenticated = true;
         state.userData = action.payload.user;
         state.token = action.payload.token;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         state.isLoading = false;
         state.authenticated = true;
         state.userData = action.payload.user;
         state.token = action.payload.token;
      })
        .addCase(logOut.fulfilled, state => {
        state.authenticated = false;
         state.userData = null;
         state.token = null;
      })
        .addCase(refreshUser.fulfilled, (state, action) => {
         state.isLoading = false;
        state.authenticated = true;
        state.userData = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      
  },

});
export const selectorFilter = state => state.contacts.filter;
export const selectorContacts = state => state.contacts.contacts;
export const selectorError = state => state.contacts.contacts.error;
export const selectorIsLoading = state => state.contacts.contacts.isLoading;
export const selectorUserData = state => state.auth.userData;
export const selectorAuthenticated = state => state.auth.authenticated;

export const authReducer = authSlice.reducer;