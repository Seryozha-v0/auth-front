import React from "react";

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
}) => (
    <div className="audioControls">
        <i className="material-icons" onClick={onPrevClick}>chevron_left</i>
        {isPlaying ? (
            <i className="material-icons" onClick={() => onPlayPauseClick(false)}>pause</i>
        ) : (
            <i className="material-icons" onClick={() => onPlayPauseClick(true)}>play_arrow</i>
        )}
        <i className="material-icons" onClick={onNextClick}>chevron_right</i>
    </div>
)

export default AudioControls;