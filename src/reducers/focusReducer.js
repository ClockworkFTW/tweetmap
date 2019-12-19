const SET_FOCUS = "SET_FOCUS";

export const setFocus = id => ({ type: SET_FOCUS, id });

const focusReducer = (state = null, action) => {
	switch (action.type) {
		case SET_FOCUS:
			return action.id;
		default:
			return state;
	}
};

export default focusReducer;
