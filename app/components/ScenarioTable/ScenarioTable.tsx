import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import useEventModal from '@/app/hooks/useEventModal';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import useStockModal from '@/app/hooks/useStockModal';
import { Button } from '@material-tailwind/react';
import { Plus } from '@phosphor-icons/react';

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
      className={`w-full h-full min-h-fit flex flex-col items-start ${scenarios.length === 0 && data.length === 0 ? 'justify-center' : 'justify-between'} gap-8`}
    >
      <div className="mt-8 gap-6 flex">
        <Button
          onClick={() => {
            eventModal.onOpen();
          }}
        >
          <div className="flex items-center text-base">
            <Plus className="w-4 mr-2" />
            New Event
          </div>
        </Button>
        <Button onClick={stockModal.onOpen}>
          <div className="flex items-center text-base">
            <Plus className="w-4 mr-2" />
            new company
          </div>
        </Button>
      </div>
      {(scenarios.length > 0 || data.length > 0) && (
        <div className="h-fit w-fit overflow-scroll">
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
                          className={`px-4 py-3 m-8 sticky z-20 top-0 bg-gray-100 w-[150px] ${idx === 0 && 'sticky left-0 z-30 bg-gray-300'}`}
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
                        className={`whitespace-nowrap w-full rounded-md ${idx === 0 && 'px-4 py-4 rounded-none text-center sticky left-0 w-fit z-10 bg-gray-300 font-bold'}`}
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
    </div>
  );
};

export default ScenarioTable;
