'use client';
import React from 'react';
import Heading from '../Heading';

const Settings = () => {
  return (
    <div className="p-8 bg-gray-100 overflow-y-scroll max-h-[100vh] pb-10">
      <Heading title={'Settings'} />
      <div className="h-fit max-h-[900px] min-w-[800px] grid grid-cols-1 auto-rows-auto 2xl:grid-cols-2 gap-4"></div>
    </div>
  );
};

export default Settings;
