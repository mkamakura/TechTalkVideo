import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from './modules/reducer';

const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
export default () => createStoreWithMiddleware(reducer);
