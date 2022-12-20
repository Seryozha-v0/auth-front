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
    duration
}) => {
    const { title, artist, image } = music;

    const musicTime = `${(Math.floor(duration / 60) < 10) ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)}:${(Math.floor(duration % 60) < 10) ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)}`;

    const musicTimeProgress = `${(Math.floor(musicProgress / 60) < 10) ? '0' + Math.floor(musicProgress / 60) : Math.floor(musicProgress / 60)}:${(Math.floor(musicProgress % 60) < 10) ? '0' + Math.floor(musicProgress % 60) : Math.floor(musicProgress % 60)}`;

    return (
        <div className="audioPlayer">
            <div className="audioPlayer__info">
                <div className="audioPlayer__img">
                    <img
                        src={image}
                        alt={`${title} - ${artist}`}
                    />
                </div>
                <div className="audioPlayer__descr">
                    <h2 className="audioPlayer__title">{title}</h2>
                    <h3 className="audioPlayer__artist">{artist}</h3>
                </div>

                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevMusic}
                    onNextClick={toNextMusic}
                    onPlayPauseClick={setIsPlaying}
                />

                <div className="audioPlayer__progress">

                    <div className="audioPlayer__time">
                        {isPlaying ? (
                            <>
                                <span>{musicTimeProgress}</span>
                                <span>{musicTime}</span>
                            </>
                        ) : ''}
                    </div>

                    <input
                        type="range"
                        value={musicProgress}
                        step="1"
                        min="0"
                        max={duration ? duration : `${duration}`}
                        className="audioPlayer__range"
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                    />
                </div>
            </div>
        </div>
    )
})

export default AudioPlayer;