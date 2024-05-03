'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useEventModal from '@/app/hooks/useEventModal';
import FormModal from './FormModal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import useScenarioStore, { ScenarioState, columnHelper } from '@/app/hooks/useScenarioStore';
import ScenarioCell from '../ScenarioTable/ScenarioCell';
import { Event, Stock } from '@/app/types/ScenarioTypes';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import Button from '../Button';

const EventModal = () => {
  const EventModal = useEventModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data, columns, setData, setColumns, addScenario } = useScenarioStore();

  const exampleEvents = [
    {
      title: 'Taiwan-China Conflict',
      description:
        'A conflict between China and Taiwan that destabilizes global markets, disrupts supply chains, and strains diplomatic relations, as major powers navigate between supporting their allies and maintaining economic stability.',
    },
    {
      title: 'New Global Pandemic',
      description:
        'A new global pandemic with widespread panic, overwhelming healthcare systems, triggering economic downturns, and necessitating swift international cooperation to contain the spread and develop effective treatments or vaccines.',
    },
    {
      title: 'Israel-Palestine War',
      description:
        'The Israel-Palestine war escalates and involves widespread conflict in the Middle East with Western involvement',
    },
  ];

  const addColumn = (colId: string, col_name: string, col_desc: string) => {
    const colIdx = columns.length - 1;
    const newEvent: Event = { id: colId, title: col_name, description: col_desc };
    data.forEach((row, idx) => {
      const newStock: Stock = { id: row.id, title: row.name };
      addScenario({
        rowIdx: idx,
        colIdx,
        scenario: {
          event: newEvent,
          stock: newStock,
          state: ScenarioState.READY,
          detail: { header: [], data: [] },
          references: [],
        },
      });
    });
    const newColumn = columnHelper.accessor(colId, {
      header: () => col_name,
      cell: ({ row, column }) => {
        return (
          <ScenarioCell colId={colId} colIdx={column.getIndex() - 1} rowIdx={row.index}>
            View Risk
          </ScenarioCell>
        );
      },
    });

    // Update state with new column
    setColumns([...columns, newColumn]);

    // Update data state to include default value for each row in the new column
    setData(data.map((row) => ({ ...row, [colId]: newEvent })));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function generateId(title: string): string {
    const cleanedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '_');
    const formattedTitle = cleanedTitle.replace(/\s+/g, '_').toLowerCase();
    return formattedTitle;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const id = generateId(data.title);
      setIsLoading(true);
      addColumn(id, data.title, data.description);
      toast.success('Added Event!');
      EventModal.onClose();
      reset();
    } catch (error) {
      toast.error('Event add failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (title: string, description: string) => {
    setValue('title', title);
    setValue('description', description);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Add Event" subtitle="" center />
      <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="w-full flex gap-4 border-b-2 p-2">
        {exampleEvents.map((event, idx) => (
          <Button
            key={idx}
            onClick={() => handleExampleClick(event.title, event.description)}
            small
            label={event.title}
          />
        ))}
      </div>
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={EventModal.isOpen}
      title=""
      actionLabel="Add Event"
      onClose={EventModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EventModal;
