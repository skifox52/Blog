import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import { userApiSlice } from "../api/userApiSlice"
import { postApiSlice } from "../api/postApiSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
  },
  middleware: (getdefaultMiddleware) => {
    return getdefaultMiddleware().concat(
      userApiSlice.middleware,
      postApiSlice.middleware
    )
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
