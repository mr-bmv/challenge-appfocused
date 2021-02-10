import { FETCH_COMPONENT_FAILURE, FETCH_COMPONENT_SUCCESS } from "./actionTypes";

// just two action types enough to manage state for all components
const handlers = {
  [FETCH_COMPONENT_FAILURE]: (state, action) => ({
    ...state, [action.payload.component]: { data: "", loading: false, error: action.payload.error, },
  }),
  [FETCH_COMPONENT_SUCCESS]: (state, action) => ({
    ...state, [action.payload.component]: { data: action.payload.data, loading: false, error: false, },
  }),
  DEFAULT: (state) => state,
};

// simple reducer which works with State
export const AppfocusedReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

