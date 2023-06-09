import React from 'react';

export interface InputProps {
  type: 'text' | 'password';
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  name,
  placeholder,
  value,
  handleChange
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="input input-bordered focus:outline-blue-500"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
