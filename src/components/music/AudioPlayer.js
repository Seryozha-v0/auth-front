import React from "react";
import AudioControls from "./AudioControls";

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
    formatTime
}) => {
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
                    
                    <span>{formatTime(musicProgress)}</span>
                    <span>{formatTime(music.metaData.duration)}</span>
                </div>
            </div>
        </>
    )
})

export default AudioPlayer;