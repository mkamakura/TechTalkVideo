import { createAction, handleActions } from 'redux-actions';

const FILTER = 'techtalkvideo/filter/';
const FILTER_ADD = FILTER + 'add';
const FILTER_REMOVE = FILTER + 'remove';

export const filterAdd = createAction(FILTER_ADD, (name) => name);
export const filterRemove = createAction(FILTER_REMOVE, (name) => name);

const INITIAL_STATE = {
  items: [],
};

export default handleActions({
  [FILTER_ADD]: (state, { payload: { name }}) => console.log('filer-add', name) || ({
    items: [ ...state.items, name],
  }),

  [FILTER_REMOVE]: (state, { payload: { name }}) => ({
    items: state.items.filter((item) => item !== name),
  }),

}, INITIAL_STATE);
