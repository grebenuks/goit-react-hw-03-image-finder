import React from 'react';
import styles from '../../styles.module.css';

export function Modal({ hiddenModal, largeImageURL }) {
  const handleClick = () => {
    hiddenModal();
  };
  return (
    <div className={styles.Overlay} onClick={handleClick}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}
