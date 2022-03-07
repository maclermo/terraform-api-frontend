import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {config} from '../config.js';

const initialState = {
  jobs: '',
  loading: false,
  error: false,
};

let loading = false;

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async () => {
      if (loading) {
        throw Error();
      }

      loading = true;

      const jobs = await fetch(`${config.BASE_URL}/jobs`).then(
          (res) => res.json(),
      );

      loading = false;

      return jobs;
    });

const JobsSlice = createSlice({
  name: 'jobs',
  initialState,
  extraReducers: {
    [getJobs.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getJobs.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.jobs = payload['jobs'];
    },
    [getJobs.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const JobsReducer = JobsSlice.reducer;
