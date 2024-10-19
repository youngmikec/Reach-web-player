import { FC } from 'react';
import {useNavigate, useSearchParams } from 'react-router-dom';

import nextButton from '../../assets/svgs/next.svg';

type Props = {
  trackId: string;
}

const NextButton: FC<Props> = ({ trackId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playNextTrack = async () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('track_id', trackId);
    navigate({ search: `?${updatedParams.toString()}` }, { replace: true });
  }

  return (
      <>
          <button>
              <img
                  onClick={playNextTrack}
                  src={nextButton}
                  width={"40"}
                  height={"40"}
                  alt="over play button"
                  className="object-contain" // Can be 'contain', 'cover', 'fill', etc.
              />
          </button>
      </>
  )
}

export default NextButton;