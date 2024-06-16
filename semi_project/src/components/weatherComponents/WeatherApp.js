import React, { useState } from 'react';
import MapComponent from './MapComponent';
import WeatherInfo from './WeatherInfo';

const WeatherApp = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MapComponent onSelect={setSelectedLocation} />
      {selectedLocation && (
        <div style={{ flexGrow: 1 }}>
          <WeatherInfo lat={selectedLocation.lat} lng={selectedLocation.lng} />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
