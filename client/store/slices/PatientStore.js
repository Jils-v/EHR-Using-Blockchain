import { createSlice } from "@reduxjs/toolkit";

const patient = createSlice({
  name: "p",
  initialState: {
    userPersonalDetail: {
      publicAddress: "",
      name: "",
      phone: 0,
      mail: "",
      residentAddress: "",
      treatment: [],
      disease: [],
      treatmentYear: [],
      ReadAccess: [],
      WriteAccess: [],
    },
  },
  reducers: {
    setuserdata: (state, actions) => {
      state.userPersonalDetail = {
        publicAddress: actions.payload.publicAddress,
        name: actions.payload.name,
        mail: actions.payload.mail,
        phone: actions.payload.phone,
        residentAddress: actions.payload.residentAddress,
        ReadAccess: actions.payload.ReadAccess,
        WriteAccess: actions.payload.WriteAccess,
        disease: actions.payload.disease,
        treatment: actions.payload.treatment,
        treatmentYear: actions.payload.treatmentYear,
      };
      console.log(state.userPersonalDetail);
    },
    fetchuserdata: (state, actions) => {
      state.userPersonalDetail = {
        publicAddress: actions.payload.publicAddress,
        name: actions.payload.name,
        mail: actions.payload.mail,
        phone: actions.payload.phone,
        residentAddress: actions.payload.residentAddress,
        ReadAccess: [],
        WriteAccess: [],
        disease: [],
        treatment: [],
        treatmentYear: [],
      };
    },
    setReadAccess: (state, actions) => {
      state.userPersonalDetail.ReadAccess.push(actions.payload);
    },
    setWriteAccess: (state, actions) => {
      state.userPersonalDetail.WriteAccess.push(actions.payload);
    },
    removeReadAccess: (state, actions) => {
      state.userPersonalDetail.ReadAccess.splice(
        state.userPersonalDetail.ReadAccess.indexOf(actions.payload),
        1
      );
    },
    removeWriteAccess: (state, actions) => {
      state.userPersonalDetail.WriteAccess.splice(
        state.userPersonalDetail.WriteAccess.indexOf(actions.payload),
        1
      );
    },
  },
});

export const {
  setuserdata,
  setReadAccess,
  fetchuserdata,
  setWriteAccess,
  removeReadAccess,
  removeWriteAccess,
} = patient.actions;
export default patient.reducer;
