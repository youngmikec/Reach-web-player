import { FC, useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";


import overLayPlayButton from '../../../assets/svgs/overlay-play.svg';
import { ITrack } from "../../../Interface";
import PlayPauseButton from "../../ControlButtons/PlayPauseButton";
import { SET_CURRENT_TRACK_STATE, SET_IS_PLAYING_STATE, SET_TRACK_LIST } from "../../../store/track-store";
import { TrackDecider } from "../../../helpers";
import PrevButton from "../../ControlButtons/PrevButton";
import NextButton from "../../ControlButtons/NextButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import SeekBar from "../SeekBar";

type Props = {
    // track: ITrack | any;
    token: string;
    fullScreen?: boolean;
    recommendedTracks?: ITrack[]
}

const TrackPlayer: FC<Props> = ({ token }) => {
    const navigate = useNavigate();
    const track = useSelector((state: RootState) => state.trackState.value.track);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const track_Id = searchParams.get('track_id');
    

    const [nextTrackId, setNextTrackId] = useState<string>('');
    const [prevTrackId, setPrevTrackId] = useState<string>('');
    const [tracks, setTracks] = useState<string[]>([]);

    const trackss: string[] = [
        "4jGvv0UNnfvoOQeuZKNI2T", 
        "6F5c58TMEs1byxUstkzVeM",
        "5xGeFN1C6m8XvP0RATLjJ1",
        "4MRT0dDbhqFKl67WzhUbSw",
        "699hD2eiW2hyKWkN8KssnD", 
        "1uDjaezEbalGyGnuH80zDK", 
        "3ovzlSJZVe1g4as77ajDQz", 
        "1XqTT98Z08a2eOPCxyNr0H",
        "4c2W3VKsOFoIg2SFaO6DY5", 
        "2glGP8kEfACgJdZ86kWxhN", 
        "0ADG9OgdVTL7fgREP75BrZ", 
    ];


    const fetchCurrentTrack = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('response', response.data);
            if(response.data){
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
    
    
    useEffect(() => {
        const trackid = searchParams.get('track_id');
        const track_list: any = searchParams.get('track_list')
        const parsedTrackList = JSON.parse(track_list);
        
        if(parsedTrackList){
            setTracks(parsedTrackList);
            dispatch(SET_TRACK_LIST(parsedTrackList));
        }
        if(trackid && parsedTrackList.length > 0){
            const { nextTrackId, prevTrackId } = TrackDecider(trackid, parsedTrackList);
            setNextTrackId(nextTrackId);
            setPrevTrackId(prevTrackId);
        }
    }, [track_Id, searchParams.get('track_list'), token]);

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

                

                <div className="my-4">
                    <SeekBar token={token} />
                </div>
                
                <div className="flex justify-center gap-12 my-4">
                    <div className="flex justify-center items-center">
                        <PrevButton
                            trackId={prevTrackId}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <PlayPauseButton 
                            accessToken={token}
                            getCurrentTrack={fetchCurrentTrack}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <NextButton
                            trackId={nextTrackId}
                        />
                    </div>
                </div>
                
            </div>


        </div>
    )
}

export default TrackPlayer;