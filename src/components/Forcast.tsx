import { dateFormat } from '../helpers/ExtraFunctions';
import { ForcastModal } from './ForcastModal';
import { ForcastBox } from './WeatherCards';

interface ForcastDataType {
  key: number;
  data: any;
}

export const Forcast = ({ key, data }: ForcastDataType): JSX.Element => {
  const { date, day } = dateFormat(data.dt);
  return (
    <>
      <ForcastBox>
        <div className="date-day-card">
          <p className="date-text">{date}</p>
          <p className="date-text">{day}</p>
        </div>

        <ForcastModal data={data} />
      </ForcastBox>
    </>
  );
};
