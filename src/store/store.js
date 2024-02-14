import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from '../features/restaurants/restaurantSlice';

export const store = configureStore({
    reducer: {
      restaurant: restaurantSlice,
    },
  });