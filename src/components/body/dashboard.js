import React, {useState, useRef, useEffect} from 'react'
import styles from './Players.module.css';
import Track from './track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function Dashboard(props) {
  //new
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
  
    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation
  
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
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  
    const changeRange = () => {
      audioPlayer.current.currentTime = progressBar.current.value;
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
        <> 
        <audio ref={audioPlayer} src={props.songs[props.currentSongIndex].src}  preload="metadata"></audio>
        <div className={styles.tracks}>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[props.currentSongIndex]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[props.nextSongIndex]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[2]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[0]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[2]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[3]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[2]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[0]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[2]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[3]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[0]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[3]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[1]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[3]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[0]} click={togglePlayPause}/>
        <Track isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={props.songs[3]} click={togglePlayPause}/>       
        </div>
        <div className={styles.cdplayer}>
        <div className={styles.cplayerdetails}>
        <Link href='/' passHref>
            <h3 className={styles.detailstitle}>{props.songs[props.currentSongIndex].title}</h3></Link>
            <h4 className={styles.detailsartist}>{props.songs[props.currentSongIndex].artist}</h4>
        </div>
             {/* current time */}
        <div className={styles.barss}>
         <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {   /* progress bar */}
        <div>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
        </div>

        {/* duration */}
        <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
        <div className={styles.cplayercontrols}>
            <button className={styles.skipbtn} onClick={() => SkipSong(false)}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className={styles.playbtn} onClick={togglePlayPause}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay } />
            </button>
            <button className={styles.skipbtn} onClick={() => SkipSong()}>
                <FontAwesomeIcon icon={faForward} />
            </button>
            </div>
        </div>
        </>
    )
}

export default Dashboard;
