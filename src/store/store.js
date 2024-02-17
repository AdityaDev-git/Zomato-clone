import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from '../features/restaurants/restaurantSlice';
import  userSlice from '../features/user/userSlice';
import stripeSlice from '../features/stripe/stripeSlice';

export const store = configureStore({
    reducer: {
      restaurant: restaurantSlice,
      user: userSlice,
      stripe: stripeSlice,
    },
  });