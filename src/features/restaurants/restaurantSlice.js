import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCityList = createAsyncThunk("restaurants/fetchCities", async () => {
  const response = await fetch("/city");
  return response.json();
});

export const fetchMealType = createAsyncThunk("restaurants/fetchMeal", async () => {
  const response = await fetch("/meal");
  return response.json();
});

export const fetchFilteredRestaurants = createAsyncThunk("restaurants/fetchByFilter", async (filterValue, { rejectWithValue }) => {
  try {
    const response = await fetch("/filter",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(filterValue),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    return response.json();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});



const restaurantSlice = createSlice({
  name:'restaurant',
  initialState:{
    ct:[],
    meal:[],
    filterData: [],
    statusCt: 'idle',
    statusMeal: 'idle',
    statusFilter: 'idle',
    errorCt: null,
    errorMeal: null,
    errorFilter: null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchCityList.pending, (state, action) => {
      state.statusCt = "loading";
    })
    .addCase(fetchCityList.fulfilled, (state, action) => {
      state.statusCt = "succeeded";
      state.ct = action.payload;
    })
    .addCase(fetchCityList.rejected, (state, action) => {
      state.statusCt = "failed";
      state.errorCt = action.error.message;
    })
    .addCase(fetchMealType.pending, (state, action) => {
      state.statusMeal = "loading";
    })
    .addCase(fetchMealType.fulfilled, (state, action) => {
      state.statusMeal = "succeeded"
      state.meal = action.payload;
    })
    .addCase(fetchMealType.rejected, (state, action) => {
      state.statusMeal = "failed";
      state.errorMeal = action.error.message;
    })
    .addCase(fetchFilteredRestaurants.pending, (state) => {
      state.statusFilter = 'loading';
    })
    .addCase(fetchFilteredRestaurants.fulfilled, (state, action) => {
      state.statusFilter = 'succeeded';
      state.filterData = action.payload;
    })
    .addCase(fetchFilteredRestaurants.rejected, (state, action) => {
      state.statusFilter = 'failed';
      state.errorFilter = action.error.message;
    })
  }
});

export default restaurantSlice.reducer;
export const {addId} = restaurantSlice.actions;