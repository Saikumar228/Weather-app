import React, { useState } from 'react';
import { ImSun } from 'react-icons/im';
import { dateFormat } from '../helpers/ExtraFunctions';
import { MdOutlineNightsStay } from 'react-icons/md';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface ForcastDataType {
  data: any;
}

export const ForcastModal = ({ data }: ForcastDataType): JSX.Element => {
  const { date, day } = dateFormat(data.dt);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <div className="temp-text-card" onClick={toggle}>
        <p className="temp-text">
          <ImSun /> {Math.round(data.temp.day)}
          <sup>o</sup> C
        </p>
        <p className="temp-text">
          <MdOutlineNightsStay /> {Math.round(data.temp.night)}
          <sup>o</sup> C
        </p>
        <p className="temp-text2">{data.weather[0].main}</p>
      </div>
      <div>
        <Modal
          isOpen={modal}
          toggle={toggle}
          className="modal-details"
          backdrop={true}
        >
          <ModalHeader className="modal-header-close" toggle={toggle} />
          <ModalBody>
            <div>
              <div className="modal-date-day-card">
                <p className="date-text">{date}</p>
                <p className="date-text">{day}</p>
              </div>
              <div className="temp-details-container">
                <div className="temp-details-card">
                  {[
                    'Felt Temp.',
                    'Humidity',
                    'Wind',
                    'Pressure',
                    'Day Temp.',
                    'Evening Temp.',
                    'Night Temp.',
                    'Max Temp.',
                    'Min Temp.',
                  ].map(
                    (e, i): JSX.Element => (
                      <p key={i} className="temp-details">
                        {e}
                      </p>
                    )
                  )}
                </div>
                <div className="temp-details-card-2">
                  <p className="temp-details-2">
                    {data?.feels_like?.day}
                    <sup>o</sup>
                  </p>
                  <p className="temp-details-2">{data?.humidity}%</p>
                  <p className="temp-details-2">
                    {data?.wind_speed && (data.wind_speed * 3.6).toFixed(2)}{' '}
                    Km/h
                  </p>
                  <p className="temp-details-2">{data?.pressure} hPa</p>
                  <p className="temp-details-2">
                    {data?.temp.day}
                    <sup>o</sup>
                  </p>
                  <p className="temp-details-2">
                    {data?.temp.eve}
                    <sup>o</sup>
                  </p>
                  <p className="temp-details-2">
                    {data?.temp.night}
                    <sup>o</sup>
                  </p>
                  <p className="temp-details-2">
                    {data?.temp.min}
                    <sup>o</sup>
                  </p>
                  <p className="temp-details-2">
                    {data?.temp.max}
                    <sup>o</sup>
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="modal-bottom-close" />
        </Modal>
      </div>
    </>
  );
};
