import {configureStore} from '@reduxjs/toolkit';
import {JobsReducer} from './features/JobsSlice';
import {SearchReducer} from './features/SearchSlice';

export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    search: SearchReducer,
  },
});
