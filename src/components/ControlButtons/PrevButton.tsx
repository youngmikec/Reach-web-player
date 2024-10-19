import { FC } from 'react';
import {useNavigate, useSearchParams } from 'react-router-dom';

import prevButton from '../../assets/svgs/prev.svg';

type Props = {
  trackId: string;
}

const PrevButton: FC<Props> = ({ trackId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

    const playPreviousTrack = async () => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set('track_id', trackId);
      navigate({ search: `?${updatedParams.toString()}` }, { replace: true });
    }

    return (
        <>
            <button>
                <img
                    onClick={playPreviousTrack}
                    src={prevButton}
                    width={"40"}
                    height={"40"}
                    alt="over play button"
                    className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
                />
            </button>
        </>
    )
}

export default PrevButton;