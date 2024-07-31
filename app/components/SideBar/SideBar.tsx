'use client';

import React, { useState } from 'react';
import { Typography, List, Chip, Input } from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  WalletIcon,
  Squares2X2Icon,
  CircleStackIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import Logo from '../../assets/image/logo.svg';
import SideBarItem from './SideBarItem';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuData = [
    {
      label: 'DashBoard',
      type: 'menu',
      icon: PresentationChartBarIcon,
      link: '/pages/dashboard',
    },
    {
      type: 'divid',
    },
    {
      label: 'Inbox',
      type: 'menu',
      icon: InboxIcon,
      suffix: <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />,
    },
    {
      label: 'Portfolio Risk Exposure V1',
      type: 'menu',
      icon: BriefcaseIcon,
      link: '/pages/portfolioriskv1',
    },
    {
      label: 'Portfolio Risk Exposure',
      type: 'menu',
      icon: WalletIcon,
      link: '/pages/portfoliorisk',
    },
    {
      label: 'Sustainability Reports Comparison',
      type: 'menu',
      icon: Squares2X2Icon,
      link: '/pages/sustainabilityreports',
    },
    {
      label: 'Investment Memo Comparison',
      type: 'menu',
      icon: CircleStackIcon,
    },
    {
      label: 'Due Diligence 1-liners',
      type: 'menu',
      icon: ShoppingBagIcon,
    },
    {
      type: 'divid',
    },
    {
      label: 'Settings',
      type: 'menu',
      icon: Cog6ToothIcon,
    },
    {
      label: 'Log Out',
      type: 'menu',
      icon: PowerIcon,
    },
  ];

  return (
    <div className={`flex h-[100vh] flex flex-row items-center justify-center`}>
      <div
        className={`w-full mx-0.5  shadow-xl shadow-blue-gray-900/5 min-h-screen max-h-screen transition-all duration-300 ${isCollapsed ? 'w-16 p-1' : 'w-72 p-4'}`}
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          {!isCollapsed && <img src={Logo.src} alt="brand" className="h-8 w-8" />}
          {!isCollapsed && (
            <Typography variant="h5" color="blue-gray">
              Scenario
            </Typography>
          )}
        </div>
        {!isCollapsed && (
          <div className="p-2">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
          </div>
        )}
        <div className={`transition-all duration-300 ${isCollapsed ? 'overflow-hidden w-16' : ''}`}>
          <List className="min-w-16">
            {menuData.map((item, index) => (
              <SideBarItem
                key={index}
                label={isCollapsed ? '' : item.label || ''}
                type={item.type}
                icon={item.icon ? React.createElement(item.icon, { className: 'h-6 w-6' }) : null}
                suffix={!isCollapsed && item.suffix}
                link={item.link}
              />
            ))}
          </List>
        </div>
      </div>
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="min-h-screen max-h-screen w-[10px] p-3 bg-white text-gray border-gray-200 border-r hover:bg-gray-200 flex justify-center items-center rounded-r-lg cursor-pointer"
      >
        {isCollapsed ? <CaretRight size={20} className="shrink-0" /> : <CaretLeft size={20} className="shrink-0" />}
      </div>
    </div>
  );
};

export default Sidebar;
