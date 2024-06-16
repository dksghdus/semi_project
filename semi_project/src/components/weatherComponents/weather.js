// src/api/weather.js
const API_KEY = '010cdb9598dff913d635767ad65063af'; // 여기에 본인의 API 키를 넣으세요.

export const fetchWeather = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('날씨 정보를 가져오는 동안 에러가 발생했습니다:', error.message);
    return null;
  }
};

export const fetchForecast = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('단기예보 정보를 가져오는데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('단기예보 정보를 가져오는 동안 에러가 발생했습니다:', error.message);
    return null;
  }
};

export const fetchAirQuality = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('미세먼지 데이터를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('미세먼지 데이터를 가져오는 동안 에러가 발생했습니다:', error.message);
    return null;
  }
};
