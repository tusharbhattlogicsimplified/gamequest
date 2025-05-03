import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 md:px-8 py-2 rounded-3xl text-white bg-[#E58E27] hover:bg-[#cf7d1d] transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
