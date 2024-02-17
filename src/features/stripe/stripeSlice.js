import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const payment = createAsyncThunk("stripe/stripePay", async (items, { rejectWithValue }) => {
    try {
      const response = await fetch("/stripe/checkout",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(items),
      });
      if (!response.ok) {
        throw new Error('Payment unsucessful');
      }
      const data =  response.json();
      window.location = data.url
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  const StripeSlice = createSlice({
    name: "stripe",
    initialState: {
      stripeData:[],
      isPayment: "idle",
      errPayment:null,
    },
    reducers: {},
    extraReducers:(builder)=>{
      builder
      .addCase(payment.pending, (state, action) => {
        state.isPayment = "loading";
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.isPayment = "succeeded";
        state.stripeData = action.payload;
      })
      .addCase(payment.rejected, (state, action) => {
        state.isPayment = "failed";
        state.errPayment = action.error.message;
      })
    }
  });
  
  export default StripeSlice.reducer;