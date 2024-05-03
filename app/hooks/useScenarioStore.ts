import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { create } from 'zustand';
import { Scenario } from '../types/ScenarioTypes';

const defaultData: StockRowType[] = [{ id: 'AAPL', title: 'Apple' }];

export const columnHelper = createColumnHelper<StockRowType>();

const initColumns = [
  columnHelper.accessor('title', {
    header: () => 'Stock',
    cell: (info) => info.getValue(),
  }),
];

export type StockRowType = {
  id: string;
  title: string;
  [key: string]: any;
};

export enum ScenarioState {
  READY,
  UPDATING,
  UPDATED,
}

interface ScenarioStore {
  data: StockRowType[];
  columns: ColumnDef<StockRowType, string>[];
  showDetail: boolean;
  scenarios: Scenario[][];
  selectedScenarioIdx: { rowIdx: number; colIdx: number } | null;
  setSelectedScenarioIdx: (scenarioIdx: { rowIdx: number; colIdx: number } | null) => void;
  setData: (data: StockRowType[]) => void;
  setColumns: (columns: ColumnDef<StockRowType, string>[]) => void;
  setShowDetail: (showDetail: boolean) => void;
  addScenario: ({ rowIdx, colIdx, scenario }: AddScenarioArgs) => void;
  updateScenario: ({ rowIdx, colIdx, newScenario }: UpdateScenarioArgs) => void;
}

interface AddScenarioArgs {
  rowIdx: number;
  colIdx: number;
  scenario: Scenario;
}

export interface UpdateScenarioArgs {
  rowIdx: number;
  colIdx: number;
  newScenario: Scenario;
}

const useScenarioStore = create<ScenarioStore>((set) => ({
  data: [...defaultData],
  columns: initColumns,
  showDetail: false,
  scenarios: [],
  selectedScenarioIdx: null,
  setSelectedScenarioIdx: (scenarioIdx) => set({ selectedScenarioIdx: scenarioIdx }),
  setData: (data) => set({ data }),
  setColumns: (columns) => set({ columns }),
  setShowDetail: (showDetail) => set({ showDetail }),
  addScenario: ({ rowIdx, colIdx, scenario }: AddScenarioArgs) => {
    set((state) => {
      const newScenarios = [...state.scenarios];
      if (!newScenarios[rowIdx]) {
        newScenarios[rowIdx] = [];
      }
      newScenarios[rowIdx][colIdx] = scenario;
      return { scenarios: newScenarios };
    });
  },
  updateScenario: ({ rowIdx, colIdx, newScenario }: UpdateScenarioArgs) =>
    set((state) => {
      const newScenarios = [...state.scenarios];
      newScenarios[rowIdx][colIdx] = newScenario;
      return { scenarios: newScenarios };
    }),
}));

export default useScenarioStore;
