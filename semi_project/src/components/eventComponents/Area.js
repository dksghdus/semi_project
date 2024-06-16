import React from 'react';
import styles from '../../css/event_css/EventInfo.module.css'


export default function Area({ data, onClick, show, id }) {
  if (show === false) return null;

  return (
    <div id={id} className={styles.area1}>
      {data && data.length > 0 && (
        data.map((item) => (
          <div key={item.code} onClick={() => onClick(item)} >
            {item.name}
          </div>
        ))
      )}
    </div>
  );
}