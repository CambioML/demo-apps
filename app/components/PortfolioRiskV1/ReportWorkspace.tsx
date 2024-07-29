'use client';
import React from 'react';
import Heading from '../Heading';
import ModuleContainer from './ModuleContainer';

const ReportWorkspace = () => {
  return (
    <div className="p-8 bg-gray-100 overflow-y-scroll max-h-[100vh] pb-10">
      <Heading title={'Report Generator'} />
      <div className="h-fit max-h-[900px] min-w-[800px] grid grid-cols-1 auto-rows-auto 2xl:grid-cols-2 gap-4">
        <div className="col-span-2">
          <ModuleContainer title={'Report Generator'}>Report GenerateModal</ModuleContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportWorkspace;
