
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
const userStore = configureStore({
    reducer : {
        user : userReducer
    }
});
export default userStore;