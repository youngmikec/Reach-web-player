import { FC } from 'react';

import prevButton from '../../assets/svgs/prev.svg';


const PrevButton: FC = () => {
    const playPreviousTrack = () => {

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