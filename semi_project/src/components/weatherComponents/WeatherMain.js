import React, { useState } from 'react';
import MapComponent from './MapComponent';
import WeatherInfo from './WeatherInfo';
import Import from '../headerComponents/Import';

const WeatherMain = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setClickedLocation(location);
  };

  return (
    <div>
      <Import/> 
      <MapComponent onSelect={handleLocationSelect} />
      {clickedLocation && <WeatherInfo lat={clickedLocation.lat} lng={clickedLocation.lng} />}
    </div>
  );
};

export default WeatherMain;
