import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchRestaurantsList = createAsyncThunk("restaurants/fetchList", async () => {
  const response = await fetch("/list");
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
    restoList:[],
    meal:[],
    filterData: [],
    statusResto: 'idle',
    statusMeal: 'idle',
    statusFilter: 'idle',
    errorResto: null,
    errorMeal: null,
    errorFilter: null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchRestaurantsList.pending, (state, action) => {
      state.statusResto = "loading";
    })
    .addCase(fetchRestaurantsList.fulfilled, (state, action) => {
      state.statusResto = "succeeded";
      state.restoList = action.payload;
    })
    .addCase(fetchRestaurantsList.rejected, (state, action) => {
      state.statusResto = "failed";
      state.errorResto = action.error.message;
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