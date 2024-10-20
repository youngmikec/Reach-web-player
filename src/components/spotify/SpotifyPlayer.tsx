import { useEffect, useState, FC } from 'react';
import axios from 'axios';

import styles from './SpotifyPlayer.module.css';
import TrackPlayer from './TrackPlayer/player';
import { ITrack } from '../../Interface';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_TRACK_STATE, SET_IS_PLAYING_STATE } from '../../store/track-store';
// import TrackLists from './TrackLists/tracklist';

type Props = {
    token: any;
    trackId?: string;
}

const SpotifyPlayer: FC<Props> = ({ token, trackId }) => {
  const dispatch = useDispatch();
  const [track, setTrack] = useState<any>(null);
  const [recommendedTracks, setRecommendedTracks] = useState<ITrack[]>([]);
  // const [ userProfile, setUserProfile] = useState<any>(null);

  // const fetchUserProfile = async () => {
  //   try {
  //       const response = await axios.get("https://api.spotify.com/v1/me", {
  //         headers: { 
  //           Authorization: `Bearer ${token}` 
  //         }
  //       });
        
  //       setUserProfile(response.data);
  //   } catch (error) {
  //     console.error('Error fetching User details:', error);
  //   }
  // };

  const fetchCurrentTrack = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data){
        setTrack(response.data);
        dispatch(SET_CURRENT_TRACK_STATE(response.data));
        dispatch(SET_IS_PLAYING_STATE(response?.data?.is_playing));
      }

    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  const fetchUserRecommendedTracks = async () => {
    try {
      // "https://api.spotify.com/v1/me/tracks?offset=0&limit=20&locale=en-US,en;q%3D0.9,ig;q%3D0.8"
      const response = await axios.get('https://api.spotify.com/v1/recommendations?limit=10&seed_genres=afrobeat,pop', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.data){
        // const { tracks, seeds } = response.data;
        const { tracks } = response.data;
        if(tracks.length > 0){
          setRecommendedTracks(tracks);
          playPauseTrack(tracks[0]?.uri, 'play');
        }
      }
    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  const playPauseTrack = async (trackUri: string | null = null, action: 'pause' | 'play' = 'play') => {

    let data = {}
    if(trackUri){
      data = {
        uris: [`spotify:track:${trackUri}`]
      }
    }

    try {
      await axios.put(`https://api.spotify.com/v1/me/player/${action}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCurrentTrack();
    } catch (error) {
      console.error('Error playing/pausing track:', error);
    }
  };

  async function getCurrentPlaybackState() {
    try{
      const response = await axios.get('https://api.spotify.com/v1/me/player', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response) {
        const data = response.data;
        console.log('Current playback state:', data);
      }
    }catch(err) {
      console.error('Error fetching playback state:', err);
    }
}

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'your-username',
          password: 'your-password',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save token in localStorage or cookie
        localStorage.setItem('authToken', data.token);
        alert('Signed in successfully');
      } else {
        alert('Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in error', error);
    }
  };

  useEffect(() => {
    playPauseTrack(trackId, 'play');
    fetchUserRecommendedTracks();
    getCurrentPlaybackState();
  }, [token, trackId]);


  

  return (
   <>
    {
      (!token) && <button onClick={() => handleSignIn()}>Log in with Spotify</button>
    }
    {
      (token) && 
      // className={styles.playerContainer}
      <div className="w-full h-full">
        {
          track && (
            <TrackPlayer 
              // track={track} 
              token={token}
              fullScreen={trackId ? true : false}
              recommendedTracks={recommendedTracks}
            />
          )
        }
      </div>
    }
   </>
  );
};

export default SpotifyPlayer;
