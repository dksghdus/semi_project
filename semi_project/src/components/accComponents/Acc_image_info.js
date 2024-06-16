import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/acc_css/result.module.css';

export default () => {

  const { search } = useLocation(); 
  const queryString = new URLSearchParams(search);
  const contentid = queryString.get('contentid');

  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';
  const [resultOptions, setResultOptions] = useState([]);

  useEffect(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailInfo1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentTypeId=32&_type=json`;

    axios.get(url, {
      params: {
        contentId: contentid,
      }
    }).then((response) => {
      // console.log(response)
      const data = response.data.response.body.items.item;
      const options = data.map((item, index) => (
        <div key={index} className={index === 0 ? styles.large_imgContainer : styles.small_imgContainer}>
          {index === 0 && <img src={item.roomimg1} className={styles.large_img} />}
          {index !== 0 && item.roomimg1 && <img src={item.roomimg1} className={styles.small_img} />}
          {index !== 0 && item.roomimg2 && <img src={item.roomimg2} className={styles.small_img} />}
          {index !== 0 && item.roomimg3 && <img src={item.roomimg3} className={styles.small_img} />}
          {index !== 0 && item.roomimg4 && <img src={item.roomimg4} className={styles.small_img} />}
          {index !== 0 && item.roomimg5 && <img src={item.roomimg5} className={styles.small_img} />}
        </div>
      ));
      setResultOptions(options);
    }).catch(console.log);
  }, [contentid]);

  useEffect(() => {
    document.querySelectorAll(`.${styles.small_imgContainer} > img`).forEach((obj) => {
      obj.onclick = (e) => {
        document.querySelector(`.${styles.large_img}`).src = e.target.src;
      };
    });
  }, [resultOptions]);
  
  return(
    <div className={styles.image_gallery}>
    {resultOptions.length > 0 && resultOptions[0]}
    {resultOptions.length > 1 && <div className={styles.small_imgContainer}>
      {resultOptions.slice(1)}
    </div>}
  </div>
  );
}