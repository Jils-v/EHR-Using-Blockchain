import { createSlice } from "@reduxjs/toolkit";

const adm = createSlice({
  name: "adam",
  initialState: {
    Hospitals: [],
  },
  reducers: {
    sethospitaldata: (state, actions) => {
      state.Hospitals.push(actions.payload);
    },
    fetchhospitaldata: (state, actions) => {
      actions.payload.map((item) => {
        state.Hospitals.push(item);
      });
    },
  },
});

export const { sethospitaldata, fetchhospitaldata, setopen } = adm.actions;
export default adm.reducer;
