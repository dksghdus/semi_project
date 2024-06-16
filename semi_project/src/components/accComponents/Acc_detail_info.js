import styles from '../../css/acc_css/info.module.css';
import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
const Info = () => {
  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const contentid = queryString.get('contentid');
  const [resultOptions, setResultOptions] = useState([]);

  useEffect(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/detailInfo1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentTypeId=32&_type=json`;

    axios.get(url, {
      params: {
        contentId: contentid,
      }
    }).then((response) => {
      const data = response.data.response.body.items.item;
      console.log(response);

      const options = data.map((item) => (
        <>
          <tr>
            <th>객실명</th>
            <td>{item.roomtitle || 'X'}</td>
          </tr>
          <tr>
            <th>기준인원</th>
            <td>{item.roombasecount || 'X'}</td>
          </tr>
          <tr>
            <th>객실소개</th>
            <td>{item.roomintro || 'X'}</td>
          </tr>
          <tr>
            <th>비수기주중최소</th>
            <td>{item.roompeakseasonminfee1 || 'X'}</td>
          </tr>
          <tr>
            <th>비수기주말최소</th>
            <td>{item.roomoffseasonminfee2 || 'X'}</td>
          </tr>
          <tr>
            <th>목욕시설</th>
            <td>{item.roombathfacility || 'X'}</td>
          </tr>
          <tr>
            <th>TV</th>
            <td>{item.roomtv || 'X'}</td>
          </tr>
          <tr>
            <th>케이블설치</th>
            <td>{item.roomcable || 'X'}</td>
          </tr>
          <tr>
            <th>냉장고</th>
            <td>{item.roomrefrigerator || 'X'}</td>
          </tr>
          <tr>
            <th>소파</th>
            <td>{item.roomsofa || 'X'}</td>
          </tr>
          <tr>
            <th>취사용품</th>
            <td>{item.roomcook || 'X'}</td>
          </tr>
          <tr>
            <th>테이블</th>
            <td>{item.roomtable || 'X'}</td>
          </tr>
          <tr>
            <th>객실크기</th>
            <td>{item.roomsize2 || 'X'}</td>
          </tr>
          <tr>
            <th>목욕시설</th>
            <td>{item.roombathfacility || 'X'}</td>
          </tr>
          <tr>
            <th>인터넷</th>
            <td>{item.roominternet || 'X'}</td>
          </tr>
          <tr>
            <th>PC</th>
            <td>{item.roompc || 'X'}</td>
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
        <tbody className={styles.info_tbody}>
         {resultOptions}
        </tbody>
      </table>
    </div>
  );
};

export default Info;
