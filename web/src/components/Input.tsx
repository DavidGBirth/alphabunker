import { FocusEventHandler } from 'react';

interface PropTypes {
  placeholder: string;
  color?: string;
  type: 'text' | 'password' | 'email' | 'date';
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const Input = ({
  placeholder,
  color,
  type,
  onBlur,
  value,
}: PropTypes) => {
  return (
    <input
      className="w-[60%] text-input-placeholder rounded-lg p-1"
      type={type}
      color={color}
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
    />
  );
};
