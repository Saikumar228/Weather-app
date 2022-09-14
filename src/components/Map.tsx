import { googleMapAPI } from '../helpers/Api';

interface Citytype {
  city: string;
}

export const Map = ({ city }: Citytype): JSX.Element => {
  return (
    <div>
      <iframe
        title="unique map"
        width="100%"
        height="300"
        loading="lazy"
        allowFullScreen={true}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${googleMapAPI}&q=${city}`}
      />
    </div>
  );
};
