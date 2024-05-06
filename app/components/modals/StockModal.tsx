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
  const { data, addScenario, scenarios, setData, updateScenario } = useScenarioStore();

  const options: Stock[] = [
    { id: 'AAPL', title: 'Apple' },
    { id: 'META', title: 'Meta' },
    { id: 'MSFT', title: 'Microsoft' },
    { id: 'NVDA', title: 'Nvidia' },
    { id: 'TSLA', title: 'Tesla' },
  ];

  const addStock = (stockId: string, stockTitle: string) => {
    let events: Event[] = [];
    let newRowData: StockRowType;

    if (data.length === 0) {
      if (scenarios.length === 0) {
        console.log('Adding first stock without any events');
        newRowData = {
          id: stockId,
          title: stockTitle,
        };
      } else {
        const initScenario = scenarios[0][0];
        initScenario.stock = { id: stockId, title: stockTitle };
        newRowData = {
          id: stockId,
          title: stockTitle,
          [initScenario.event.id]: initScenario.event,
        };
        updateScenario({ rowIdx: 0, colIdx: 0, newScenario: initScenario });
      }
    } else {
      if (scenarios[0] !== undefined) {
        events = scenarios[0].flatMap((scenario) => scenario.event);
      }
      const rowIdx = scenarios.length;

      if (events) {
        events.forEach((event: any, idx: number) => {
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

      newRowData = {
        id: stockId,
        title: stockTitle,
        ...(events.length > 0 &&
          events.reduce(
            (acc, event) => {
              acc[event.id] = event;
              return acc;
            },
            {} as { [eventId: string]: Event }
          )),
      };
    }

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
