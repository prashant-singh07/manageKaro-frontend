import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpWrapper from "../networks/HttpWrapper";
import { SERVER_URL } from "../networks/ServerUrl";

const CREATE_SALES_ORDER_INITIAL_STATE = {
  createSalesOrderLoading: false,
  createSalesOrderSuccess: false,
  createSalesOrderError: false,
  createSalesOrderMessage: "",
  createSalesOrderDescription: "",
  createSalesOrderData: null,
};

const GET_SALES_ORDER_INITIAL_STATE = {
  getSalesOrderLoading: false,
  getSalesOrderSuccess: false,
  getSalesOrderError: false,
  getSalesOrderMessage: "",
  getSalesOrderDescription: "",
  getSalesOrderData: null,
};

const initialState = {
  ...CREATE_SALES_ORDER_INITIAL_STATE,
  ...GET_SALES_ORDER_INITIAL_STATE,
};

export const createSalesOrder = createAsyncThunk(
  "salesSlice/createSalesOrder",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    const url = new URL(SERVER_URL.SALES.CREATE_SALES_OREDER);
    try {
      console.log("url.href", url.href);
      console.log("apiPayload", apiPayload);

      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSales = createAsyncThunk(
  "salesSlice/getAllSales",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    const url = new URL(SERVER_URL.SALES.GET_ALL_SALES_ORDER);
    try {
      console.log("url.href", url.href);
      console.log("apiPayload", apiPayload);

      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const salesSlice = createSlice({
  name: "salesSlice",
  initialState: initialState,
  reducers: {
    resetCreateSaleOrder: (state) => {
      state.createSalesOrderLoading = false;
      state.createSalesOrderSuccess = false;
      state.createSalesOrderError = false;
      // state.createSalesOrderMessage = "";
      // state.createSalesOrderDescription = "";
      // state.createSalesOrderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSalesOrder.pending, (state, action) => {
        state.createSalesOrderLoading = true;
        state.createSalesOrderSuccess = false;
        state.createSalesOrderError = false;
        state.createSalesOrderMessage = "";
        state.createSalesOrderDescription = "";
        state.createSalesOrderData = null;
      })
      .addCase(createSalesOrder.fulfilled, (state, action) => {
        state.createSalesOrderLoading = false;
        state.createSalesOrderSuccess = true;
        state.createSalesOrderError = false;
        state.createSalesOrderMessage = action.payload?.message;
        state.createSalesOrderDescription = action.payload?.description;
        state.createSalesOrderData = action.payload?.data;
      })
      .addCase(createSalesOrder.rejected, (state, action) => {
        state.createSalesOrderLoading = false;
        state.createSalesOrderSuccess = false;
        state.createSalesOrderError = true;
        state.createSalesOrderMessage = action.payload?.message;
        state.createSalesOrderDescription = action.payload?.description;
        state.createSalesOrderData = action.payload?.data;
      })

      .addCase(getAllSales.pending, (state, action) => {
        state.getSalesOrderLoading = true;
        state.getSalesOrderSuccess = false;
        state.getSalesOrderError = false;
        state.getSalesOrderMessage = "";
        state.getSalesOrderDescription = "";
        state.getSalesOrderData = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.getSalesOrderLoading = false;
        state.getSalesOrderSuccess = true;
        state.getSalesOrderError = false;
        state.getSalesOrderMessage = action.payload?.message;
        state.getSalesOrderDescription = action.payload?.description;
        state.getSalesOrderData = action.payload?.data;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.getSalesOrderLoading = false;
        state.getSalesOrderSuccess = false;
        state.getSalesOrderError = true;
        state.getSalesOrderMessage = action.payload?.message;
        state.getSalesOrderDescription = action.payload?.description;
        state.getSalesOrderData = action.payload?.data;
      });
  },
});

export const {
  // resetCreatePurchaseOrder,
  // resetgetSalesOrder,
  // resetgetSalesOrderDetails,
  resetCreateSaleOrder,
} = salesSlice.actions;
export default salesSlice.reducer;
