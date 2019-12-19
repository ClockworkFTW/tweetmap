const SET_VIEWPORT = "SET_VIEWPORT";

export const setViewport = viewport => ({
	type: SET_VIEWPORT,
	viewport
});

const INITIAL_STATE = {
	latitude: 25,
	longitude: 0,
	zoom: 1.2
};

const viewportReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_VIEWPORT:
			return action.viewport;
		default:
			return state;
	}
};

export default viewportReducer;
