import { useEffect, useRef, useState } from "react";
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import Player from "../Player/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FixFooter = (props) => {
  const [slideUp, setSlideUp] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(props.trackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const {
    title = "",
    artist = "",
    avatar = "",
    audioFile = "",
  } = currentTrackIndex !== -1 ? audioList[currentTrackIndex] : {};
  const audioSrc = `${props.currentSongIndex.src}`;
  const audioPlayer = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const chapters = [
    {
      start: 0,
      end: 15
    },
    {
      start: 60,
      end: 75
    }
  ]

  useEffect(() => {
    if (props.timeJump) {
      timeTravel(props.timeJump);
      setIsPlaying(true);
      play();
    } else {
      timeTravel(0);
    }
  }, [props.timeJump]);

  useEffect(() => {
    if (props.currentTime == duration) {
      togglePlayPause();
      SkipSong()
      timeTravel(0);
    }
  }, [props.currentTime]);


  const onTrackSelect = (index) => {
    setTrackIndex(index);
  };

  const play = () => {
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRange();
  }

  const togglePlayPause = () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.props.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.props.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  //forward backward
  const SkipSong = (forwards = true) => {
  if (forwards) {
      props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp++;

          if (temp > props.songs.length - 1) {
              temp = 0;
          }

          return temp;
      });
  } else {
      props.setCurrentSongIndex(() => {
          let temp = props.currentSongIndex;
          temp--;

          if (temp < 0) {
              temp = props.songs.length - 1;
          }

          return temp;
      });
  }
}

  return (
    <div
      className={`fix-footer ${currentTrackIndex !== -1 ? "_h115" : "_h60 "} ${
        slideUp ? "active" : ""
      }`}
    >
      <div
        onClick={() => {
          if (currentTrackIndex !== -1) {
            setSlideUp(!slideUp);
          }
        }}
        className="slide-up-btn"
      ></div>

      <div className="d-visilibity"></div>

      {slideUp && (
        <Player
          currentSongIndex={props.currentSongIndex} 
          setCurrentSongIndex={props.setCurrentSongIndex} 
          nextSongIndex={props.nextSongIndex} 
          songs={props.songs}
          timeJump={props.t}
        />
      )}

      {!slideUp && (
        <>
          {props.trackIndex !== -1 && (
            <div className="mini-player flex justify-sb align-center mtb-10">
              <div className="flex align-center">

              </div>
              <div className="mini-player-control flex">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <FontAwesomeIcon faPause />
                  ) : (
                    <FontAwesomeIcon faPlay />
                  )}
                </button>
                <button>
                  <img src={closeIcon} />
                </button>
              </div>
            </div>
          )}

   
        </>
      )}
    </div>
  );
};

export default FixFooter;