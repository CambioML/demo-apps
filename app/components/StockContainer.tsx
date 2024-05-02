import { Plus } from '@phosphor-icons/react';
import IconButton from './IconButton';

const rowHeight = 'h-[100px]';

const stocks = ['S&P 500'];

const StockContainer = () => {
  return (
    <div className="bg-green-100 flex flex-col items-center justify-start p-4">
      {stocks.map((stock, index) => (
        <div key={index} className={`p-2 bg-white flex items-center justify-center rounded-lg m-2 ${rowHeight} w-full`}>
          {stocks}
        </div>
      ))}
      <div className="w-full">
        <IconButton icon={Plus} onClick={() => console.log('add')} />
      </div>
    </div>
  );
};

export default StockContainer;
