import Head from 'next/head'
import Image from 'next/image'
import styles from './Tracks.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

export default function Track(props) {
  return (
      <>
    <div className={styles.trck}>
          <div className={styles.cplayerdetails}>
            <h3 className={styles.detailstitle}>{props.song.title}</h3>
            <h4 className={styles.detailsartist}>{props.song.artist}</h4>
        </div>
        <div className={styles.bottom}>       
            <button className={styles.playbtn} onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPlay : faPause} />
            </button>
        </div>
        </div>
    
    </>
  )
}
