import SpotifyPlayer from '../../components/spotify/SpotifyPlayer';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [searchParams] = useSearchParams();
    
    const access_token = searchParams.get('access_token');
    const track_id = searchParams.get('track_id');
    const [accessToken, setAccessToken] = useState('');
    const [trackId, setTrackId] = useState('');

  useEffect(() => {
    const token: any = access_token;
    const track_ID: any = track_id;
    if (token) {
      setAccessToken(token);

      // Here you can use the token to fetch user data from Spotify
      // For example, calling Spotify's Web API to get user profile info
    }
    if(track_ID){
      setTrackId(track_ID);
    }
  }, [access_token, track_id]);

  return (
    <div>
      {/* {accessToken && <WebPlayback token={accessToken} />} */}
      {accessToken && <SpotifyPlayer token={accessToken} trackId={trackId} />}
      {/* Add logic here to display Spotify data, play music, etc. */}
    </div>
  );
}
