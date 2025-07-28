import { Img } from '@react-email/components';
import React from 'react';

const baseUrl = `https://azelysse.fr/images`;

type Props = {
  center?: boolean;
  name: string;
  size?: number;
  alt?: string;
};

const Icon = ({ center, name, size = 24, alt }: Props) => {
  return (
    <Img src={baseUrl + `/${name}.png`} width={size} alt={alt} className={center ? 'm-auto' : ''} />
  );
};

export default Icon;
