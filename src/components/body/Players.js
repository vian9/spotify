import Head from 'next/head'
import Image from 'next/image'
import styles from './Players.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

export default function Players(props) {
  return (
    <div className={styles.bottom}>
            <div className={styles.cplayercontrols}>
            <button className={styles.skipbtn} onClick={() => props.SkipSong(false)}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className={styles.playbtn} onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay } />
            </button>
            <button className={styles.skipbtn} onClick={() => props.SkipSong()}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    </div>
  )
}
