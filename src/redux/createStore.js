import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import asyncStorage from './middleware/redux-effects-async-storage';
import steps from 'redux-effects-steps';
import reducer from './modules/reducer';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const createStoreWithMiddleware = applyMiddleware(createLogger(), steps)(createStore);

const store = autoRehydrate()(createStoreWithMiddleware)(reducer);
export default () => store;

persistStore(store, { storage: AsyncStorage });
