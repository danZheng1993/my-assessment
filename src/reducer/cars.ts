import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { filterCars, IMAGE_BASE_URL } from '../api';
import { CAR_DETAILS, CAR_INFO_MAP, FILTER_INFO } from '../constants/dataTypes';

export interface CAR_REDUCER_STATE {
  filter?: FILTER_INFO,
  carsByID: CAR_INFO_MAP,
  carIDs: string[],
  loading: boolean,
  error?: any,
};

export type ROOT_STATE = {
  cars: CAR_REDUCER_STATE
}

const initialState: CAR_REDUCER_STATE = {
  carIDs: [],
  carsByID: {},
  loading: false,
  error: undefined
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filter?: FILTER_INFO) => {
    const result = await filterCars(filter);
    return (result.cars ?? result.Cars ?? []) as CAR_DETAILS[]
  }
)

export const carsSlice = createSlice({
  name: 'cars',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchCars.pending, (state, action) => {
      state.carIDs = [];
      state.carsByID = {};
      state.loading = true;
      state.error = false;
      state.filter = action.meta.arg;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.carIDs = action.payload.map(car => car.id);
      state.carsByID = action.payload.reduce((prev: CAR_INFO_MAP, cur: CAR_DETAILS) => ({
        ...prev,
        [cur.id]: {
          ...cur,
          image: `${IMAGE_BASE_URL}${cur.car}_${cur.car_model}_${cur.car_model_year}/200/300`,
          big_image: `${IMAGE_BASE_URL}${cur.car}_${cur.car_model}_${cur.car_model_year}/1080/720`
        }
      }), {});
      state.loading = false;
      state.error = false
    });
    builder.addCase(fetchCars.rejected, (state) => {
      state.carIDs = []
      state.carsByID = {}
      state.loading = false
      state.error = true
    })
  }
})

export const selectCars = (state: ROOT_STATE) => state.cars.carIDs.map(id => state.cars.carsByID[id])
export const selectCarDetails = (state: ROOT_STATE) => (id: string) => state.cars.carsByID[id]
export const selectLoadingState = (state: ROOT_STATE) => state.cars.loading;
export const selectErrorState = (state: ROOT_STATE) => state.cars.error;
export const selectFilter = (state: ROOT_STATE) => state.cars.filter;

export const store = configureStore({
  reducer: {
    cars: carsSlice.reducer
  },
})

export type APP_DISPATCH = typeof store.dispatch
