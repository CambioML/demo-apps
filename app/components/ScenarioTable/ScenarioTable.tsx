import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import useEventModal from '@/app/hooks/useEventModal';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import useStockModal from '@/app/hooks/useStockModal';
import { Button } from '@material-tailwind/react';
import { Plus } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const NUM_DEFAULT_ROWS = 4;
const NUM_DEFAULT_COLUMNS = 3;

const ColHeader = ({ header, idx }: { idx: number; header: any }) => (
  <th
    scope="col"
    key={header.id}
    className={`px-4 py-3 m-8 sticky z-20 top-0 bg-gray-100 w-[150px] ${idx === 0 && 'sticky left-0 z-30 border-r-2'}`}
  >
    {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
  </th>
);

const RowHeader = ({ cell, idx }: { idx: number; cell: any }) => (
  <td
    key={cell.id}
    className={`whitespace-nowrap w-[10px] ${idx === 0 && 'px-4 py-4 rounded-none text-center sticky left-0 w-fit z-10 font-bold border-r-2 bg-white'}`}
  >
    {cell === 'DEFAULT' ? '' : flexRender(cell.column.columnDef.cell, cell.getContext())}
  </td>
);

const PlaceholderCell = () => (
  <td className="w-[200px] h-[50px] py-1 px-2">
    <div className="w-full h-full rounded-md border-2 border-gray-100 " />
  </td>
);

const ScenarioTable: React.FC = () => {
  const { data, columns, scenarios } = useScenarioStore();
  const [placeholderCols, setPlaceHolderCols] = useState<number>(NUM_DEFAULT_COLUMNS);
  const [placeholderRows, setPlaceHolderRows] = useState<number>(NUM_DEFAULT_ROWS);
  const [placeholderCells, setPlaceholderCells] = useState<number>(placeholderCols + columns.length - 1);
  const eventModal = useEventModal();
  const stockModal = useStockModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setPlaceHolderCols(NUM_DEFAULT_COLUMNS - columns.length + 1);
  }, [columns]);

  useEffect(() => {
    setPlaceHolderRows(NUM_DEFAULT_ROWS - data.length);
  }, [data, placeholderRows]);

  useEffect(() => {
    setPlaceholderCells(placeholderCols + columns.length - 1);
    console.log(placeholderCells);
  }, [placeholderCols, columns]);

  return (
    <div
      className={`w-full h-full min-h-fit flex flex-col items-start ${scenarios.length === 0 && data.length === 0 ? 'justify-center' : 'justify-between'} gap-8`}
    >
      <div className="mt-8 gap-6 flex">
        <Button onClick={stockModal.onOpen}>
          <div className="flex items-center text-base">
            <Plus className="w-4 mr-2" />
            new company
          </div>
        </Button>
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
      </div>
      {
        <div className="h-[300px] w-full overflow-scroll">
          <table className="">
            <thead className="text-lg">
              {table.getHeaderGroups().map((headerGroup: any) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any, idx: number) => {
                      return <ColHeader key={header.id} header={header} idx={idx} />;
                    })}
                    {placeholderCols > 0 &&
                      Array.from({ length: placeholderCols }, (_, idx) => (
                        <ColHeader key={idx} idx={idx + 1} header={{ isPlaceholder: true }} />
                      ))}
                  </tr>
                );
              })}
            </thead>
            <tbody className="bg-white text-lg">
              {table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} className="group">
                  {row.getVisibleCells().map((cell: any, idx: number) => {
                    return <RowHeader key={cell.id} cell={cell} idx={idx} />;
                  })}
                  {Array.from({ length: placeholderCols }, (_, idx) => (
                    <PlaceholderCell key={idx} />
                  ))}
                </tr>
              ))}
              {placeholderRows > 0 &&
                Array.from({ length: placeholderRows }, (_, idx) => (
                  <tr key={idx}>
                    <RowHeader key={idx} idx={0} cell={'DEFAULT'} />
                    {Array.from({ length: placeholderCells }, (_, idx) => (
                      <PlaceholderCell key={idx} />
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default ScenarioTable;
