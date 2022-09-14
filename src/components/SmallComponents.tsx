import React from 'react';
import { Container } from 'reactstrap';

interface NewboxChildren {
  children: React.ReactNode;
}

export const ForcastBox = ({ children }: NewboxChildren): JSX.Element => {
  return <Container className="zoom forcast-card">{children}</Container>;
};

export const Newbox = ({ children }: NewboxChildren): JSX.Element => {
  return <Container className="zoom location-container">{children}</Container>;
};
export const Mapbox = ({ children }: NewboxChildren): JSX.Element => {
  return <Container className="zoom map-container">{children}</Container>;
};

export const NewText = (): JSX.Element => {
  return <Container />;
};
