import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import useEventModal from '@/app/hooks/useEventModal';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import { ChartLine, NewspaperClipping, Plus } from '@phosphor-icons/react';
import useStockModal from '@/app/hooks/useStockModal';
import Button from '../Button';

const ScenarioTable: React.FC = () => {
  const { data, columns, scenarios } = useScenarioStore();
  const eventModal = useEventModal();
  const stockModal = useStockModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={`w-full h-full flex flex-col items-start ${scenarios.length === 0 && data.length === 0 ? 'justify-center' : 'justify-start'} gap-4`}
    >
      {(scenarios.length > 0 || data.length > 0) && (
        <div className="h-full w-fit overflow-scroll">
          <table className="border-separate">
            <thead className="text-lg">
              {table.getHeaderGroups().map((headerGroup: any) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any, idx: number) => {
                      return (
                        <th
                          scope="col"
                          key={header.id}
                          className={`px-4 py-3 m-8 sticky z-20 top-0 bg-neutral-100 rounded-md w-[150px] ${idx === 0 && 'sticky left-0 z-30 bg-neutral-200 border-r-2'}`}
                        >
                          {header.isPlaceholder ? null : (
                            <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody className="bg-white text-lg">
              {table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} className="group">
                  {row.getVisibleCells().map((cell: any, idx: number) => {
                    return (
                      <td
                        key={cell.id}
                        className={`whitespace-nowrap w-full rounded-md ${idx === 0 && 'px-4 py-4 text-center sticky left-0 w-fit z-10 bg-neutral-200 border-r-2'}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-row gap-2 w-full">
        <Button
          label="Event"
          onClick={() => {
            eventModal.onOpen();
          }}
          icon={Plus}
          labelIcon={NewspaperClipping}
          small
        />
        <Button label="Stock" onClick={stockModal.onOpen} icon={Plus} labelIcon={ChartLine} small />
      </div>
    </div>
  );
};

export default ScenarioTable;
