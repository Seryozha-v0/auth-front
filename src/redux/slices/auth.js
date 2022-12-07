import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchLogin = createAsyncThunk('auth/me', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk('auth/register', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchLogOut = createAsyncThunk('auth/fetchLogOut', async (params) => {
    const { data } = await axios.get('/auth/logout', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        //checkAuthorization
        [fetchLogin.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchLogin.pending]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        //Authorization
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.pending]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        //Registration
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        //logout
        [fetchLogOut.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchLogOut.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchLogOut.pending]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const selectIsAuth = state => state.auth.data;

export const authReducer = authSlice.reducer;

export const { logOut } = authSlice.actions;