import { ScenarioState } from '../hooks/useScenarioStore';

export type Event = {
  id: string;
  title: string;
  description: string;
};

export type Stock = {
  id: string;
  title: string;
};

export type ScenarioDetailResponse = {
  header: string[];
  data: Array<Array<string>>;
};

export type ScenarioReference = {
  '@distance': number;
  Author: string;
  Content: string;
  Filename: string;
  ID: string;
  Metadata: {
    DataSourceType: string;
    FileType: string;
  };
  Timestamp: number;
  __dbId__: string;
  Title?: string;
};

export type Scenario = {
  event: Event;
  stock: Stock;
  state: ScenarioState;
  detail: ScenarioDetailResponse;
  references: ScenarioReference[];
};
