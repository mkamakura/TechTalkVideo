import { createAction, handleActions } from 'redux-actions';
import { steps } from 'redux-effects-steps';
import { getItem, mergeItem } from '../middleware/redux-effects-async-storage';

const BOOKMARK = 'techtalkvideo/bookmark/';
const BOOKMARK_ADD = BOOKMARK + 'add';
const BOOKMARK_ADD_SUCCESS = BOOKMARK_ADD + '/success';
const BOOKMARK_ADD_FAIL = BOOKMARK_ADD + '/fail';

const BOOKMARK_REMOVE = BOOKMARK + 'remove';
const BOOKMARK_INIT = BOOKMARK + 'init';

export const addBookmark = createAction(BOOKMARK_ADD, (name) => name);
export const addBookmarkSuccess = createAction(BOOKMARK_ADD_SUCCESS);
export const addBookmarkFail = createAction(BOOKMARK_ADD_FAIL);
export const removeBookmark = createAction(BOOKMARK_REMOVE, (name) => name);
export const initBookmark = createAction(BOOKMARK_INIT);

export function onAddBookmark(name) {
  return steps(
    addBookmark(name),
    mergeItem(BOOKMARK, name),
    [addBookmarkSuccess(name), addBookmarkFail],
  );
}

const INITIAL_STATE = {
  items: [],
};

export default handleActions({
  [BOOKMARK_INIT]: (state) => ({
    ...state,
  }),

  [BOOKMARK_ADD]: (state, { payload: { name } }) => console.log('async storage success') || ({
    ...state,
    items: [...state.items, name],
  }),

  [BOOKMARK_ADD_FAIL]: (state, { payload: { name } }) => console.log('async storage fail') || ({
    ...state,
  }),

}, INITIAL_STATE);
