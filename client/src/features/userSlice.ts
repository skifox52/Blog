import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { userInterface } from "../types/modelType"

const user: userInterface = JSON.parse(localStorage.getItem("User")!)
const initialState: userInterface = {
  _id: user?._id || null,
  accessToken: user?.accessToken || null,
  refreshToken: user?.refreshToken || null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userInterface>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state._id = action.payload._id
      localStorage.setItem(
        "User",
        JSON.stringify({
          _id: action.payload._id,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        })
      )
    },
  },
})
export const { setUser } = userSlice.actions
export default userSlice.reducer
