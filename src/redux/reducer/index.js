import handleCart from "./handleCart";
import productsReducer from "./productsReducer";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  handleCart,
  products: productsReducer,
});
export default rootReducers;
