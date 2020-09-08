import React from 'react';
import styles from '../../styles.module.css';

export function ImageGalleryItem({ imageObj }) {
  console.log(imageObj);
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imageObj.webformatURL}
        alt="GalleryImage"
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
}
