import { Button, Text } from '@react-email/components';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
};

const StyledButton = ({ children, href }: Props) => (
  <Button
    href={href}
    className="rounded-md bg-amber-800 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
  >
    <Text className="my-0 m-0 py-0 text-white leading-3">{children}</Text>
  </Button>
);

export default StyledButton;
