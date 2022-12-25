import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchMusics = createAsyncThunk('musics/fetchMusics', async () => {
    const { data } = await axios.get('/musics').catch((err) => console.log(err.response.data.message));
    return data;
})

const initialState = {
    musics: {
        items: [],
        status: 'loading',
    }
};

const musicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMusics.pending]: (state) => {
            state.musics.status = 'loading';
        },
        [fetchMusics.fulfilled]: (state, action) => {
            state.musics.items = action.payload;
            state.musics.status = 'loaded';
        },
        [fetchMusics.rejected]: (state) => {
            state.musics.items = [];
            state.musics.status = 'error';
        },
    }
})

export const musicsReducer = musicsSlice.reducer;