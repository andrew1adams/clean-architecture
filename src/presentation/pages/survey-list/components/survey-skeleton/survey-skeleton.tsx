import React from 'react'
import styles from './survey-skeleton.module.scss'

const SurveySkeleton: React.FC = () => {
  return (
    <>
      <li className={styles.surveySkeleton}></li>
      <li className={styles.surveySkeleton}></li>
      <li className={styles.surveySkeleton}></li>
      <li className={styles.surveySkeleton}></li>
      <li className={styles.surveySkeleton}></li>
      <li className={styles.surveySkeleton}></li>
    </>
  )
}

export { SurveySkeleton }
