import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpWrapper from "../networks/HttpWrapper";
import { SERVER_URL } from "../networks/ServerUrl";

const CREATE_PURCHASE_ORDER_INITIAL_STATE = {
  createPurchaseOrderLoading: false,
  createPurchaseOrderSuccess: false,
  createPurchaseOrderError: false,
  createPurchaseOrderMessage: "",
  createPurchaseOrderDescription: "",
  createPurchaseOrderData: null,
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
  ...CREATE_PURCHASE_ORDER_INITIAL_STATE,
};

export const createPurchaseOrder = createAsyncThunk(
  "purchaseSlice/createPurchaseOrder",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    const url = new URL(SERVER_URL.PURCHASE.CREATE_PURCHASE_ORDER);
    // url.searchParams
    try {
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const purchaseSlice = createSlice({
  name: "purchaseSlice",
  initialState: initialState,
  reducers: {
    resetCreatePurchaseOrder: (state) => {
      state.createPurchaseOrderLoading = false;
      state.createPurchaseOrderSuccess = false;
      state.createPurchaseOrderError = false;
      state.createPurchaseOrderMessage = "";
      state.createPurchaseOrderDescription = "";
      state.createPurchaseOrderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchaseOrder.pending, (state, action) => {
        state.createPurchaseOrderLoading = true;
        state.createPurchaseOrderSuccess = false;
        state.createPurchaseOrderError = false;
        state.createPurchaseOrderMessage = "";
        state.createPurchaseOrderDescription = "";
        state.createPurchaseOrderData = null;
      })
      .addCase(createPurchaseOrder.fulfilled, (state, action) => {
        state.createPurchaseOrderLoading = false;
        state.createPurchaseOrderSuccess = true;
        state.createPurchaseOrderError = false;
        state.createPurchaseOrderMessage = action.payload?.message;
        state.createPurchaseOrderDescription = action.payload?.description;
        state.createPurchaseOrderData = action.payload?.data;
      })
      .addCase(createPurchaseOrder.rejected, (state, action) => {
        state.createPurchaseOrderLoading = false;
        state.createPurchaseOrderSuccess = false;
        state.createPurchaseOrderError = true;
        state.createPurchaseOrderMessage = action.payload?.message;
        state.createPurchaseOrderDescription = action.payload?.description;
        state.createPurchaseOrderData = action.payload?.data;
      });
  },
});

export const { resetCreatePurchaseOrder } = purchaseSlice.actions;
export default purchaseSlice.reducer;
