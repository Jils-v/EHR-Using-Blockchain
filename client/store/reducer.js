import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import gen from "./slices/SimpleStore";
import patient from "./slices/PatientStore";
import hospital from "./slices/HospitalStore";
import adm from "./slices/AdminStore";

const reducer = combineReducers({
  adm: adm,
  hospital: hospital,
  patient: patient,
  gen: gen,
});

const store = configureStore({
  reducer,
});

export default store;
