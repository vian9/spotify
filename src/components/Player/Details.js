import React from 'react'
import styles from './Index.module.css'

function Details(props) {
    return (
        <div className={styles.cplayerdetails}>
            <div className={styles.detailsimg}>
                <img src={props.song.img_src} alt="" />
            </div>
            <h3 className={styles.detailstitle}>{props.song.title}</h3>
            <h4 className={styles.detailsartist}>{props.song.artist}</h4>
        </div>
    )
}

export default Details
