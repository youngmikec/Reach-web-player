import { FC, useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";


import styles from './player.module.css';
import overLayPlayButton from '../../../assets/svgs/overlay-play.svg';
import prevButton from '../../../assets/svgs/prev.svg';
import nextButton from '../../../assets/svgs/next.svg';
import { ITrack } from "../../../Interface";
import PlayPauseButton from "../../ControlButtons/PlayPauseButton";
import { SET_CURRENT_TRACK_STATE, SET_IS_PLAYING_STATE } from "../../../store/track-store";
import { formatDuration } from "../../../helpers";

type Props = {
    track: ITrack | any;
    token: string;
    fullScreen?: boolean;
    recommendedTracks?: ITrack[]
}

const TrackPlayer: FC<Props> = ({ track, token }) => {
    const dispatch = useDispatch();
    const [currentTrack, setCurrentTrack] = useState<any>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const fetchCurrentTrack = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('response', response.data);
            if(response.data){
                setCurrentTrack(response?.data);
                setIsPlaying(response?.data?.is_playing);
                dispatch(SET_CURRENT_TRACK_STATE(response.data));
                dispatch(SET_IS_PLAYING_STATE(response?.data?.is_playing));
            }
        } catch (error) {
          console.error('Error fetching current track:', error);
        }
      };

    const playPauseTrack = async () => {
        if (!track) return;
    
        try {
          const action = track.is_playing ? 'pause' : 'play';
          await axios.put(`https://api.spotify.com/v1/me/player/${action}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchCurrentTrack();
        } catch (error) {
          console.error('Error playing/pausing track:', error);
        }
    };

    // const playPauseTrack = async (trackUri: string | null = null, action: 'pause' | 'play' = 'play') => {

    //     let data = {}
    //     if(trackUri){
    //       data = {
    //         uris: [`spotify:track:${trackUri}`]
    //       }
    //     }
    
    //     try {
    //       await axios.put(`https://api.spotify.com/v1/me/player/${action}`, data, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       fetchCurrentTrack();
    //     } catch (error) {
    //       console.error('Error playing/pausing track:', error);
    //     }
    // };
    
    
    useEffect(() => {
    }, [track, token]);

    return (

        <div className="h-screen p-8 bg-gradient-to-b from-[#0000003e] to-[#000000ec]">
            <div className="flex justify-center">
                <img
                    src={track?.item?.album?.images[0].url}
                    alt="track album pic"
                    width={'360'}
                    height={'400'}
                    style={{ borderRadius: '8px'}}
                    className="rounded-lg object-fill"
                />
            </div>

            <div className="mx-auto mt-16 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 my-8">
                <div>
                    <p className="text-white font-semibold text-xl md:text-2xl lg:text-3xl">
                        {track?.item?.name + " "}
                        {
                            (track?.item?.artists) && (
                                <span>({track?.item?.artists[0]?.name})</span>
                            )
                        }
                    </p>

                    <div className="text-sm md:text-lg flex justify-start gap-4 text-white my-2">
                        <div>
                            <p>10k streams.</p>
                        </div>
                        <div>
                            <p>5 days ago.</p>
                        </div>
                        <div>
                            <p>Streaming</p>
                        </div>
                    </div>
                </div>


                <div className="mb-4 flex justify-end mt-12">
                    <div>
                        <img
                            onClick={playPauseTrack}
                            src={overLayPlayButton}
                            width={"20"}
                            height={"20"}
                            alt="over play button"
                            className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                        />
                    </div>
                </div>

                <div className={styles.seekContainer}>
                    <div className={styles.seekBarContainer}>
                        {/* <!-- Seek bar --> */}
                        <input type="range" id="seek-bar" className={styles.seekBar} min="0" max="100" value="0" />

                        {/* <!-- Time display below the seek bar --> */}
                        <div className={styles.timeDisplay}>
                            <span id="current-time">
                                {formatDuration(track?.progress_ms || 0)}
                            </span>
                            <span id="total-duration">
                                {formatDuration(track?.item?.duration_ms || 0)}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center gap-12 my-4">
                    <div className="flex justify-center items-center">
                        <img
                            onClick={playPauseTrack}
                            src={prevButton}
                            width={"40"}
                            height={"40"}
                            alt="over play button"
                            className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <PlayPauseButton 
                            accessToken={token}
                            getCurrentTrack={fetchCurrentTrack}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            onClick={playPauseTrack}
                            src={nextButton}
                            width={"40"}
                            height={"40"}
                            alt="over play button"
                            className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                        />
                    </div>
                </div>
                
            </div>


        </div>
    )
}

export default TrackPlayer;