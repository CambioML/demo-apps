import { Stock } from '@/app/types/ScenarioTypes';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface SelectProps {
  id: string;
  options: Stock[];
  optionLabel?: string;
  callback?: (option: Stock) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
}

const Select = ({ id, options, disabled = false, callback, optionLabel, register, required }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register('stock', { required });
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleStockClick = (option: Stock) => {
    setSelectedStock(option);
    if (callback) {
      callback(option);
    }
    setIsOpen(false);
  };

  return (
    <div id={id} className={`relative ${disabled ? 'pointer-events-none opacity-50' : ''}`} ref={selectRef}>
      <div className="bg-white border border-gray-300 rounded-md cursor-pointer w-full" onClick={toggleDropdown}>
        <div className="p-2 mr-8 overflow-hidden">
          {selectedStock ? selectedStock.title : optionLabel ? optionLabel : 'Select a stock.'}
        </div>
        {isOpen ? (
          <CaretUp size={24} className="absolute right-2 top-2" />
        ) : (
          <CaretDown size={24} className="absolute right-2 top-2" />
        )}
      </div>
      {isOpen && !disabled && (
        <div
          className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto`}
          style={{ top: selectRef.current ? selectRef.current.clientHeight + 2 : 'auto' }}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-100 overflow-hidden truncate"
              onClick={() => handleStockClick(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
