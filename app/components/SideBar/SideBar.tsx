'use client';

import SideBarItem from './SideBarItem';

import { Table, Gear } from '@phosphor-icons/react';

const SideBar = () => {
  return (
    <div className="p-8">
      <SideBarItem icon={Table} label="Dashboard" />
      <div className="border-t-2">
        <SideBarItem icon={Gear} label="Settings" />
      </div>
    </div>
  );
};

export default SideBar;
