import { createSlice } from "@reduxjs/toolkit";

const hospital = createSlice({
  name: "h",
  initialState: {
    Patients: [],
    PatientDetail: {
      Access: false,
      publicAddress: "",
      name: "",
      phone: 0,
      mail: "",
      residentAddress: "",
      treatment: [],
      disease: [],
      treatmentYear: [],
    },
    hospitalDetail: {
      publicAddress: "",
      name: "",
      phone: 0,
      mail: "",
      hospitalAddress: "",
      ReadAccess: [],
      WriteAccess: [],
    },
  },
  reducers: {
    setpatients: (state, actions) => {
      const obj = {
        publicAddress: actions.payload.publicAddress,
        name: actions.payload.name,
        mail: actions.payload.mail,
        phone: actions.payload.phone,
        residentAddress: actions.payload.residentAddress,
        disease: actions.payload.disease,
        treatment: actions.payload.treatment,
        treatmentYear: actions.payload.treatmentYear,
        Access: actions.payload.Access,
      };
      state.Patients.push(obj);
    },

    editpatientdata: (state, actions) => {
      state.Patients.push(actions.payload);
    },
    fetchpatientdata: (state, actions) => {
      actions.payload.map((item) => {
        state.Patients.push(item);
      });
    },

    fetchHospitaldata: (state, actions) => {
      state.hospitalDetail = {
        publicAddress: actions.payload.publicAddress,
        name: actions.payload.name,
        phone: actions.payload.phone,
        mail: actions.payload.mail,
        hospitalAddress: actions.payload.hospitalAddress,
        ReadAccess: actions.payload.ReadAccess,
        WriteAccess: actions.payload.WriteAccess,
      };
    },
  },
});

export const { setpatients, editpatientdata, fetchHospitaldata, fetchpatientdata } =
  hospital.actions;
export default hospital.reducer;
