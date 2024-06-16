import React, { useState, useEffect } from 'react';
import styles from '../../css/acc_css/info.module.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";
const Info = () => {
  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const contentid = queryString.get('contentid');
  const [resultOptions, setResultOptions] = useState([]);

  useEffect(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentTypeId=32&_type=json`;

    axios.get(url, {
      params: {
        contentId: contentid,
      }
    }).then((response) => {
      const data = response.data.response.body.items.item;
      // console.log(response);

      const options = data.map((item) => (
        <>
          <tr>
            <th>문의 및 안내</th>
            <td>{item.infocenterlodging || 'X'}</td>
          </tr>
          <tr>
            <th>규모</th>
            <td>{item.scalelodging || 'X'}</td>
          </tr>
          <tr>
            <th>객실 수</th>
            <td>{item.roomcount || 'X'}</td>
          </tr>
          <tr>
            <th>객실 유형</th>
            <td>{item.roomtype || 'X'}</td>
          </tr>
          <tr>
            <th>주차 가능</th>
            <td>{item.parkinglodging || 'X'}</td>
          </tr>
          <tr>
            <th>조리 가능</th>
            <td>{item.chkcooking || 'X'}</td>
          </tr>
          <tr>
            <th>체크인</th>
            <td>{item.checkintime || 'X'}</td>
          </tr>
          <tr>
            <th>체크아웃</th>
            <td>{item.checkouttime || 'X'}</td>
          </tr>
          <tr>
            <th>식음료장</th>
            <td>{item.foodplace || 'X'}</td>
          </tr>
          <tr>
            <th>부대시설</th>
            <td>{item.barbecue || 'X'}</td>
          </tr>
        </>
      ));

      setResultOptions(options);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiKey, contentid]);

  return (
    <div className={styles.info}>
      <table className={styles.info_table}>
        <tbody className={styles.info_tbody}>
         {resultOptions}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
