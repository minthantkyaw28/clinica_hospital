import { configureStore } from "@reduxjs/toolkit";


//Reducers
import authReducer from "./reducers/authReducers";
import registerDoctorReducer from "./reducers/registerDoctorReducers";
import registerPatientReducer from "./reducers/registerPatientReducers";
import includeDoctorReducer from "./reducers/includeDoctorReducers";
import includePatientReducer from "./reducers/includePatientReducers";
import transactionSingleDayReducer from "./reducers/transactionSingleDayReducers";
import transactionSingleMonthReducer from "./reducers/transactionSingleMonthReducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    registerDoctor: registerDoctorReducer,
    registerPatient: registerPatientReducer,
    includeDoctor: includeDoctorReducer,
    includePatient: includePatientReducer,
    transactionSingleDay: transactionSingleDayReducer,
    transactionSingleMonth: transactionSingleMonthReducer,
  },
});

export default store;
