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
  const hasCustomHover = className.includes('hover:');

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 md:px-8 py-2 rounded-3xl text-white bg-[#E58E27] transition duration-200 cursor-pointer font-semibold ${
        hasCustomHover ? '' : 'hover:bg-[#ffffff] hover:text-[#E58E27]'
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
