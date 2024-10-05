import { FC } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import overLayPlayButton from '../../assets/svgs/overlay-play.svg';
import pauseButton from '../../assets/svgs/pause.svg';
import { RootState } from '../../store';


type Props = {
    accessToken: string;
    getCurrentTrack: () => any
}


const PlayPauseButton: FC<Props> = ({ 
    accessToken, 
    getCurrentTrack 
}) => {

    const IsTrackPlaying = useSelector((state: RootState) => state.trackState.value.isPlaying);

    const playPauseTrack = async () => {    
        try {
          const action = IsTrackPlaying ? 'pause' : 'play';
          await axios.put(`https://api.spotify.com/v1/me/player/${action}`, {}, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          getCurrentTrack && getCurrentTrack();
        } catch (error) {
          console.error('Error playing/pausing track:', error);
        }
    }

    return (
        <>
            <button className='my-auto'>
                <img
                    onClick={playPauseTrack}
                    src={IsTrackPlaying ? pauseButton : overLayPlayButton}
                    width={"40"}
                    height={"40"}
                    alt="over play button"
                    className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                />
            </button>
        </>
    )
}

export default PlayPauseButton;