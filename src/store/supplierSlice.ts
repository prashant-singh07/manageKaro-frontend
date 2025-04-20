import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpWrapper from "../networks/HttpWrapper";
import { SERVER_URL } from "../networks/ServerUrl";

const ADD_NEW_SUPPLIER_INITIAL_STATE = {
  addNewSupplierLoading: false,
  addNewSupplierSuccess: false,
  addNewSupplierError: false,
  addNewSupplierMessage: "",
  addNewSupplierDescription: "",
  addNewSupplierData: null,
};

const GET_ALL_SUPPLIERS_INITIAL_STATE = {
  getAllSuppliersLoading: false,
  getAllSuppliersSuccess: false,
  getAllSuppliersError: false,
  getAllSuppliersMessage: "",
  getAllSuppliersDescription: "",
  getAllSuppliersData: null,
};

export type INITIAL_STATE = {
  getAllSuppliersLoading: boolean;
  getAllSuppliersSuccess: boolean;
  getAllSuppliersError: boolean | null;
  getAllSuppliersMessage: string | null;
  getAllSuppliersDescription: string | null;
  getAllSuppliersData: any | null;
  addNewSupplierLoading: boolean;
  addNewSupplierSuccess: boolean;
  addNewSupplierError: boolean | null;
  addNewSupplierMessage: string | null;
  addNewSupplierDescription: string | null;
  addNewSupplierData: any | null;
};

const initialState = {
  ...GET_ALL_SUPPLIERS_INITIAL_STATE,
  ...ADD_NEW_SUPPLIER_INITIAL_STATE,
};

export const addNewSupplier = createAsyncThunk(
  "supplierSlice/addNewSupplier",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = new URL(SERVER_URL.SUPPLIER.ADD_NEW_SUPPLIER);
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSuppliers = createAsyncThunk(
  "supplierSlice/getAllSuppliers",
  async (apiPayload: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = new URL(SERVER_URL.SUPPLIER.GET_ALL_SUPPLIERS);
      const response = await HttpWrapper.POST(url.href, apiPayload);
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplierSlice",
  initialState: initialState,
  reducers: {
    resetAddNewSupplier: (state) => {
      state.addNewSupplierLoading = false;
      state.addNewSupplierSuccess = false;
      state.addNewSupplierError = false;
      state.addNewSupplierMessage = "";
      state.addNewSupplierDescription = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSuppliers.pending, (state, action) => {
        state.getAllSuppliersLoading = true;
        state.getAllSuppliersSuccess = false;
        state.getAllSuppliersError = false;
        state.getAllSuppliersMessage = "";
        state.getAllSuppliersDescription = "";
        state.getAllSuppliersData = null;
      })
      .addCase(getAllSuppliers.fulfilled, (state, action) => {
        state.getAllSuppliersLoading = false;
        state.getAllSuppliersSuccess = true;
        state.getAllSuppliersError = false;
        state.getAllSuppliersMessage = action.payload?.message;
        state.getAllSuppliersDescription = action.payload?.description;
        state.getAllSuppliersData = action.payload?.data;
      })
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.getAllSuppliersLoading = false;
        state.getAllSuppliersSuccess = false;
        state.getAllSuppliersError = true;
        state.getAllSuppliersMessage = action.payload?.message;
        state.getAllSuppliersDescription = action.payload?.description;
        state.getAllSuppliersData = action.payload?.data;
      })
      .addCase(addNewSupplier.pending, (state, action) => {
        state.addNewSupplierLoading = true;
        state.addNewSupplierSuccess = false;
        state.addNewSupplierError = false;
        state.addNewSupplierMessage = "";
        state.addNewSupplierDescription = "";
        state.addNewSupplierData = null;
      })
      .addCase(addNewSupplier.fulfilled, (state, action) => {
        state.addNewSupplierLoading = false;
        state.addNewSupplierSuccess = true;
        state.addNewSupplierError = false;
        state.addNewSupplierMessage = action.payload?.message;
        state.addNewSupplierDescription = action.payload?.description;
        state.addNewSupplierData = action.payload?.data;
      })
      .addCase(addNewSupplier.rejected, (state, action) => {
        state.addNewSupplierLoading = false;
        state.addNewSupplierSuccess = false;
        state.addNewSupplierError = true;
        state.addNewSupplierMessage = action.payload?.message;
        state.addNewSupplierDescription = action.payload?.description;
        state.addNewSupplierData = action.payload?.data;
      });
  },
});

export const { resetAddNewSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;
