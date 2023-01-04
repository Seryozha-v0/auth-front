import React from "react";
const musicMetadata = require('music-metadata-browser');

const AudioList = ({ musics, onPlayMusic, musicIndex, isPlaying, onPlayPauseClick }) => {

    return (
        <>
            {musics.map((item, i) => (
                <div
                    key={i}
                    className={(musicIndex === i) ? "song song_active" : "song"}
                    onClick={(musicIndex === i) ? isPlaying ? () => onPlayPauseClick(false) : () => onPlayPauseClick(true) : () => onPlayMusic(i)}
                >
                    <div className="song-info">
                        {(musicIndex === i) ? (
                            <i className="material-icons" onClick={isPlaying ? () => onPlayPauseClick(false) : () => onPlayPauseClick(true)}>
                                {isPlaying ? 'pause' : 'play_arrow'}
                            </i>
                        ) : (
                            <i className="material-icons" onClick={() => onPlayMusic(i)}>play_arrow</i>
                        )}

                        <p1>
                            {item.title} / {item.autor}
                        </p1>
                    </div>

                    <div className="song-time">
                        <i className="material-icons">more_vert</i>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AudioList;