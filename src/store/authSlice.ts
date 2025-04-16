import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HttpWrapper from '../networks/HttpWrapper';
import {SERVER_URL} from '../networks/ServerUrl';

export type LoginResponse = {
  is_profile_complete: boolean;
  is_shop_linked: boolean;
  mobile: string;
  email_id: string;
  name: string;
  gender: string;
  dob: string;
  address: string;
  role: string;
  gst_number: string;
  profile_image: string;
  shop_id: string;
};

export type INITIAL_STATE = {
  loading: boolean;
  success: boolean;
  error: boolean | null;
  message: string | null;
  description: string | null;
  data: any | null;
};

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: '',
  description: '',
  data: null,
};

export const onLogin = createAsyncThunk(
  'authSlice/onLogin',
  async (apiPayload: any, {fulfillWithValue, rejectWithValue}) => {
    const url = new URL(SERVER_URL.AUTH.LOGIN);
    // url.searchParams
    try {
      const response = await HttpWrapper.POST(
        SERVER_URL.AUTH.LOGIN,
        apiPayload,
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const onRegister = createAsyncThunk(
  'authSlice/onRegister',
  async (apiPayload: any, {fulfillWithValue, rejectWithValue}) => {
    const url = new URL(SERVER_URL.AUTH.REGISTER);
    try {
      const response = await HttpWrapper.POST(
        SERVER_URL.AUTH.REGISTER,
        apiPayload,
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(onLogin.pending, (state, action) => {
        // state.success = false;
        // state.error = false;
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = '';
        state.description = '';
        state.data = null;
      })
      .addCase(onLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload?.message;
        state.description = action.payload?.description;
        state.data = action.payload?.data;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.message;
        state.description = action.payload?.description;
        state.data = action.payload?.data;
      })
      .addCase(onRegister.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = '';
        state.description = '';
        state.data = null;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload?.message;
        state.description = action.payload?.description;
        state.data = action.payload?.data;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload?.message;
        state.description = action.payload?.description;
        state.data = action.payload?.data;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
