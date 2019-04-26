import {ADD_TAG} from "../actions/action-types";

const initialState = {
  tag: ''
};

export default function rootReducer(state = initialState, action) {

  if (action.type === ADD_TAG) {
    state.tag = action.payload.tag;
    return state;
  }

  return state;
}