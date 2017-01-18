import { createAction, handleActions } from 'redux-actions';

const FILTER = 'techtalkvideo/filter/';
const FILTER_ADD = FILTER + 'add';
const FILTER_REMOVE = FILTER + 'remove';
const FILTER_CLEAR = FILTER + 'clear';
const FILTER_VISIBLE = FILTER + 'visible';

export const addFilter = createAction(FILTER_ADD, (name) => name);
export const removeFilter = createAction(FILTER_REMOVE, (name) => name);
export const clearFilter = createAction(FILTER_CLEAR);
export const visibleFilter = createAction(FILTER_VISIBLE);

const INITIAL_STATE = {
  visible: false,
  master: [],
  selected: [],
};

export default handleActions({
  [FILTER_ADD]: (state, { payload: { name } }) => console.log('filer-add', name) || ({
    ...state,
    selected: [...state.selected, name],
  }),

  [FILTER_REMOVE]: (state, { payload: { name } }) => ({
    ...state,
    selected: state.selected.filter((item) => item !== name),
  }),

  [FILTER_CLEAR]: (state) => ({
    ...state,
    selected: INITIAL_STATE.selected,
  }),

  [FILTER_VISIBLE]: (state) => ({
    ...state,
    visible: !state.visible,
  }),

}, INITIAL_STATE);
