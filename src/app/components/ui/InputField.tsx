'use client';

import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = ({ label, error, ...props }: InputFieldProps) => {
  return (
    <div className="mb-8 flex flex-col gap-y-2">
      <label className="block text-sm font-medium text-white/70 mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-5 py-3 border border-white/20 rounded-md focus:outline-none focus:border-2 text-white/80 ${
          error ? 'border-red-500' : 'border-gray-300 '
        }`}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};
