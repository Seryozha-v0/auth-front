import React from "react";
import { useState, useEffect, useRef } from "react";
import './index.css';
import AudioList from '../../components/music/AudioList'
import AudioPlayer from '../../components/music/AudioPlayer'
import { useDispatch, useSelector } from "react-redux";
import { fetchMusics } from "../../redux/slices/musics";

const Music = () => {
  const dispatch = useDispatch();
  const { musics } = useSelector(state => state.musics);
  const isLoading = musics.status === 'loading';

  useEffect(() => {
    dispatch(fetchMusics());
  }, [])

  const [musicIndex, setMusicIndex] = useState(0);
  const [musicProgress, setMusicProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioSrc = isLoading ? '' : musics.items[musicIndex].musicUrl;

  const audioRef = useRef(new Audio(audioSrc));

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const toPrevMusic = () => {
    if (musicIndex - 1 < 0) {
      setMusicIndex(musics.items.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
    }
  }

  const toNextMusic = () => {
    if (musicIndex < musics.items.length - 1) {
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
    if (audioRef.current.currentSrc == '') {
      audioRef.current = new Audio(audioSrc);
    }

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
      {isLoading ? '' : (
        <>
          <AudioList
            musics={musics.items}
            onPlayMusic={toPlayMusic}
            musicIndex={musicIndex}
            isPlaying={isPlaying}
            onPlayPauseClick={setIsPlaying}
          />
          <AudioPlayer
            music={isLoading ? [] : musics.items[musicIndex]}
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
      )}
    </>
  );
}

export default Music;
