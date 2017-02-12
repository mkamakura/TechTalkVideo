import { createAction, handleActions } from 'redux-actions';

const FILTER = 'techtalkvideo/filter/';
const FILTER_ADD = FILTER + 'add';
const FILTER_REMOVE = FILTER + 'remove';
const FILTER_CLEAR = FILTER + 'clear';
const FILTER_INIT = FILTER + 'init';
const FILTER_VISIBLE = FILTER + 'visible';

export const addFilter = createAction(FILTER_ADD, (name) => name);
export const removeFilter = createAction(FILTER_REMOVE, (name) => name);
export const clearFilter = createAction(FILTER_CLEAR);
export const initFilter = createAction(FILTER_INIT, (names) => names);
export const visibleFilter = createAction(FILTER_VISIBLE);

const INITIAL_STATE = {
  visible: false,
  tags: [{
    name: '',
    selected: false,
  }],
};

export default handleActions({
  [FILTER_INIT]: (state, { payload: { names } }) => ({
    ...state,
    tags: [{ name: 'Bookmarks', selected: false }, ...names.map((name) => ({ name, selected: false }))],
  }),

  [FILTER_ADD]: (state, { payload: { name } }) => ({
    ...state,
    tags: state.tags.map((tag) => {
      if (tag.name === name) tag.selected = true;
      return tag;
    }),
  }),

  [FILTER_REMOVE]: (state, { payload: { name } }) => ({
    ...state,
    tags: state.tags.filter((tag) => {
      if (tag.name === name) tag.selected = false;
      return tag;
    }),
  }),

  [FILTER_CLEAR]: (state) => ({
    ...state,
    tags: state.tags.map((tag) => {
      tag.selected = false;
      return tag;
    }),
  }),

  [FILTER_VISIBLE]: (state) => ({
    ...state,
    visible: !state.visible,
  }),

}, INITIAL_STATE);
