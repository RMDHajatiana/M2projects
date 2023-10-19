import { combineReducers } from "redux";
import selectionReducer from "./SelectionReducer";

 const rootReducer = combineReducers ({
    
    menu: selectionReducer,
})

export default rootReducer