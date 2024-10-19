import { FC, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import styles from '../TrackPlayer/player.module.css';
import { formatDuration } from '../../../helpers';
import { SET_IS_PLAYING_STATE } from '../../../store/track-store';
import { useDispatch } from 'react-redux';

interface SeekBarProps {
    token: string;
}

const SeekBar: FC<SeekBarProps> = ({ token }) => {

    const dispatch = useDispatch();
    const [progressMs, setProgressMs] = useState(0);
    const [durationMs, setDurationMs] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false); // Track if user is dragging
    const intervalRef = useRef<NodeJS.Timer | null>(null); // For real-time updates

    // Fetch current playback info from Spotify
    const fetchCurrentPlayback = async () => {
        try {
        const response = await axios.get('https://api.spotify.com/v1/me/player', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        const { progress_ms, item, is_playing } = response.data;
        setProgressMs(progress_ms);
        setDurationMs(item.duration_ms);
        dispatch(SET_IS_PLAYING_STATE(is_playing))

        // If the song is playing, start the interval to update the progress
        if (is_playing && !intervalRef.current) {
            startProgressInterval();
        } else if (!is_playing) {
            stopProgressInterval();
        }
        } catch (error) {
        console.error('Error fetching playback:', error);
        }
    };

    // Start an interval to update the progress every second
    const startProgressInterval = () => {
        intervalRef.current = setInterval(() => {
            setProgressMs((prev) => prev + 1000); // Increment progress by 1 second
        }, 1000);
    };

    // Stop the progress interval
    const stopProgressInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Seek to a specific time on Spotify
    const seekToPosition = async (positionMs: number) => {
        try {
        await axios.put(
            `https://api.spotify.com/v1/me/player/seek?position_ms=${positionMs}`,
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setProgressMs(positionMs); // Update the progress immediately
        } catch (error) {
        console.error('Error seeking:', error);
        }
    };

    // Handle user interaction with the seekbar
    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSeeking(true); // Pause real-time updates while sliding
        const newValue = parseInt(e.target.value, 10);
        setProgressMs(newValue);
    };

    const handleSeekCommit = () => {
        setIsSeeking(false);
        seekToPosition(progressMs); // Commit the new position to Spotify
    };

    // Fetch current playback on mount and set up a listener
    useEffect(() => {
        fetchCurrentPlayback();

        return () => {
            stopProgressInterval(); // Clean up on unmount
        };
    }, []);

    // Sync real-time progress updates unless user is actively seeking
    useEffect(() => {
        if (!isSeeking) {
            fetchCurrentPlayback();
        }
    }, [progressMs]);


    return (
        <>
            <div className={styles.seekContainer}>
                <div className={styles.seekBarContainer}>
                    {/* <!-- Seek bar --> */}
                    <input
                        type="range"
                        min={0}
                        max={durationMs}
                        value={progressMs}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekCommit} // Handle seek when user releases the slider
                        onTouchEnd={handleSeekCommit} // Handle mobile touch events
                        style={{ width: '100%' }}
                        // className={styles.seekBar}
                    />

                    {/* <!-- Time display below the seek bar --> */}
                    <div className={styles.timeDisplay}>
                        <span id="current-time">
                            {formatDuration(progressMs)}
                        </span>
                        <span id="total-duration">
                            {formatDuration(durationMs)}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeekBar;