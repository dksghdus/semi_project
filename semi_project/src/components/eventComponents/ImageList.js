import React from 'react';
import styles from '../../css/event_css/EventInfo.module.css';

export default function ImageList({ images, onImageClick }) {
  // images가 undefined인 경우를 대비하여 안전하게 처리
  if (!images || images.length === 0) {
    return <p>해당 내용이 없습니다.</p>;
  }

  return (
    <div className={styles.img}>
      {images.map(image => (
        <div key={image.contentid} className={styles.imageContainer}>
          <img
            src={image.firstimage || '이미지가 없습니다.'} // image.firstimage가 없는 경우를 대비하여 빈 문자열을 기본값으로 설정
            className={styles.onimg}
            onClick={() => onImageClick(image.contentid)}
          />
          <p className={styles.imgTitle}>{image.title}</p>
        </div>
      ))}
    </div>
  );
}