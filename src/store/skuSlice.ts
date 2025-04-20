import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpWrapper from "../networks/HttpWrapper";
import { SERVER_URL } from "../networks/ServerUrl";

const ADD_NEW_SKU_INITIAL_STATE = {
  addNewSkuLoading: false,
  addNewSkuSuccess: false,
  addNewSkuError: false,
  addNewSkuMessage: "",
  addNewSkuDescription: "",
  addNewSkuData: null,
};

const GET_ALL_SKU_INITIAL_STATE = {
  getAllSkuLoading: false,
  getAllSkuSuccess: false,
  getAllSkuError: false,
  getAllSkuMessage: "",
  getAllSkuDescription: "",
  getAllSkuData: null,
};

export type INITIAL_STATE = {
  getAllSkuLoading: boolean;
  getAllSkuSuccess: boolean;
  getAllSkuError: boolean | null;
  getAllSkuMessage: string | null;
  getAllSkuDescription: string | null;
  getAllSkuData: any | null;
  addNewSkuLoading: boolean;
  addNewSkuSuccess: boolean;
  addNewSkuError: boolean | null;
  addNewSkuMessage: string | null;
  addNewSkuDescription: string | null;
  addNewSkuData: any | null;
};

const initialState = {
  ...GET_ALL_SKU_INITIAL_STATE,
  ...ADD_NEW_SKU_INITIAL_STATE,
};

export const addNewSku = createAsyncThunk(
  "skuSlice/addNewSku",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = new URL(SERVER_URL.SKU.ADD_NEW_SKU);
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSkus = createAsyncThunk(
  "skuSlice/getAllSkus",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = new URL(SERVER_URL.SKU.GET_ALL_SKUS);
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const skuSlice = createSlice({
  name: "skuSlice",
  initialState: initialState,
  reducers: {
    resetAddNewSku: (state) => {
      state.addNewSkuLoading = false;
      state.addNewSkuSuccess = false;
      state.addNewSkuError = false;
      state.addNewSkuMessage = "";
      state.addNewSkuDescription = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSkus.pending, (state, action) => {
        state.getAllSkuLoading = true;
        state.getAllSkuSuccess = false;
        state.getAllSkuError = false;
        state.getAllSkuMessage = "";
        state.getAllSkuDescription = "";
        state.getAllSkuData = null;
      })
      .addCase(getAllSkus.fulfilled, (state, action) => {
        state.getAllSkuLoading = false;
        state.getAllSkuSuccess = true;
        state.getAllSkuError = false;
        state.getAllSkuMessage = action.payload?.message;
        state.getAllSkuDescription = action.payload?.description;
        state.getAllSkuData = action.payload?.data;
      })
      .addCase(getAllSkus.rejected, (state, action) => {
        state.getAllSkuLoading = false;
        state.getAllSkuSuccess = false;
        state.getAllSkuError = true;
        state.getAllSkuMessage = action.payload?.message;
        state.getAllSkuDescription = action.payload?.description;
        state.getAllSkuData = action.payload?.data;
      })
      .addCase(addNewSku.pending, (state, action) => {
        state.addNewSkuLoading = true;
        state.addNewSkuSuccess = false;
        state.addNewSkuError = false;
        state.addNewSkuMessage = "";
        state.addNewSkuDescription = "";
        state.addNewSkuData = null;
      })
      .addCase(addNewSku.fulfilled, (state, action) => {
        state.addNewSkuLoading = false;
        state.addNewSkuSuccess = true;
        state.addNewSkuError = false;
        state.addNewSkuMessage = action.payload?.message;
        state.addNewSkuDescription = action.payload?.description;
        state.addNewSkuData = action.payload?.data;
      })
      .addCase(addNewSku.rejected, (state, action) => {
        state.addNewSkuLoading = false;
        state.addNewSkuSuccess = false;
        state.addNewSkuError = true;
        state.addNewSkuMessage = action.payload?.message;
        state.addNewSkuDescription = action.payload?.description;
        state.addNewSkuData = action.payload?.data;
      });
  },
});

export const { resetAddNewSku } = skuSlice.actions;
export default skuSlice.reducer;
