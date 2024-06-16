import KakaoMap from './Acc_KakaoMap';
import Info from './Acc_basic_info';
import styles from '../../css/acc_css/result.module.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Usage_info from './Acc_usage_info';
import Detail_info from './Acc_detail_info';
import Image_info from './Acc_image_info';
import Import from '../headerComponents/Import';

export const Result = () => {

  const { search } = useLocation(); //url 경로 정보
  const queryString = new URLSearchParams(search); //파라미터 값 접근
  const contentid = queryString.get('contentid'); //컨텐트id값 가져옴
  const mapx = queryString.get('mapx'); //좌표x값 가져옴
  const mapy = queryString.get('mapy'); //좌표y값 가져옴
  const img = queryString.get('firstimg');  //이미지 가져옴

  const [activeTab, setActiveTab] = useState('basic-info');
  const [overview, setOverview] = useState('');
  const [title, setTitle] = useState('');
  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';

  const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&_type=json`;
  useEffect(() => {

    axios.get(url, {
      params: {
        contentId: contentid,
        overviewYN: 'Y'
      }
    }).then((response) => {
      const data = response.data.response.body.items.item[0];
      setOverview(data.overview);
      setTitle(data.title);
    }).catch(console.log);
  }, [contentid]);
  

  const changeHTML = () => {
    

    switch (activeTab) {
      case 'basic-info':
        return <Info />;
      case 'usage-info':
        return <Usage_info />;
      case 'detail-info':
        return <Detail_info />;
        case 'map-info':
        return <KakaoMap className={styles.kakao} mapx={mapx} mapy={mapy}  />
        case 'image-info':
        return <Image_info />
      default:
        return null;
    }
  };

  return (
    <div className={styles.main_container}>
      <Import />
      <div className={styles.main_info}>
        <div className={styles.info_container}>
          <div className={styles.content}>
            <h1>{title}</h1>
            <img src={img} alt="이미지" className={styles.main_img}></img>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${activeTab === 'basic-info' ? styles.active : ''}`} onClick={() => setActiveTab('basic-info')}>기본정보</button>
              <button className={`${styles.tab} ${activeTab === 'usage-info' ? styles.active : ''}`} onClick={() => setActiveTab('usage-info')}>이용안내</button>
              <button className={`${styles.tab} ${activeTab === 'detail-info' ? styles.active : ''}`} onClick={() => setActiveTab('detail-info')}>상세정보</button>
              <button className={`${styles.tab} ${activeTab === 'map-info' ? styles.active : ''}`} onClick={() => setActiveTab('map-info')}>지도</button>
              <button className={`${styles.tab} ${activeTab === 'image-info' ? styles.active : ''}`} onClick={() => setActiveTab('image-info')}>객실 이미지</button>
            </div>
            {changeHTML()}
            <div className={styles.exp}>
              <h3>개요</h3>
              {overview}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to='/accommodation' className={styles.btn_back}>목록</Link>
      </div>
    </div>
  );
};

export default Result;
