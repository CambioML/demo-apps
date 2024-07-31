'use client';
import Title from '../../components/Title';
import { Input, Button, Typography } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { DefaultPagination } from '../../components/pagination';
import { useState } from 'react';
import { Event } from '@/app/types/ScenarioTypes';

type Row = {
  name: string;
  events: Event[];
};

const EVENT_PLACEHOLDER = 'EVENT_PLACEHOLDER';
const COMPANY_PLACEHOLDER = 'COMPANY_PLACEHOLDER';
const defaultEvent: Event = {
  id: '1',
  title: EVENT_PLACEHOLDER,
  description: 'Description 1',
  files: [],
};

function Page() {
  const [events] = useState<Event[]>([defaultEvent, defaultEvent, defaultEvent]);

  const TABLE_ROWS: Row[] = [
    {
      name: COMPANY_PLACEHOLDER,
      events: events,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <Title label="Portfolio Exposure - Fortune 500" />

      <div className="flex w-full gap-6 mt-8">
        <div className="flex w-3/4 gap-6">
          <Input label="Company Name" className="w-1/4" />
          <Input label="Start Date" className="w-1/4" />
          <Input label="End Date" className="w-1/4" />
        </div>
        <Button>Search</Button>
      </div>

      <div className="mt-8 gap-6 flex">
        <Button>Add New Scope</Button>
        <Button>Add New Company</Button>
        <Button className="flex item-center">
          <ArrowUpTrayIcon className="w-4 mr-2" />
          Browse Files to upload
        </Button>
      </div>

      <div className="flex flex-col mt-8">
        <div className="h-[275px]">
          <table className="w-full min-w-max table-auto text-left mt-8">
            <thead>
              <tr>
                <th key={'company'} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    Company
                  </Typography>
                </th>
                {events.map((event, i) => (
                  <th key={i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {event.title}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, events }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </td>
                    {events.map((event, idx) => {
                      return (
                        <td key={idx} className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {event.title}
                          </Typography>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ml-auto mt-8">
          <DefaultPagination />
        </div>
      </div>
    </div>
  );
}

export default Page;
