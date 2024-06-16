import React, { useEffect, useState } from 'react';
import styles from '../../css/event_css/EventInfo.module.css';
import { Link } from 'react-router-dom';
import KakaoMap from './KakaoMap';
import EventHeader from './EeventHeader';

const Event = () => {
  const [images, setImages] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventIntro, setEventIntro] = useState(null);
  const [showDetail, setShowDetail] = useState(true); 
  const [showKakaoMap, setShowKakaoMap] = useState(false);

  useEffect(() => {
    const storedImages = sessionStorage.getItem('images');
    const contentIds = JSON.parse(storedImages);
    console.log('저장된 이미지:', contentIds);

    if (contentIds && contentIds.length > 0) {
      const contentId = `contentId=${contentIds[0]}`; // 첫 번째 contentId 사용
      
      // 상세 정보를 가져오는 URL
      const detailUrl = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&contentTypeId=15&${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;

      // 소개 정보를 가져오는 URL
      const introUrl = `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&${contentId}&contentTypeId=15&_type=json`;

      // 상세 정보 요청 및 상태 업데이트
      fetch(detailUrl)
        .then(response => response.json())
        .then(json => {
          const items = json.response.body.items.item;
          console.log(items)
          setEventDetail(Array.isArray(items) ? items[0] : items);
        })
        .catch(error => console.log('상세 정보 가져오기 실패:', error));

      // 소개 정보 요청 및 상태 업데이트
      fetch(introUrl)
        .then(response => response.json())
        .then(json => {
          const items = json.response.body.items.item;
          console.log(items)
          setEventIntro(Array.isArray(items) ? items[0] : items);
        })
        .catch(error => console.log('소개 정보 가져오기 실패:', error));

      setImages(contentIds);
    }
  }, []);

  // URL 추출 함수는 그대로 유지
  const extractURL = (htmlString) => {
    const urlMatch = htmlString.match(/href="([^"]+)"/);
    return urlMatch ? urlMatch[1] : htmlString;
  };

  const toggleDetailView = () => {
    setShowDetail(true);
    setShowKakaoMap(false); // Kakao Map을 숨김
  };

  const showKakaoMapView = () => {
    setShowDetail(false); // 상세 페이지를 숨김
    setShowKakaoMap(true);
    const dataToStore = { contentid: eventDetail.contentid }; // 예시 데이터
    sessionStorage.setItem('items', JSON.stringify(dataToStore));
    console.log(dataToStore);
  };

  return (
    <div className={styles.detailpage}>
      <EventHeader />
      {eventDetail && (
        <div className={styles.detailpagecontainer}>
            <div className={styles.detailpageMain}>
           
            <div className={styles.detailpageEventImg}>
            <img src={eventDetail.firstimage} alt="이벤트 이미지"/>
             {eventDetail.homepage ? (
            <a
              href={extractURL(eventDetail.homepage)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                textAlign: 'center',
                width: '200px'
              }}
            >
              이벤트 홈페이지 이동
            </a>
          ) : (
            <p>홈페이지 없음</p>
          )}
           </div>
            
           <div className={styles.detailpagedetails1}>
           <h1>{eventDetail.title || '제목 없음'}</h1>
            <div>
              <p className={styles.detailpagedetailsTitle}>행사기간</p>
              <p>{eventIntro?.eventstartdate || '행사시작일 알수없음'} ~ {eventIntro?.eventenddate || '행사종료일 알수없음'}</p>
           </div>
          <div>
             <p className={styles.detailpagedetailsTitle}>행사장소</p>
             <p>{eventIntro?.eventplace || ''}</p>
          </div>
          <div>
          <p className={styles.detailpagedetailsTitle}>주소</p>
          <p>{eventDetail.addr1 || ''}</p>
      </div>
         <div>
             <p className={styles.detailpagedetailsTitle}>행사요금</p>
             <p dangerouslySetInnerHTML={{ __html: eventIntro?.usetimefestival || '정보 없음'}}></p>
         </div>
        <div>
             <p className={styles.detailpagedetailsTitle}>행사시간</p>
             <p dangerouslySetInnerHTML={{ __html: eventIntro?.playtime || ''}}></p>
        </div>
        </div>
    </div>      

   {/* 상세 페이지 버튼 */}
   <button 
    onClick={toggleDetailView} 
    className={showDetail ? styles.activeButton : styles.inactiveButton}
    >
    상세 보기
   </button>
   <button 
    onClick={showKakaoMapView} 
    className={showKakaoMap ? styles.activeButton : styles.inactiveButton}
     >
     지도 보기
     </button>


          {showDetail && (
            <div  className={styles.detailpagedetails2}>
              

              <div>
              <p className={styles.detailpagedetailsTitle}>전화번호</p>
              <p>{eventDetail.tel || ''}</p>
              </div>
              
              <div>
              <p className={styles.detailpagedetailsTitle}>행사개요</p>
              <p dangerouslySetInnerHTML={{ __html: eventDetail.overview || '개요 없음' }}></p>
              </div>

              <div>
              <p className={styles.detailpagedetailsTitle}>주최지</p>
              <p >{eventIntro?.sponsor1|| '개최지없음' }</p>
              </div>
              <div>
              <p className={styles.detailpagedetailsTitle}>주관사</p>
              <p >{eventIntro?.sponsor2|| '개최지없음' }</p>
              </div>
             
              <div>
           <Link to="/eventinfo">
           <button className={styles.mainbtn}>행사메인페이지 이동</button>
           </Link>      
           </div>
            </div>
          
          )}
     {showKakaoMap && 
      <div  className={styles.detailpagedetails}>
              

      <div>
      <p className={styles.detailpagedetailsTitle}>주소:</p>
      <p>{eventDetail.addr1 || ''}</p>
      </div>
     <KakaoMap />
            <div>
           <Link to="/eventinfo">
           <button className={styles.mainbtn}>행사메인페이지 이동</button>
           </Link>      
           </div>
           
     </div>
     }


        
        </div>
       
      )}
      {/* {!eventDetail && <p>전달된 텍스트: {images ? images.join(', ') : '없음'}</p>} */}
      
    </div>
  );
};

export default Event;