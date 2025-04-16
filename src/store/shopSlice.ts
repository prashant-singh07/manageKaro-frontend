import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HttpWrapper from '../networks/HttpWrapper';
import {SERVER_URL} from '../networks/ServerUrl';

export type INITIAL_STATE = {
  shopLoading: boolean;
  shopSuccess: boolean;
  shopError: boolean | null;
  shopMessage: string | null;
  shopDescription: string | null;
  shopData: any | null;
};

const initialState = {
  shopLoading: false,
  shopSuccess: false,
  shopError: false,
  shopMessage: '',
  shopDescription: '',
  shopData: null,
};

export const updateShop = createAsyncThunk(
  'shopSlice/updateShop',
  async (apiPayload: any, {fulfillWithValue, rejectWithValue}) => {
    const url = new URL(SERVER_URL.PROFILE.UPDATE_PROFILE);
    // url.searchParams
    try {
      const response = await HttpWrapper.POST(
        SERVER_URL.SHOP.UPDATE_SHOP,
        apiPayload,
      );
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const shopSlice = createSlice({
  name: 'shopSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateShop.pending, (state, action) => {
        state.shopLoading = true;
        state.shopSuccess = false;
        state.shopError = false;
        state.shopMessage = '';
        state.shopDescription = '';
        state.shopData = null;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.shopLoading = false;
        state.shopSuccess = true;
        state.shopError = false;
        state.shopMessage = action.payload?.message;
        state.shopDescription = action.payload?.description;
        state.shopData = action.payload?.data;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.shopLoading = false;
        state.shopSuccess = false;
        state.shopError = true;
        state.shopMessage = action.payload?.message;
        state.shopDescription = action.payload?.description;
        state.shopData = action.payload?.data;
      });
  },
});

export const {} = shopSlice.actions;
export default shopSlice.reducer;
