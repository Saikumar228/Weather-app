import { Container } from 'reactstrap';

export const Error = (): JSX.Element => {
  return (
    <Container className="error-weather">
      <img src="/images/Error.gif" alt="" className="error-image" />
    </Container>
  );
};
