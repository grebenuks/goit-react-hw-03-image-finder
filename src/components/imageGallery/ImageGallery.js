import React from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import styles from '../../styles.module.css';

export function ImageGallery({ gallery }) {
  return (
    <ul className={styles.ImageGallery}>
      {gallery.map(imageObj => (
        <ImageGalleryItem imageObj={imageObj} key={imageObj.id} />
      ))}
    </ul>
  );
}
