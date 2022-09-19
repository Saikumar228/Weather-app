import axios from 'axios';
import { weatherAppAPI } from '../helpers/Api';
import { setItem } from '../helpers/SessionStorage';
import {
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from './actionTypes';
import { notificationHandler } from '../helpers/NotificationHandler';

export const getDataLoading = () => {
  return { type: GET_DATA_LOADING };
};

export const getDataSuccess = (payload: {
  weatherData?: object;
  forcastData?: object;
}) => {
  return { type: GET_DATA_SUCCESS, payload };
};

export const getDataError = () => {
  return { type: GET_DATA_ERROR };
};

export const getWeatherByLocation = () => (dispatch: Function) => {
  const success = async (position: any) => {
    const { latitude, longitude } = position?.coords;
    dispatch(getDataLoading());
    await axios
      .get(`/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`)
      .then(async (res) => {
        let weatherData = res;
        let forcastData;
        const { lon, lat } = weatherData.data.coord;
        weatherData = weatherData.data;
        await axios
          .get(
            `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
          )
          .then((res) => {
            forcastData = res.data.daily;
          });
        const payload = { weatherData, forcastData };
        dispatch(getDataSuccess(payload));
        setItem('weather', payload);
        notificationHandler('Your location weather updated', 'success');
      })
      .catch((err) => {
        dispatch(getDataError());
        notificationHandler('Your location weather not updated', 'error');
      });
  };

  const error = (err: any) => {
    notificationHandler('Please turn on your location', 'error');
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

export const getWeatherByCity =
  (city: string) => async (dispatch: Function) => {
    dispatch(getDataLoading());

    await axios
      .get(`/weather?q=${city}&appid=${weatherAppAPI}`)
      .then(async (res) => {
        let weatherData = res;
        let forcastData;
        const { lon, lat } = weatherData.data.coord;
        weatherData = weatherData.data;
        await axios
          .get(
            `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
          )
          .then((res) => {
            forcastData = res.data.daily;
          });
        const payload = { weatherData, forcastData };
        dispatch(getDataSuccess(payload));
        setItem('weather', payload);
        notificationHandler('City weather data updated', 'success');
      })
      .catch((err) => {
        dispatch(getDataError());
        notificationHandler("City weather data doesn't exist", 'error');
      });
  };

export const syncData = (city: string) => async (dispatch: Function) => {
  await axios
    .get(`/weather?q=${city}&appid=${weatherAppAPI}`)
    .then(async (res) => {
      let weatherData = res;
      let forcastData;
      const { lon, lat } = weatherData.data.coord;
      weatherData = weatherData.data;
      await axios
        .get(
          `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
        )
        .then((res) => {
          forcastData = res.data.daily;
        });
      const payload = { weatherData, forcastData };
      dispatch(getDataSuccess(payload));
      setItem('weather', payload);
      notificationHandler('Data sync successfully', 'success');
    })
    .catch((err) => {
      dispatch(getDataError());
      notificationHandler("City weather data doesn't exist", 'error');
    });
};
