import { useContext, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { Button, Input } from 'reactstrap';
import { getWeatherByCity, getWeatherByLocation } from '../context/actions';
import { GlobalContext } from '../context/provider';

type Citytype = string;

function Navbar(): JSX.Element {
  const weatherObject: {
    weatherState?: Record<string, unknown>;
    weatherDispatch?: Function;
  } = useContext(GlobalContext);
  const [city, setCity] = useState<Citytype>('');

  const handleWeatherByCity = () => {
    getWeatherByCity(city)(weatherObject.weatherDispatch!);
  };
  const handleLocationData = () => {
    getWeatherByLocation()(weatherObject.weatherDispatch!);
  };
  return (
    <div className="nabar-header">
      <div className="serach-card">
        <Input
          onKeyPress={({ key }) => {
            key === 'Enter' ? handleWeatherByCity() : undefined;
          }}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
          className="search-input"
          placeholder="City"
        />
        <Button onClick={handleWeatherByCity} className="search-button">
          Search
        </Button>
      </div>
      <div className="your-location-card">
        <Button onClick={handleLocationData} className="weather-button">
          <HiLocationMarker className="location-icon" />
          Your Location Weather
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
