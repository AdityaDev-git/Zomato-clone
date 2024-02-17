import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk("user/userLogin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("/login",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Login unsucessful');
    }
    return response.json();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk("user/userRegister", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("/register",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Register unsucessful');
    }
    return response.json();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData:[],
    registerMsg:[],
    isLogin: "idle",
    isRegister:"idle",
    errRegister:null,
    errLogin:null,
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending, (state, action) => {
      state.isLogin = "loading";
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLogin = "succeeded";
      state.userData = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLogin = "failed";
      state.errLogin = action.error.message;
    })
    .addCase(registerUser.pending, (state, action) => {
      state.isRegister = "loading";
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isRegister = "succeeded";
      state.registerMsg = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isRegister = "failed";
      state.errRegister = action.error.message;
    })
  }
});

export default UserSlice.reducer;
