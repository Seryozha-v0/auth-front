import React from "react";
import { ReactComponent as Play } from "../../assets/icons/play.svg";
import { ReactComponent as Pause } from "../../assets/icons/pause.svg";


const AudioList = ({ musics, onPlayMusic, musicIndex, isPlaying, onPlayPauseClick }) => {
    return (
        <div className="audioList">
            {musics.map((item, i) => (
                <div
                    key={i}
                    className={(musicIndex === i) ? "audioList__item audioList__item_active" : "audioList__item"}
                    onClick={(musicIndex === i) ? isPlaying ? () => onPlayPauseClick(false) : () => onPlayPauseClick(true) : () => onPlayMusic(i)}
                >
                    <div className="audioList__img">
                        <img
                            src={item.imageUrl}
                            alt={`${item.title} - ${item.autor}`}
                        />
                    </div>
                    {(musicIndex === i) ? (
                        <button
                            type="button"
                            className="audioList__btn audioControls__btn"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                            onClick={isPlaying ? () => onPlayPauseClick(false) : () => onPlayPauseClick(true)}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="audioList__btn audioControls__btn"
                            aria-label="Pause"
                            onClick={() => onPlayMusic(i)}
                        >
                            <Play />
                        </button>
                    )}

                    <div className="audioList__desc">
                        <h2 className="audioList__title">
                            {item.title}
                        </h2>
                        <h3 className="audioList__artist">
                            {item.autor}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AudioList;