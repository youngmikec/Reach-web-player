import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VimeoPlayer from "../../components/video/vimeo-player";


const VimeoPlayerPage: FC = () => {
    const [searchParams] = useSearchParams();
    
    const access_token = searchParams.get('access_token');
    const video_id = searchParams.get('video_id');
    const [accessToken, setAccessToken] = useState('');
    const [videoId, setVideoId] = useState<number>(0);

    useEffect(() => {
        const token: any = access_token;
        const video_ID: any = video_id;
        if (token) {
            setAccessToken(token);
            // Here you can use the token to fetch user data from Spotify
            // For example, calling Spotify's Web API to get user profile info
        }
        if(video_ID){
            setVideoId(parseInt(video_ID));
        }
    }, [access_token, video_id]);

    return (
        <div>
            {/* {accessToken && <WebPlayback token={accessToken} />} */}
            {accessToken && <VimeoPlayer token={accessToken} videoId={videoId} />}
            {/* Add logic here to display Spotify data, play music, etc. */}
        </div>
    )
}

export default VimeoPlayerPage;