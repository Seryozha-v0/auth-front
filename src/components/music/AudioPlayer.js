import React from "react";
import AudioControls from "./AudioControls";

const format = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00';
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');

    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    } else {
        return `${mm.toString().padStart(2, '0')}:${ss}`;
    }
}

const AudioPlayer = (({
    music,
    isPlaying,
    toPrevMusic,
    toNextMusic,
    setIsPlaying,
    musicProgress,
    onScrub,
    onScrubEnd,
    duration,
}) => {
    const musicTime = format(duration);

    const musicTimeProgress = format(musicProgress);

    return (
        <>
            <AudioControls
                isPlaying={isPlaying}
                onPrevClick={toPrevMusic}
                onNextClick={toNextMusic}
                onPlayPauseClick={setIsPlaying}
            />
            <div className="music-player__progress">
                <input
                    type="range"
                    value={musicProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="music-player__range"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
                <div className="music-player__time">
                    <span>{musicTimeProgress}</span>
                    <span>{musicTime}</span>
                </div>
            </div>
        </>
    )
})

export default AudioPlayer;