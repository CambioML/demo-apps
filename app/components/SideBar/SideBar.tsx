'use client';

import React from 'react';
import { Card, Typography, List, Chip, Input } from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  WalletIcon,
  Squares2X2Icon,
  CircleStackIcon,
  ShoppingBagIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/image/logo.svg';
import SideBarItem from './SideBarItem';

const Sidebar = () => {
  // const [openAlert, setOpenAlert] = React.useState(true);

  const menuData = [
    {
      label: 'DashBoard',
      type: 'menu',
      icon: <PresentationChartBarIcon />,
      link: '/pages/dashboard',
    },
    {
      type: 'divid',
    },
    {
      label: 'Inbox',
      type: 'menu',
      icon: <InboxIcon />,
      suffix: <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />,
    },
    {
      label: 'Workspace',
      type: 'menu',
      icon: <BriefcaseIcon />,
      link: '/pages/workspace',
    },
    {
      label: 'Portfolio Risk Exposure',
      type: 'menu',
      icon: <WalletIcon />,
      link: '/pages/portfoliorisk',
    },
    {
      label: 'Sustainability Reports Comparison',
      type: 'menu',
      icon: <Squares2X2Icon />,
      link: '/pages/sustainabilityreports',
    },
    {
      label: 'Investment Memo Comparison',
      type: 'menu',
      icon: <CircleStackIcon />,
    },
    {
      label: 'Due Diligence 1-liners',
      type: 'menu',
      icon: <ShoppingBagIcon />,
    },
    {
      label: 'Email Diffuse',
      type: 'menu',
      icon: <EnvelopeIcon />,
    },
    {
      type: 'divid',
    },
    {
      label: 'Settings',
      type: 'menu',
      icon: <Cog6ToothIcon />,
    },
    {
      label: 'Log Out',
      type: 'menu',
      icon: <PowerIcon />,
    },
  ];

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] mx-0.5 p-4 shadow-xl shadow-blue-gray-900/5 border-gray-200 border-r min-h-screen max-h-screen">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={Logo.src} alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Scenario
        </Typography>
      </div>
      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div>
      <List>
        {menuData.map((item: any, index) => {
          return (
            <SideBarItem
              label={item.label}
              type={item.type}
              icon={item?.icon}
              suffix={item?.suffix}
              link={item?.link}
            />
          );
        })}
      </List>
      {/* <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Finding Business
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Recommend Django for your financial backend system.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography as="a" href="#" variant="small" className="font-medium" onClick={() => setOpenAlert(false)}>
            Dismiss
          </Typography>
        </div>
      </Alert> */}
    </Card>
  );
};
export default Sidebar;
