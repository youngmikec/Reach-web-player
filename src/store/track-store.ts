import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TrackState = {
    value: {
        track: any;
        isPlaying: boolean;
    }
}

const initialState: TrackState = {
    value: {
        track: null,
        isPlaying: false,
    }
}

export const trackSlice = createSlice({
    name: 'trackState',
    initialState,
    reducers: {
        SET_IS_PLAYING_STATE: (state, action: PayloadAction<boolean>) => {
            state.value.isPlaying = action.payload;
        },
        SET_CURRENT_TRACK_STATE: (state, action: PayloadAction<any>) => {
            state.value.track = action.payload;
        }
    }
});

export const { SET_CURRENT_TRACK_STATE, SET_IS_PLAYING_STATE } = trackSlice.actions;

export default trackSlice.reducer;