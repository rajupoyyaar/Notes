import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:5001"

console.log("api url", API_URL)

// Async Thunks
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const { data } = await axios.post(`${API_URL}/login`, { email, password }, config);
            console.log(data)
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, password, profile }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const { data } = await axios.post(`${API_URL}`, { name, email, password, profile }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ name, email, password, profile }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.userInfo.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                `${API_URL}`,
                { name, email, password, profile },
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data)); // Update local storage
            console.log(data)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Profile update failed'
            );
        }
    }
);


// User Slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
