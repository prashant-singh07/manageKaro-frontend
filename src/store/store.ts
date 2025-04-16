import {configureStore} from '@reduxjs/toolkit';
import sampleReducer from './sampleSlice';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import shopReducer from './shopSlice';

export const store = configureStore({
  reducer: {
    //   posts: postsReducer,
    //   comments: commentsReducer,
    //   users: usersReducer,
    sample: sampleReducer,
    auth: authReducer,
    profile: profileReducer,
    shop: shopReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
