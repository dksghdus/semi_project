import React, { useState, useEffect } from 'react';
import styles from '../../css/acc_css/info.module.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const Info = () => {
  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';

  const { search } = useLocation(); //url 경로 추출
  const queryString = new URLSearchParams(search); //파라미터 값 파싱
  const contentid = queryString.get('contentid'); // 특정 쿼리 매개변수 값 가져옴
  
  const [resultOptions, setResultOptions] = useState([]);

  useEffect(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&_type=json`;
    axios.get(url, {
      params: {
        contentId: contentid,
        addrinfoYN: 'Y'
      }
    }).then((response) => {
      const data = response.data.response.body.items.item;
      const options = data.map((item) => (
        <>
          <tr>
            <th>우편번호</th>
            <td>{item.zipcode || 'X'}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{item.tel || 'X'}</td>
          </tr>
          <tr>
            <th>홈페이지</th>
            <td dangerouslySetInnerHTML={{ __html: item.homepage} || 'X'} />
          </tr>
          <tr>
            <th>주소</th>
            <td>{item.addr1 || 'X'}</td>
          </tr>
        </>
      ));
      setResultOptions(options);
    }).catch((error => {
      console.log(error);
    }));
  }, [apiKey, contentid]);

  return (
    <div className={styles.info}>
      <table className={styles.info_table}>
        <tbody>
          {resultOptions}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
