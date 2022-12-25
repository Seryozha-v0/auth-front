import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { musicsReducer } from './slices/musics';

const store = configureStore({
    reducer: {
        auth: authReducer,
        musics: musicsReducer,
    },
});

export default store;