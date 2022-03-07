import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {changeState} = SearchSlice.actions;
export const SearchReducer = SearchSlice.reducer;
