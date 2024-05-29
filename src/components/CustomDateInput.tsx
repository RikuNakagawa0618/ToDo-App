import React from 'react';
import { Input } from '@chakra-ui/react';

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({ value, onClick }) => {
  return (
    <Input
      value={value}
      onClick={onClick}
      readOnly
      placeholder="期限"
    />
  );
};

export default CustomDateInput;
