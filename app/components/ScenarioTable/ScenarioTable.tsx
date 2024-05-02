import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import useEventModal from '@/app/hooks/useEventModal';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import { Plus } from '@phosphor-icons/react';
// import useStockModal from '@/app/hooks/useStockModal';

const ScenarioTable: React.FC = () => {
  const { data, columns } = useScenarioStore();
  const eventModal = useEventModal();
  // const stockModal = useStockModal();

  // const addRow = (row_name: string) => {
  //   const newRow = { id: `stock_${data.length + 1}`, name: row_name };
  //   // Update data state with new row
  //   setData([...data, newRow]);
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full h-full flex flex-row items-start justify-start gap-4">
      <div className="h-full w-fit overflow-scroll">
        <table className="border-separate">
          <thead className="text-lg">
            {
              // tslint:disable-next-line:no-any
              table.getHeaderGroups().map((headerGroup: any) => {
                return (
                  <tr key={headerGroup.id}>
                    {
                      //tslint:disable-next-line:no-any
                      headerGroup.headers.map((header: any, idx: number) => {
                        return (
                          <th
                            scope="col"
                            key={header.id}
                            className={`px-4 py-3 m-8 sticky z-20 top-0 bg-neutral-100 ${idx === 0 && 'sticky left-0 z-30 rounded-none bg-neutral-200 border-r-2'}`}
                          >
                            {header.isPlaceholder ? null : (
                              <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                            )}
                          </th>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </thead>
          <tbody className="bg-white text-md">
            {
              // tslint:disable-next-line:no-any
              table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} className="group">
                  {
                    // tslint:disable-next-line:no-any
                    row.getVisibleCells().map((cell: any, idx: number) => {
                      return (
                        <td
                          key={cell.id}
                          className={`whitespace-nowrap w-full ${idx === 0 && 'px-4 py-1 text-center sticky left-0 w-fit z-10 rounded-none bg-neutral-200 border-r-2'}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className=" px-4 py-3 text-lg border-2 flex items-center justify-center gap-2 hover:bg-neutral-200 rounded-lg cursor-pointer h-fit w-[200px]"
          onClick={eventModal.onOpen}
        >
          <Plus className="shrink-0" size={16} /> Event
        </div>
        {/* <div
          className=" px-4 py-3 text-lg border-2 flex items-center justify-center gap-2 hover:bg-neutral-200 rounded-lg cursor-pointer h-fit w-[200px]"
          onClick={stockModal.onOpen}
        >
          <Plus className="shrink-0" size={16} /> Stock
        </div> */}
      </div>
    </div>
  );
};

export default ScenarioTable;
