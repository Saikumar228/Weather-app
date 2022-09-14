import { Container } from 'reactstrap';
import { ThreeDots } from 'react-loader-spinner';

export const Loading = (): JSX.Element => {
  return (
    <Container className="loading-container" style={{ height: '80vh' }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#5e82f4"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        // wrapperClassName=""
        visible={true}
      />
    </Container>
  );
};
