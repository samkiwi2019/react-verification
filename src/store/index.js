import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { productReducer } from './customer/reducer';

const logger = createLogger();

const rootReducer = combineReducers({
    product: productReducer,
});

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([thunk, logger]));

export default store;
