import React, { useEffect } from 'react';
import '../../css/weather_css/mapComponent.css';

const MapComponent = ({ onSelect }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=125c593d324800770d851381c479d5cc&libraries=services';
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (container) {
            const options = {
              center: new window.kakao.maps.LatLng(36.5, 127.5), // 한국 중심 좌표
              level: 13, // 확대 수준 조정
            };
            const map = new window.kakao.maps.Map(container, options);

            // 주요 도시 데이터
            const cities = [
              { name: '서울', lat: 37.5665, lng: 126.9780 },
              { name: '부산', lat: 35.1796, lng: 129.0756 },
              { name: '대구', lat: 35.8722, lng: 128.6018 },
              { name: '인천', lat: 37.4563, lng: 126.7052 },
              { name: '광주', lat: 35.1595, lng: 126.8526 },
              { name: '대전', lat: 36.3504, lng: 127.3845 },
              { name: '울산', lat: 35.5397, lng: 129.3114 },
              { name: '세종', lat: 36.4800, lng: 127.2890 },
              { name: '경기', lat: 37.4138, lng: 127.5183 },
              { name: '강원', lat: 37.8228, lng: 128.1555 },
              { name: '충북', lat: 36.6358, lng: 127.4913 },
              { name: '충남', lat: 36.6588, lng: 126.6728 },
              { name: '전북', lat: 35.7175, lng: 127.1530 },
              { name: '전남', lat: 34.8679, lng: 126.9910 },
              { name: '경북', lat: 36.5760, lng: 128.5056 },
              { name: '경남', lat: 35.2383, lng: 128.6921 },
              { name: '제주', lat: 33.4996, lng: 126.5312 }
              // 다른 도시 데이터 추가
            ];

            // 도시별 커스텀 오버레이 생성 및 이벤트 리스너 추가
            cities.forEach((city) => {
              const markerPosition = new window.kakao.maps.LatLng(city.lat, city.lng);

              // 마커에 표시할 커스텀 오버레이 생성
              const content = document.createElement('div');
              content.className = 'label';
              content.innerHTML = `<span class="left"></span><span class="center">${city.name}</span><span class="right"></span>`;
              content.onclick = () => {
                onSelect({ lat: city.lat, lng: city.lng, name: city.name });
              };

              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: markerPosition,
                content: content
              });

              customOverlay.setMap(map); // 지도에 커스텀 오버레이를 표시합니다
            });
          }
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [onSelect]);

  return <div id="map" style={{ width: '100%', height: '50vh' }}></div>;
};

export default MapComponent;
