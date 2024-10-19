import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TrackState = {
    value: {
        track: any;
        isPlaying: boolean;
        trackList: string[]
    }
}

const initialState: TrackState = {
    value: {
        track: null,
        isPlaying: false,
        trackList: []
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
        },
        SET_TRACK_LIST: (state, action: PayloadAction<string[]>) => {
            state.value.trackList = action.payload
        }
    }
});

export const { SET_CURRENT_TRACK_STATE, SET_IS_PLAYING_STATE, SET_TRACK_LIST } = trackSlice.actions;

export default trackSlice.reducer;