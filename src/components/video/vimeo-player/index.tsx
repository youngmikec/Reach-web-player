import { FC, useEffect, useRef } from "react";
import Vimeo from '@vimeo/player'
import { VimeoPlayerOption } from "../../../Interface";

type Props = {
    videoId: number;
    token: string;
}

const VimeoPlayer: FC<Props> = ({ videoId, token }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);


    const PlayVideo = (videoId: number) => {
        const playerOption: VimeoPlayerOption = {
            id: videoId,
            width: 350,
            height: 350,
            fullscreen: true,
            autoplay: true,
        }
        if(playerRef){
            const videoPlayer = new Vimeo('vimeoPlayer', playerOption);
            videoPlayer.setVolume(0.4); // from 0 to 1 and 1 being 100% volume

            videoPlayer.on('play', () => {
                console.log('Played the first video');
            });
        }
    }

    useEffect(() => {
        if(videoId){
            PlayVideo(videoId);
        }
    }, [videoId]);

    return (
        <>
            <div className="h-screen w-full bg-black flex justify-center items-center">
                <div>
                    <div 
                        id="vimeoPlayer" 
                        data-vimeo-id={videoId}
                        ref={playerRef}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default VimeoPlayer;