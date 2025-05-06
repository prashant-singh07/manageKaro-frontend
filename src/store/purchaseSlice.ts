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

const GET_PURCHASE_ORDER_INITIAL_STATE = {
  getPurchaseOrderLoading: false,
  getPurchaseOrderSuccess: false,
  getPurchaseOrderError: false,
  getPurchaseOrderMessage: "",
  getPurchaseOrderDescription: "",
  getPurchaseOrderData: null,
};

const GET_PURCHASE_ORDER_DETAILS_INITIAL_STATE = {
  getPurchaseOrderDetailsLoading: false,
  getPurchaseOrderDetailsSuccess: false,
  getPurchaseOrderDetailsError: false,
  getPurchaseOrderDetailsMessage: "",
  getPurchaseOrderDetailsDescription: "",
  getPurchaseOrderDetailsData: null,
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
  ...GET_PURCHASE_ORDER_INITIAL_STATE,
  ...GET_PURCHASE_ORDER_DETAILS_INITIAL_STATE,
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

export const getPurchaseOrder = createAsyncThunk(
  "purchaseSlice/getPurchaseOrder",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    const url = new URL(SERVER_URL.PURCHASE.GET_PURCHASE_ORDER);
    try {
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPurchaseOrderDetails = createAsyncThunk(
  "purchaseSlice/getPurchaseOrderDetails",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    const url = new URL(SERVER_URL.PURCHASE.GET_PURCHASE_ORDER_DETAILS);
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
    resetGetPurchaseOrder: (state) => {
      state.getPurchaseOrderLoading = false;
      state.getPurchaseOrderSuccess = false;
      state.getPurchaseOrderError = false;
      state.getPurchaseOrderMessage = "";
      state.getPurchaseOrderDescription = "";
      state.getPurchaseOrderData = null;
    },
    resetGetPurchaseOrderDetails: (state) => {
      state.getPurchaseOrderDetailsLoading = false;
      state.getPurchaseOrderDetailsSuccess = false;
      state.getPurchaseOrderDetailsError = false;
      state.getPurchaseOrderDetailsMessage = "";
      state.getPurchaseOrderDetailsDescription = "";
      state.getPurchaseOrderDetailsData = null;
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
      })
      .addCase(getPurchaseOrder.pending, (state, action) => {
        state.getPurchaseOrderLoading = true;
        state.getPurchaseOrderSuccess = false;
        state.getPurchaseOrderError = false;
        state.getPurchaseOrderMessage = "";
        state.getPurchaseOrderDescription = "";
        state.getPurchaseOrderData = null;
      })
      .addCase(getPurchaseOrder.fulfilled, (state, action) => {
        state.getPurchaseOrderLoading = false;
        state.getPurchaseOrderSuccess = true;
        state.getPurchaseOrderError = false;
        state.getPurchaseOrderMessage = action.payload?.message;
        state.getPurchaseOrderDescription = action.payload?.description;
        state.getPurchaseOrderData = action.payload?.data;
      })
      .addCase(getPurchaseOrder.rejected, (state, action) => {
        state.getPurchaseOrderLoading = false;
        state.getPurchaseOrderSuccess = false;
        state.getPurchaseOrderError = true;
        state.getPurchaseOrderMessage = action.payload?.message;
        state.getPurchaseOrderDescription = action.payload?.description;
        state.getPurchaseOrderData = action.payload?.data;
      })
      .addCase(getPurchaseOrderDetails.pending, (state, action) => {
        state.getPurchaseOrderDetailsLoading = true;
        state.getPurchaseOrderDetailsSuccess = false;
        state.getPurchaseOrderDetailsError = false;
        state.getPurchaseOrderDetailsMessage = "";
        state.getPurchaseOrderDetailsDescription = "";
        state.getPurchaseOrderDetailsData = null;
      })
      .addCase(getPurchaseOrderDetails.fulfilled, (state, action) => {
        state.getPurchaseOrderDetailsLoading = false;
        state.getPurchaseOrderDetailsSuccess = true;
        state.getPurchaseOrderDetailsError = false;
        state.getPurchaseOrderDetailsMessage = action.payload?.message;
        state.getPurchaseOrderDetailsDescription = action.payload?.description;
        state.getPurchaseOrderDetailsData = action.payload?.data;
      })
      .addCase(getPurchaseOrderDetails.rejected, (state, action) => {
        state.getPurchaseOrderDetailsLoading = false;
        state.getPurchaseOrderDetailsSuccess = false;
        state.getPurchaseOrderDetailsError = true;
        state.getPurchaseOrderDetailsMessage = action.payload?.message;
        state.getPurchaseOrderDetailsDescription = action.payload?.description;
        state.getPurchaseOrderDetailsData = action.payload?.data;
      });
  },
});

export const {
  resetCreatePurchaseOrder,
  resetGetPurchaseOrder,
  resetGetPurchaseOrderDetails,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
