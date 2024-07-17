'use client';
import React, { useEffect, useState } from 'react';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import Heading from '../../components/Heading';
import ScenarioTable from '../../components/ScenarioTable/ScenarioTable';
import ModuleContainer from './ModuleContainer';
import ScenarioDetail from '../../components/ScenarioTable/ScenarioDetail';
import { Scenario } from '@/app/types/ScenarioTypes';
import EventModal from '../../components/modals/EventModal';
import GenerateModal from '../../components/modals/GenerateModal';
import InfoModal from '../../components/modals/InfoModal';
import StockModal from '../../components/modals/StockModal';

interface WorkspaceProps {
  title: string;
}

const Page = ({ title }: WorkspaceProps) => {
  const { showDetail, setShowDetail, scenarios, selectedScenarioIdx } = useScenarioStore();
  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  useEffect(() => {
    if (!selectedScenarioIdx || !scenarios[selectedScenarioIdx.rowIdx]) return;
    setSelectedScenario(scenarios[selectedScenarioIdx.rowIdx][selectedScenarioIdx.colIdx]);
  }, [scenarios, selectedScenarioIdx]);

  return (
    <div className="p-2 flex-1 bg-neutral-100 overflow-y-scroll">
      <Heading title={title} />
      <div className="h-fit max-h-[900px] min-w-[800px] grid grid-cols-1 auto-rows-auto 2xl:grid-cols-2 gap-4">
        <div className={`${!showDetail && 'col-span-2'}`}>
          <ModuleContainer title={'Event Table'}>
            <ScenarioTable />
          </ModuleContainer>
        </div>
        <div className={`h-fit max-h-[900px] min-h-[500px] overflow-hidden ${showDetail ? 'block' : 'hidden'}`}>
          <ModuleContainer
            title={`Risk Factor: ${selectedScenario && selectedScenario.stock.title + ' x ' + selectedScenario.event.title}`}
            subtitle={``}
            handleClose={() => setShowDetail(false)}
          >
            <ScenarioDetail />
          </ModuleContainer>
        </div>
      </div>
      <EventModal />
      <StockModal />
      <GenerateModal />
      <InfoModal />
    </div>
  );
};

export default Page;
