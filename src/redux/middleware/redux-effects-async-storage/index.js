import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

/*
 * Action types
 */
export const EFFECT_ASYNC_STORAGE = 'EFFECT_ASYNC_STORAGE';

/*
 * Action creators
 */
const createAsyncStorageAction = createAction(EFFECT_ASYNC_STORAGE);

export const getItem = (key) => createAsyncStorageAction({ type: 'getItem', key });

export const setItem = (key, value) => createAsyncStorageAction({ type: 'setItem', key, value });

export const removeItem = (key) => createAsyncStorageAction({ type: 'removeItem', key } );

export const mergeItem = (key, value) => createAsyncStorageAction({ type: 'mergeItem', key, value });

export const clear = (key) => createAsyncStorageAction({ type: 'clear', key });

export const getAllKeys = () => createAsyncStorageAction({ type: 'getAllKeys' });

export const multiGet = (keys) => createAsyncStorageAction({ type: 'multiGet'}, keys);

export const multiSet = (keyValuePairs) => createAsyncStorageAction({ type: 'multiSet', keyValuePairs });

export const multiRemove = (keys) => createAsyncStorageAction({ type: 'multiRemove', keys});

export const multiMerge = (keyValuePairs) => createAsyncStorageAction({ type: 'multiMerge', keyValuePairs });


/*
 * Middleware
 */
export default function asyncStorageMiddleware() {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== EFFECT_ASYNC_STORAGE) {
      return next(action);
    }

    const { type, key, value } = action.payload;

    console.log('value', value);
    console.log('type', type);

    switch (type) {
      case 'getItem':
        return AsyncStorage.getItem(key);
      case 'setItem':
        return AsyncStorage.setItem(key, value);
      case 'removeItem':
        return AsyncStorage.removeItem(key);
      case 'mergeItem':
        return console.log(key, value) || AsyncStorage.mergeItem(key, value.name);
      case 'clear':
        return AsyncStorage.clear();
      case 'getAllKeys':
        return AsyncStorage.getAllKeys();
      case 'multiGet':
        return AsyncStorage.multiGet({ key: value });
      case 'multiSet':
        return AsyncStorage.multiSet({ key: value });
      case 'multiRemove':
        return AsyncStorage.multiRemove({ key: value });
      case 'multiMerge':
        return AsyncStorage.multiMerge({ key: value });
      default:
        throw new Error('redux-effects-async-storage unknown action type');
    }
  };
}