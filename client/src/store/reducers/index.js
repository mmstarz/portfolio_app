import { combineReducers } from "redux";
// @ORIGINAL
import alertReducer from "./alertReducer";
import authReducer from './authReducer';
import postReducer from './postReducer';
// @REWORKED
import updProfileReducer from './updProfileReducer';

// @REWORKED
const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,  
  site: updProfileReducer,
  stuff: postReducer
});

export default rootReducer;
