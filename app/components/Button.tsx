'use client';

import { Icon } from '@phosphor-icons/react';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: Icon;
  labelIcon?: Icon;
}

const Button = ({ label, onClick, disabled, outline, small, icon: Icon, labelIcon: LabelIcon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-xl
        hover:bg-sky-600
        hover:text-white
        transition
        w-full
        ${outline ? 'bg-inherit' : 'bg-sky-300'}
        ${outline ? 'border-gray-200' : 'border-gray-500'}
        ${outline ? 'text-black' : 'text-gray-800'}
        ${small ? 'py-3' : 'py-4'}
        ${small ? 'text-lg' : 'text-3xl'}
        ${small ? 'border-[1px]' : 'border-2'}
        font-semibold
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      <div className="flex items-center justify-center gap-2">
        <span>{label} </span>
        {LabelIcon && <LabelIcon size={24} className="" />}
      </div>
    </button>
  );
};

export default Button;
