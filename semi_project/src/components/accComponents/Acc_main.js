import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/acc_css/main.module.css';
import Import from '../headerComponents/Import';

export default function Ajax() {
  const service_type = useRef();
  const region_type = useRef();
  const sigungu_select = useRef();
  const keyword = useRef();

  const [service, setService] = useState(''); //분류 타입
  const [region, setRegion] = useState(''); //지역 코드
  const [sigungu, setSigungu] = useState(''); //시군구 코드
  const [arrange, setArrange] = useState(''); //정렬 기준
  const [sigunguOptions, setSigunguOptions] = useState([]); // 시군구 결과
  const [resultOptions, setResultOptions] = useState([]); //api 결과
  const [pageNo, setPageNo] = useState(1); //페이지 번호
  const [total, setTotal] = useState(0);  // 총 결과 수
  const [currentPageGroup, setCurrentPageGroup] = useState(1); //현재 페이지 그룹

  const apiKey = '0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D';

  const fetchApi = useCallback(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${apiKey}&numOfRows=30&MobileApp=AppTest&MobileOS=ETC&_type=json`;

    axios.get(url, {
      params: {
        pageNo: pageNo,
        contentTypeId: 32,
        arrange: arrange,
        cat3: service,
        areaCode: region,
        sigunguCode: sigungu,
      }
    }).then((response) => {
      const data = response.data.response.body.items.item;
      const totalCount = response.data.response.body.totalCount;
      setTotal(totalCount);

      const options = data.map((item) => (
        item.firstimage &&
        <Link
          to={`/accommodation/detail?mapx=${item.mapx}&mapy=${item.mapy}&contentid=${item.contentid}&firstimg=${item.firstimage}`}
          key={item.contentid}
          className={styles.item}
        >
          <img src={item.firstimage} alt={item.title} />
          <p>{item.title}</p>
        </Link>
      ));
      setResultOptions(options);
    }).catch((error) => {
      console.log(error);
    });
  }, [service, region, sigungu, pageNo, arrange]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const fetchSigunguOptions = useCallback(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${apiKey}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    axios.get(url, {
      params: {
        areaCode: region_type.current.value
      }
    }).then((response) => {
      const options = response.data.response.body.items.item.map(item => (
        <option key={item.code} value={item.code}>{item.name}</option>
      ));
      setSigunguOptions(options);
    }).catch(console.log);
  }, []);

  const fetchKeywordApi = useCallback(() => {
    const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&MobileApp=AppTest&MobileOS=ETC&numOfRows=50&listYN=Y&_type=json`;

    axios.get(url, {
      params: {
        pageNo: pageNo,
        contentTypeId: 32,
        keyword: keyword.current.value,
        arrange: arrange
      }
    }).then((response) => {
      const data = response.data.response.body.items.item;
      const options = data.map((item) => (
        item.firstimage &&
        <Link
          to={`/accommodation/detail?mapx=${item.mapx}&mapy=${item.mapy}&contentid=${item.contentid}&firstimg=${item.firstimage}`}
          key={item.contentid}
          className={styles.item}
        >
          <img src={item.firstimage} alt={item.title} />
          <p>{item.title}</p>
        </Link>
      ));
      setResultOptions(options);
    }).catch((error) => {
      console.log(error);
    });
  }, [pageNo, arrange]);

  const handleServiceChange = useCallback(() => {
    setService(service_type.current.value);
  }, []);

  const handleRegionChange = useCallback(() => {
    setRegion(region_type.current.value);
    fetchSigunguOptions();
  }, [fetchSigunguOptions]);

  const handleSigunguChange = useCallback(() => {
    setSigungu(sigungu_select.current.value);
  }, []);

  const handlePageClick = useCallback((pageNo) => {
    setPageNo(pageNo);
  }, []);

  const handleClickFixBtn = useCallback(() => {
    setArrange('C');
  }, []);

  const handleClickTitleBtn = useCallback(() => {
    setArrange('A');
  }, []);

  const handleNextPageGroup = useCallback(() => {
    setCurrentPageGroup(currentPageGroup + 1);
    setPageNo((currentPageGroup * 10) + 1);
  }, [currentPageGroup]);

  const handlePrevPageGroup = useCallback(() => {
    setCurrentPageGroup(currentPageGroup - 1);
    setPageNo((currentPageGroup - 2) * 10 + 1);
  }, [currentPageGroup]);

  const resetClick = () => {
    setService('');
    setRegion('');
    setSigungu('');
    setArrange('');
    setPageNo(1);
    setCurrentPageGroup(1);
    fetchApi();
  }

  const totalPageCount = Math.ceil(total / 30); // 총 페이지 개수
  const startPage = (currentPageGroup - 1) * 10 + 1; //페이지 시작 번호
  const endPage = Math.min(currentPageGroup * 10, totalPageCount); //페이지 마지막 번호

  return (
    <div className={styles.main_container}>
      <Import />
      <div className={styles.container}>
        <form className={styles.search_form}>
          <div className={styles.form_row}>
            <label htmlFor="tour-type">관광타입</label>
            <select id="tour-type" name="tour-type">
              <option value="accommodation">숙박</option>
            </select>
          </div>
          <div className={styles.form_row}>
            <label htmlFor="service-type">숙박 유형</label>
            <select id="service-type" name="service-type" ref={service_type} onChange={handleServiceChange}>
              <option value="">전체</option>
              <option value="B02010100">관광호텔</option>
              <option value="B02010500">콘도미니엄</option>
              <option value="B02010600">유스호스텔</option>
              <option value="B02010700">펜션</option>
              <option value="B02010900">모텔</option>
              <option value="B02011000">민박</option>
              <option value="B02011100">게스트하우스</option>
              <option value="B02011200">홈스테이</option>
              <option value="B02011300">서비스드레지던스</option>
              <option value="B02011600">한옥</option>
            </select>
          </div>
          <div className={styles.form_row}>
            <label htmlFor="region">지역</label>
            <select id="region" name="region" ref={region_type} onChange={handleRegionChange}>
              <option value="">전체</option>
              <option value="1">서울</option>
              <option value="2">인천</option>
              <option value="3">대전</option>
              <option value="4">대구</option>
              <option value="5">광주</option>
              <option value="6">부산</option>
              <option value="7">울산</option>
              <option value="8">세종</option>
              <option value="31">경기</option>
              <option value="32">강원</option>
              <option value="33">충북</option>
              <option value="34">충남</option>
              <option value="35">경북</option>
              <option value="36">경남</option>
              <option value="37">전북</option>
              <option value="38">전남</option>
              <option value="39">제주</option>
            </select>
            <select ref={sigungu_select} onChange={handleSigunguChange}>
              <option value="">선택</option>
              {sigunguOptions}
            </select>
          </div>
          <div className={styles.form_row}>
            <label htmlFor="keyword">검색어</label>
            <input type="text" id="keyword" name="keyword" ref={keyword} />
          </div>
          <div className={styles.form_buttons}>
            <button type="button" onClick={fetchKeywordApi}>검색</button>
            <button type="reset" onClick={resetClick}>초기화</button>
          </div>
        </form>
      </div>
      <div className={styles.sort_buttons}>
          <button type="button" onClick={handleClickFixBtn}>인기순</button>
          <button type="button" onClick={handleClickTitleBtn}>제목순</button>
        </div>
      <div className={styles.item_container}>
        <div className={styles.item_sub_container}>
          {resultOptions}
        </div>
      </div>
      <div className={styles.pagination}>
        {currentPageGroup > 1 && (
          <button onClick={handlePrevPageGroup}>◀</button>
        )}
        {[...Array(endPage - startPage + 1).keys()].map(num => (
          <button
            key={num}
            onClick={() => handlePageClick(startPage + num)}
            className={pageNo === (startPage + num) ? styles.active : ''}
          >
            {startPage + num}
          </button>
        ))}
        {endPage < totalPageCount && (
          <button onClick={handleNextPageGroup}>▶</button>
        )}
      </div>
    </div>
  );
}

