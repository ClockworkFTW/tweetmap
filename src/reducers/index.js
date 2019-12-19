import { combineReducers } from "redux";

import tweetsReducer from "./tweetsReducer";
import viewportReducer from "./viewportReducer";
import focusReducer from "./focusReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
	tweets: tweetsReducer,
	viewport: viewportReducer,
	focus: focusReducer,
	filter: filterReducer
});

export default rootReducer;
