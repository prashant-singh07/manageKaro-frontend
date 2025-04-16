import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HttpWrapper from '../networks/HttpWrapper';
import {SERVER_URL} from '../networks/ServerUrl';

export type INITIAL_STATE = {
  profileLoading: boolean;
  profileSuccess: boolean;
  profileError: boolean | null;
  profileMessage: string | null;
  profileDescription: string | null;
  profileData: any | null;
};

const initialState = {
  profileLoading: false,
  profileSuccess: false,
  profileError: false,
  profileMessage: '',
  profileDescription: '',
  profileData: null,
};

export const updateProfile = createAsyncThunk(
  'profileSlice/updateProfile',
  async (apiPayload: any, {fulfillWithValue, rejectWithValue}) => {
    const url = new URL(SERVER_URL.PROFILE.UPDATE_PROFILE);
    // url.searchParams
    try {
      const response = await HttpWrapper.POST(
        SERVER_URL.PROFILE.UPDATE_PROFILE,
        apiPayload,
      );
      return fulfillWithValue(response);
    } catch (profileError) {
      return rejectWithValue(profileError);
    }
  },
);

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateProfile.pending, (state, action) => {
        state.profileLoading = true;
        state.profileSuccess = false;
        state.profileError = false;
        state.profileMessage = '';
        state.profileDescription = '';
        state.profileData = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileSuccess = true;
        state.profileError = false;
        state.profileMessage = action.payload?.message;
        state.profileDescription = action.payload?.description;
        state.profileData = action.payload?.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileSuccess = false;
        state.profileError = true;
        state.profileMessage = action.payload?.message;
        state.profileDescription = action.payload?.description;
        state.profileData = action.payload?.data;
      });
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
