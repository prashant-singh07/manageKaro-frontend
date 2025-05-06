import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from "./sampleSlice";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import shopReducer from "./shopSlice";
import supplierReducer from "./supplierSlice";
import skuReducer from "./skuSlice";
import purchaseReducer from "./purchaseSlice";
import salesReducer from "./saleSlice";

export const store = configureStore({
  reducer: {
    //   posts: postsReducer,
    //   comments: commentsReducer,
    //   users: usersReducer,
    sample: sampleReducer,
    auth: authReducer,
    profile: profileReducer,
    shop: shopReducer,
    supplier: supplierReducer,
    sku: skuReducer,
    purchase: purchaseReducer,
    sales: salesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
