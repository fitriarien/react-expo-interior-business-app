import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import deactReducer from "./deactReducer";

const reducers = combineReducers({
  isLogin: loginReducer,
  isActive: deactReducer,
})

export default reducers