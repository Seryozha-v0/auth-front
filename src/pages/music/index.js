import React from "react";
import { useState, useEffect, useRef } from "react";
import './index.css';
import AudioList from "../../components/AudioList";

import AudioPlayer from '../../components/AudioPlayer'
import musics from './musics'

const Music = () => {
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicProgress, setMusicProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { audioSrc } = musics[musicIndex];

  const audioRef = useRef(new Audio(audioSrc));

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  
  const toPrevMusic = () => {
    if (musicIndex - 1 < 0) {
      setMusicIndex(musics.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
    }
  }

  const toNextMusic = () => {
    if (musicIndex < musics.length - 1) {
      setMusicIndex(musicIndex + 1);
    } else {
      setMusicIndex(0);
    }
  }

  const toPlayMusic = (i) => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setMusicIndex(i);
    setIsPlaying(true);
  }

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextMusic();
      } else {
        setMusicProgress(audioRef.current.currentTime);
      }
    }, 1000);
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current);

    audioRef.current.currentTime = value;
    setMusicProgress(audioRef.current.currentTime);
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setMusicProgress(audioRef.current.currentTime);

    if (isReady.current && isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [musicIndex]);

  return (
    <>
      <AudioList
        musics={musics}
        onPlayMusic={toPlayMusic}
        musicIndex={musicIndex}
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
      />
      <AudioPlayer
        music={musics[musicIndex]}
        currentAudio={audioRef.current}
        isPlaying={isPlaying}
        toPrevMusic={toPrevMusic}
        toNextMusic={toNextMusic}
        setIsPlaying={setIsPlaying}
        musicProgress={musicProgress}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
        duration={duration}
      />
    </>
  );
}

export default Music;
