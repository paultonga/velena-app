import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import logger from 'redux-logger';
import UserReducer from './user/reducer';
import UserSagas from './user/sagas';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  account: UserReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
 
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = applyMiddleware(sagaMiddleware, logger);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store, null, () => {});

const sagas = function* () {
  yield all([...UserSagas]);
};

sagaMiddleware.run(sagas);
