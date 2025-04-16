import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HttpWrapper from '../networks/HttpWrapper';
import {SERVER_URL} from '../networks/ServerUrl';

export type INITIAL_STATE = {
  sampleDataLoading: boolean;
  sampleDataSuccess: boolean;
  sampleDataFailure: undefined | string;
  sampleData: [];
};

const initialState = {
  sampleDataLoading: false,
  sampleDataSuccess: false,
  sampleDataFailure: undefined,
  sampleData: [],
};

export const getSampleData = createAsyncThunk(
  'sampleSlice/getSampleData',
  async (_, {fulfillWithValue, rejectWithValue}) => {
    const url = new URL(SERVER_URL.PRODUCT.GET_PRODUCT);
    // url.searchParams
    try {
      const response = await HttpWrapper.GET(url.href);
      return fulfillWithValue(response);
    } catch (error) {
      let _error;
      if (error instanceof Error) {
        _error = error.message;
        console.log('error of url ', url.href, ' -> ', error.message);
      } else {
        _error = error;
        console.log('error of url ', url.href, ' -> ', error);
      }
      return rejectWithValue(_error);
    }
  },
);

const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSampleData.pending, (state, action) => {
        state.sampleDataLoading = true;
      })
      .addCase(getSampleData.fulfilled, (state, action) => {
        state.sampleDataLoading = false;
        state.sampleDataSuccess = true;
        state.sampleData = action.payload;
      })
      .addCase(getSampleData.rejected, (state, action) => {
        state.sampleDataLoading = false;
        state.sampleDataFailure = action.payload;
      });
  },
});

export const {} = sampleSlice.actions;
export default sampleSlice.reducer;
