import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';
import scrollUpReducer from './scrollUpSlice';
//import cartReducer from './cartSlice';
import userSlice from './userSlice';
import cartReducer, { saveCartsMiddleware } from './cartSlice';

const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();

  return action;
};

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer,
    scrollUp: scrollUpReducer,
    cart: cartReducer,
    users: userSlice,
  },
  middleware:(getDefaultMiddLeware) =>
    getDefaultMiddLeware().concat(saveCartsMiddleware,asyncDispatchMiddleware)
});

export default store;
