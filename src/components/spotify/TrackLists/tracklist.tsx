import { FC } from "react";
import { ITrack } from "../../../Interface";
import styles from './tracklist.module.css';
import { formatDuration } from "../../../helpers";
import menuSvg from '../../../assets/svgs/menu-svg.svg';

type TrackProps = {
    track: ITrack;
}

type TrackListsProps = {
    recommendedTracks: ITrack[]
}

const TrackItem: FC<TrackProps> = ({ track }) => {
    return (
        <>
            <div className={styles.trackContainer}>
                <div>
                    <img 
                        src={track && track?.album?.images[0]?.url} 
                        width={'120'}
                        height={'120'} 
                        alt="track cover"
                        className={styles.trackImage}
                    />
                </div>
                <div className={styles.trackDetails}>
                    <div>
                        <p className={styles.trackName}>{ track?.name }</p>
                        <p className={styles.trackArtist}>{ track?.artists[0]?.name }</p>
                        {
                            track && (
                                <p className={styles.trackText}>{ formatDuration(track?.duration_ms) }</p>
                            )
                        }
                    </div>
                    <div>
                        <img 
                            src={menuSvg} 
                            width={'20'}
                            height={'20'} 
                            alt="track cover"
                            className="object-contain"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}


const TrackLists: FC<TrackListsProps> = ({ recommendedTracks }) => {
    
    return (
        <>
            <div className={styles.listContainer}>
                <h1 className={styles.textCaption}>Recommend Audios</h1>
                {
                    (recommendedTracks.length > 0) ? recommendedTracks.map((track: ITrack, idx: number) => {
                        return (
                            <TrackItem key={idx} track={track} />
                        )
                    }) :
                    <div>
                        <p>No Music tracks found</p>
                    </div>
                }
            </div>
        </>
    )
}

export default TrackLists;