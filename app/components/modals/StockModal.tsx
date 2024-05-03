'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useStockModal from '@/app/hooks/useStockModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Select from '../inputs/Select';
import useScenarioStore, { ScenarioState, StockRowType } from '@/app/hooks/useScenarioStore';
import { Stock, Event } from '@/app/types/ScenarioTypes';

const StockModal = () => {
  const StockModal = useStockModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data, addScenario, scenarios, setData } = useScenarioStore();

  const options: Stock[] = [
    { id: 'AAPL', title: 'Apple' },
    { id: 'META', title: 'Meta' },
    { id: 'MSFT', title: 'Microsoft' },
    { id: 'NVDA', title: 'Nvidia' },
    { id: 'TSLA', title: 'Tesla' },
  ];

  const addStock = (stockId: string, stockTitle: string) => {
    console.log('Adding stock', stockId, stockTitle);
    console.log('Current data:', data);
    console.log('scenarios:', scenarios);

    const events = scenarios[0].flatMap((scenario) => scenario.event);
    const rowIdx = scenarios.length;
    console.log('Current events:', events);

    //Add new scenarios
    if (events) {
      events.forEach((event: any, idx: number) => {
        console.log('Adding scenario for column:', event, 'col index', idx, 'row index', rowIdx);
        const newStock: Stock = { id: stockId, title: stockTitle };
        addScenario({
          rowIdx: rowIdx,
          colIdx: idx,
          scenario: {
            event: event,
            stock: newStock,
            state: ScenarioState.READY,
            detail: { header: [], data: [] },
            references: [],
          },
        });
      });
    }

    const newRowData: StockRowType = {
      id: stockId,
      title: stockTitle,
      ...(events &&
        events.reduce(
          (acc, event) => {
            acc[event.id] = event;
            return acc;
          },
          {} as { [eventId: string]: Event }
        )), // Conditional spreading
    };

    console.log('New row data:', newRowData);

    // Assuming setData is a function to update your data state
    setData([...data, newRowData]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      stock: options[0],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      addStock(data.stock.id, data.stock.title);
      toast.success('Added Stock!');
      StockModal.onClose();
    } catch (error) {
      toast.error('Add stock failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add Stock" subtitle="" center />
      <Select
        id="stock"
        disabled={isLoading}
        register={register}
        errors={errors}
        options={options}
        required
        callback={(option: Stock) => {
          setValue('stock', { id: option.id, title: option.title });
        }}
      />
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={StockModal.isOpen}
      title=""
      actionLabel="Add Stock"
      onClose={StockModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default StockModal;
