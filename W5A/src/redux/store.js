import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice'

const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
}

const store = configureStore({
    reducer: {
        todoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleWare),
});

export default store;
