import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import notesSlice from "./notesSlice"

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const store = configureStore({
    reducer:{
        user: userSlice,
        notes: notesSlice
    },
    preloadedState: {
        user: { userInfo: userInfoFromStorage },
    },
})

export default store;