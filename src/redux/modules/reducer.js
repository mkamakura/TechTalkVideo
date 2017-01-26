import { combineReducers} from 'redux';
import filter from './filter';
import bookmark from './bookmark';

export default combineReducers({
  filter,
  bookmark,
});
