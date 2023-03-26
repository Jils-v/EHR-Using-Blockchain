import { createSlice } from "@reduxjs/toolkit";

const gen = createSlice({
  name: "store",
  initialState: {
    usertype: "",
    currentAccount: "",
    isConnected: false,
  },
  reducers: {
    setuser: (state, actions) => {
      state.usertype = actions.payload;
    },

    setconnect: (state, actions) => {
      state.isConnected = actions.payload.isconnect;
      state.currentAccount = actions.payload.account;
    },
  },
});

export const { setuser, setconnect } = gen.actions;
export default gen.reducer;
