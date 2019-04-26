import {ADD_TAG} from "./action-types";

// export function addTag(payload) {
//   return { type: ADD_TAG, payload };
// };

const addTag = payload => {
  return { type: ADD_TAG, payload };
};

const actions = {
  addTag: addTag
};

export default actions;
