import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';

const API_URL = "http://localhost:5001"

//Async Thunks
export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${API_URL}/notes`, config);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/create',
    async ({title,content,category}, thunkAPI)=>{
        try{
          const token = thunkAPI.getState().user.userInfo?.token;
          const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
          }
          const { data } = await axios.post(`${API_URL}/notes/create`, { title,content,category }, config);
          console.log(data)
          return data
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

export const updateNote = createAsyncThunk(
    'notes/update',
    async ({ id, title, content, category }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(`${API_URL}/notes/${id}`, { title, content, category }, config);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.delete(`${API_URL}/notes/${id}`, config);
            return id; // Return the ID of the deleted note
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);



// Notes Slice
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //create notes
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = [...state.notes,action.payload];
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //update notes
            builder
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.map((note) =>
                    note._id === action.payload._id ? action.payload : note
                );
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Delete Note
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note._id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default notesSlice.reducer;
