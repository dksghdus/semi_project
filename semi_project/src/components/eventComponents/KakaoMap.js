import { useEffect } from 'react';

const { kakao } = window;

export default function KakaoMap() {
  const style = {
    width: '600px',
    height: '400px',
    border: '1px solid black',
    margin: '0 auto',
    marginBottom: '20px'
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(36.5, 127.5), // 한국 중심 좌표
      level: 13
    };

    const map = new kakao.maps.Map(container, options);

    // 줌 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // sessionStorage에서 items 값을 가져오기
    const contentId = sessionStorage.getItem('items');
    console.log("받아온 값은 " + contentId);

    if (contentId) {
      // 'contentid=2948590' 형식으로 변환
      const contentIdNumber = contentId.match(/"contentid":"(\d+)"/)?.[1];
      const formattedContentId = `contentId=${contentIdNumber}`;

      const fetchJSONDataAndSetMarker = async () => {
        try {
          const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=0EBdp5WrZ2baysNP1Fy1a5VoSpz9neDto9HUPsTQE2W4itka2h2UzMYDF%2BS6Uv45ikT%2BFEOHqlM530F0DPO9Tw%3D%3D&contentTypeId=15&${formattedContentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&_type=json`;

          const response = await fetch(url); // URL을 인자로 전달
          const json = await response.json();

          console.log("전체 응답 구조:", json);

          if (json.response?.body?.items?.item) {
            let firstItem = json.response.body.items.item[0]; // 예시: 응답 구조에 맞춰서 수정
            console.log("첫 번째 아이템:", firstItem);
            if (firstItem) {
              let mapx = firstItem.mapx;
              let mapy = firstItem.mapy;

              // 마커 생성 함수 호출
              createMarker({ lat: parseFloat(mapy), lng: parseFloat(mapx) });
            }
          } else {
            console.error('No items found in the response');
          }
        } catch (error) {
          console.error('Error fetching JSON data:', error);
        }
      };

      // 마커 생성 함수
      const createMarker = (position) => {
        const markerImage = new kakao.maps.MarkerImage(
          '/img/marker.png', // 마커 이미지 경로 확인
          new kakao.maps.Size(30, 30),
          { offset: new kakao.maps.Point(15, 15) }
        );
        const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });
        marker.setMap(map);

        // 마커 클릭 이벤트 리스너 추가
        kakao.maps.event.addListener(marker, 'click', function() {
          const detailPageUrl = `/detail?lat=${position.lat}&lng=${position.lng}`;
          window.open(detailPageUrl, '_blank');
        });
      };

      // JSON 데이터를 가져와서 마커를 설정
      fetchJSONDataAndSetMarker();
    } else {
      console.error('No items found in sessionStorage');
    }
  }, []);

  return (
    <div>
      <div id="map" style={style}></div>
      <div id="result" style={{ textAlign: 'center', marginTop: '10px' }}></div>
    </div>
  );
}