'use client';
import React from 'react';
import useScenarioStore from '@/app/hooks/useScenarioStore';
import Heading from '../Heading';
import ScenarioTable from '../ScenarioTable/ScenarioTable';
import ModuleContainer from './ModuleContainer';
import ScenarioDetail from '../ScenarioTable/ScenarioDetail';

interface WorkspaceProps {
  title: string;
}

const Workspace = ({ title }: WorkspaceProps) => {
  const { showDetail, setShowDetail } = useScenarioStore();

  return (
    <div className="p-8 bg-neutral-100 overflow-y-scroll max-h-[100vh] pb-10">
      <Heading title={title} />
      <div className="h-fit max-h-[900px] min-w-[800px] grid grid-cols-1 auto-rows-auto 2xl:grid-cols-2 gap-4">
        <div className={`${!showDetail && 'col-span-2'}`}>
          <ModuleContainer title={'Event Table'}>
            <ScenarioTable />
          </ModuleContainer>
        </div>
        <div className={`max-h-[900px] min-h-[500px] overflow-hidden ${showDetail ? 'block' : 'hidden'}`}>
          <ModuleContainer title="Risk Factor" handleClose={() => setShowDetail(false)}>
            <ScenarioDetail />
          </ModuleContainer>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
