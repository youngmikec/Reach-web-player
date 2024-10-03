import { FC, useEffect } from "react";
import axios from 'axios';


import styles from './player.module.css';
import overLayPlayButton from '../../../assets/svgs/overlay-play.svg';
import prevButton from '../../../assets/svgs/prev.svg';
import pauseButton from '../../../assets/svgs/pause.svg';
import nextButton from '../../../assets/svgs/next.svg';
import { ITrack } from "../../../Interface";

type Props = {
    track: ITrack | any;
    token: string;
    fullScreen?: boolean;
    recommendedTracks?: ITrack[]
}

const TrackPlayer: FC<Props> = ({ track, token }) => {

    const fetchCurrentTrack = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(response);
        //   setCurrentTrack(response.data);
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

        <div className={styles.mainContainerFull}>
            <div className=" ">
                <img
                    src={track?.item?.album?.images[0].url}
                    alt="track album pic"
                    width={'360'}
                    height={'400'}
                    style={{ borderRadius: '8px'}}
                    className="rounded-lg object-fill"
                />
            </div>

            <div className={styles.playerTitleSection}>
                <p className={styles.title}>
                    {track?.item?.name + " "}
                    {
                        (track?.item?.artists) && (
                            <span>({track?.item?.artists[0]?.name})</span>
                        )
                    }
                </p>
                <div className={styles.playerSubTitleSection}>
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

            <div className={styles.controler}>
                <div className={styles.playTimer}>
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

                {/* seek bars */}
                <div className={styles.seekContainer}>
                    <div className={styles.seekBarContainer}>
                        {/* <!-- Seek bar --> */}
                        <input type="range" id="seek-bar" className={styles.seekBar} min="0" max="100" value="0" />

                        {/* <!-- Time display below the seek bar --> */}
                        <div className={styles.timeDisplay}>
                            <span id="current-time">0:00</span>
                            <span id="total-duration">3:45</span>
                        </div>
                    </div>
                </div>

                {/* control buttons */}
                <div className={styles.playerControlButtons}>
                    <div>
                        <img
                            onClick={playPauseTrack}
                            src={prevButton}
                            width={"40"}
                            height={"40"}
                            alt="over play button"
                            className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                        />
                    </div>
                    <div>
                        <img
                            onClick={playPauseTrack}
                            src={pauseButton}
                            width={"40"}
                            height={"40"}
                            alt="over play button"
                            className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                        />
                    </div>
                    <div>
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