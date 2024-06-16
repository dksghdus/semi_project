import { useEffect } from 'react';
const { kakao } = window;

export default function KakaoMap(props) {
  const {mapx , mapy} = props

  const style = {
    width : '1100px',
    height : '500px',
    border: '1px solid black',
    margin : '0 auto'
    };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(mapy, mapx),
      level: 3
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

    // 마커 위치 배열
    const positions = [
      { lat: mapy, lng: mapx },
    ];

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

    // 마커 생성
    positions.forEach(position => createMarker(position));


  }, []);


  return (
    <div>
      <div id="map" style={style}></div>
      <div id="result" style={{ textAlign: 'center', marginTop: '10px' }}></div>
    </div>
  );
}
