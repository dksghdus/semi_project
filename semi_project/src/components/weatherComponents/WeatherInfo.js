import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast, fetchAirQuality } from './weather';
import '../../css/weather_css/weatherInfo.css';

const weatherStatus = {
  Thunderstorm: { description: '천둥번개', icon: 'flash_on', color: 'purple' },
  Drizzle: { description: '이슬비', icon: 'umbrella', color: 'blue' },
  Rain: { description: '비', icon: 'umbrella', color: 'blue' },
  Snow: { description: '눈', icon: 'ac_unit', color: 'lightblue' },
  Mist: { description: '안개', icon: 'visibility', color: 'grey' },
  Smoke: { description: '연기', icon: 'visibility', color: 'grey' },
  Haze: { description: '연무', icon: 'visibility', color: 'grey' },
  Dust: { description: '먼지', icon: 'visibility', color: 'grey' },
  Fog: { description: '안개', icon: 'visibility', color: 'grey' },
  Sand: { description: '모래', icon: 'visibility', color: 'grey' },
  Ash: { description: '재', icon: 'visibility', color: 'grey' },
  Squall: { description: '돌풍', icon: 'air', color: 'black' },
  Tornado: { description: '토네이도', icon: 'air', color: 'black' },
  Clear: { description: '맑음', icon: 'wb_sunny', color: 'orange' },
  Clouds: { description: '구름', icon: 'cloud', color: 'silver' },
  default: { description: '알 수 없음', icon: 'help_outline', color: 'black' }
};

const airQualityStatus = {
  1: { description: '좋음', color: 'green' },
  2: { description: '보통', color: 'yellow' },
  3: { description: '나쁨', color: 'orange' },
  4: { description: '매우 나쁨', color: 'red' },
  default: { description: '알 수 없음', color: 'grey' }
};

const Weather = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeather(lat, lng);
        setWeatherData(data);
      } catch (error) {
        console.error("날씨 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [lat, lng]);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중...</p>;
  }

  const getWeatherStatus = (weatherId) => weatherStatus[weatherId] || weatherStatus.default;

  return (
    <div className="weather-component">
      <h2>날씨 정보</h2>
      <p>온도: {weatherData.main.temp} °C</p>
      <p>습도: {weatherData.main.humidity} %</p>
      <p>날씨: {getWeatherStatus(weatherData.weather[0].main).description} <i className="material-icons" style={{ color: getWeatherStatus(weatherData.weather[0].main).color }}>{getWeatherStatus(weatherData.weather[0].main).icon}</i></p>
    </div>
  );
};

const AirQuality = ({ lat, lng }) => {
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAirQuality(lat, lng);
        setAirQualityData(data);
      } catch (error) {
        console.error("미세먼지 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [lat, lng]);

  if (!airQualityData) {
    return <p>미세먼지 정보를 불러오는 중...</p>;
  }

  const getAirQualityStatus = (aqi) => airQualityStatus[aqi] || airQualityStatus.default;

  return (
    <div className="weather-component">
      <h2>미세먼지</h2>
      <p>PM10: {airQualityData.list[0].components.pm10} µg/m³</p>
      <p>PM2.5: {airQualityData.list[0].components.pm2_5} µg/m³</p>
      <p>상태: {getAirQualityStatus(airQualityData.list[0].main.aqi).description} <span style={{ color: getAirQualityStatus(airQualityData.list[0].main.aqi).color }}>{getAirQualityStatus(airQualityData.list[0].main.aqi).description}</span></p>
    </div>
  );
};

const Forecast = ({ lat, lng }) => {
  const [forecastData, setForecastData] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];
    return `${month}-${day}(${dayOfWeek})`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchForecast(lat, lng);
        setForecastData(data);
      } catch (error) {
        console.error("단기 예보 정보를 불러오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [lat, lng]);

  if (!forecastData) {
    return <p>단기 예보 정보를 불러오는 중...</p>;
  }

  const dailyForecasts = [];
  const dateMap = {};

  forecastData.list.forEach(forecast => {
    const date = formatDate(forecast.dt).split('(')[0];
    if (!dateMap[date]) {
      dailyForecasts.push(forecast);
      dateMap[date] = true;
    }
  });

  const getWeatherStatus = (weatherId) => weatherStatus[weatherId] || weatherStatus.default;

  return (
    <div className="weather-component">
      <h2>단기 예보</h2>
      <div className="forecast-container">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{formatDate(forecast.dt)}</p>
            <p>온도: {forecast.main.temp} °C</p>
            <p>날씨: {getWeatherStatus(forecast.weather[0].main).description} <i className="material-icons" style={{ color: getWeatherStatus(forecast.weather[0].main).color }}>{getWeatherStatus(forecast.weather[0].main).icon}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherInfo = ({ lat, lng }) => (
  <div className="weather-info-container">
    <Weather lat={lat} lng={lng} />
    <AirQuality lat={lat} lng={lng} />
    <Forecast lat={lat} lng={lng} />
  </div>
);

export default WeatherInfo;
