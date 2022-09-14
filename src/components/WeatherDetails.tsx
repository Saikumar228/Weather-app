import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/provider';
import { Newbox, Mapbox } from './SmallComponents';
import { Map } from './Map';
import { FaSyncAlt } from 'react-icons/fa';
import { Forcast } from './Forcast';
import { getWeatherByLocation, syncData } from '../context/actions';
import { celsius } from '../helpers/ExtraFunctions';
import { getItem } from '../helpers/SessionStorage';
import { Loading } from './Loading';
import { Error } from './Error';

type WeatherDataType = any;

const WeatherDetails = () => {
  const [isRotate, setIsRotate] = useState(false);

  const weatherObject: {
    weatherState?: Record<string, unknown>;
    weatherDispatch?: Function;
  } = useContext(GlobalContext);
  const { weatherState } = weatherObject;
  const weatherData: WeatherDataType = weatherState?.weatherData;
  const forcastData: any = weatherState?.forcastData;
  const isLoading: any = weatherState?.isLoading;
  const isError: any = weatherState?.isError;

  useEffect(() => {
    const weather = getItem('weather');
    !weather && getWeatherByLocation()(weatherObject.weatherDispatch!);
  }, []);

  const handleSyncData = () => {
    setIsRotate(true);
    syncData(weatherData?.name!)(weatherObject.weatherDispatch!);
  };
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <div className="details-card">
        <div className="first-row">
          <Newbox>
            <div className="location-card">
              <div className="d-flex justify-content-end">
                <FaSyncAlt
                  onClick={handleSyncData}
                  className={
                    isRotate ? 'refresh-icon iconRotate' : 'refresh-icon'
                  }
                  onAnimationEnd={() => {
                    setIsRotate(false);
                  }}
                />
              </div>
              <h1 className="location-heading">{weatherData.name}</h1>
              <h1 className="temp-degree">
                {Math.round(weatherData.main.temp - 273)}
                <sup>o</sup>C
              </h1>
              <h1 className="location-heading">
                {weatherData.weather[0].main}
              </h1>
            </div>
          </Newbox>
          <Newbox>
            <div className="temp-details-container">
              <div className="temp-details-card">
                <p className="temp-details">Felt Temp</p>
                <p className="temp-details">Humdity</p>
                <p className="temp-details">Wind</p>
                <p className="temp-details">Visibility</p>
                <p className="temp-details">Max Temp</p>
                <p className="temp-details">Min Temp</p>
              </div>
              <div className="temp-details-card-2">
                <p className="temp-details-2">
                  {celsius(weatherData.main.feels_like)}
                  <sup>o</sup> C
                </p>
                <p className="temp-details-2">{weatherData.main.humidity}%</p>
                <p className="temp-details-2">
                  {(weatherData.wind.speed * 3.6).toFixed(2)} Km/h
                </p>
                <p className="temp-details-2">
                  {(weatherData.visibility * 0.001).toFixed(2)}5.00 Km
                </p>
                <p className="temp-details-2">
                  {celsius(weatherData.main.temp_max)}
                  <sup>o</sup> C
                </p>
                <p className="temp-details-2">
                  {celsius(weatherData.main.temp_min)}
                  <sup>o</sup> C
                </p>
              </div>
            </div>
          </Newbox>
          <Mapbox>
            <Map city={weatherData.name} />
          </Mapbox>
        </div>
        <div className="second-row">
          {forcastData.map((e: any, i: any) => (
            <Forcast key={i} data={e} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
