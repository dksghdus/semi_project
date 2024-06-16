import { useEffect } from 'react';
const { kakao } = window;

export default function KakaoMap() {
  const style = {
    width: '935px',
    height: '400px',
    margin: '0 auto',
    marginBottom: '20px',
    borderRadius: '20px',
    border: '5px  solid #91BCFD',
    boxShadow: '0 0 1px 1px (0, 0, 0, 0.5)',
    marginTop: '20px'
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5749533740, 126.9844146882),
      level: 9
    };

const map = new kakao.maps.Map(container, options);

 // 줌 컨트롤 추가
 const zoomControl = new kakao.maps.ZoomControl();
 map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
 
 // 줌 이벤트 리스너 추가
 kakao.maps.event.addListener(map, 'zoom_changed', function() {
   const level = map.getLevel();
   const resultDiv = document.getElementById('result');
 });

 const fetchXMLDataAndSetMarkers = async () => {
  try {
    const response = await fetch('http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=2eJNLG0q8CNPigYjQccFbSum0D2H%2FhIzjcJT9sApe3OE1RDRSTngSIGA86xL9V7mVAcSxOc7chToCtg%2FwtuCSg%3D%3D&pageNo=1&numOfRows=100&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=39');
    const text = await response.text();
    // 텍스트를 XML로 변환
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text, 'text/xml');

    // 각 레코드를 순회하며 마커를 생성
    let records = xmlDoc.querySelectorAll('item');
    records.forEach((item) => {
      let mapx = item.querySelector('mapx').textContent;
      let mapy = item.querySelector('mapy').textContent;

      // 마커 생성 함수 호출
      createMarker({ lat: parseFloat(mapy), lng: parseFloat(mapx) });
    });
  } catch (error) {
    console.error('Error fetching XML data:', error);
  }
};

// 마커 생성 함수
const createMarker = (position) => {
  const markerImage = new kakao.maps.MarkerImage(
    '/img/marker.png',
    new kakao.maps.Size(30, 30),
    { offset: new kakao.maps.Point(15, 15) }
  );
  const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  });
  marker.setMap(map);
};

// XML 데이터를 가져와서 마커를 설정
fetchXMLDataAndSetMarkers();
  }, []);

  return (
    <div>
      <div id="map" style={style}></div>
      <div id="result" style={{ textAlign: 'center', marginTop: '10px' }}></div>
    </div>
  );
}