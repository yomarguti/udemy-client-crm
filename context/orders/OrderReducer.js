import * as ActionTypes from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
