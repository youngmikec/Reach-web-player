import { FC } from 'react';

import nextButton from '../../assets/svgs/next.svg';

const NextButton: FC = () => {
    const playNextTrack = () => {

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