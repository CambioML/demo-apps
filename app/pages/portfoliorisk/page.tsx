'use client';
import { useState } from 'react';
import Title from '../../components/Title';
import { Input, Button, Typography } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { DefaultPagination } from '../../components/pagination';

function Page() {
  const TABLE_HEAD = [
    'Company',
    'Event 1: Tiktok Ban',
    'Event 2: Federal debt limit breach',
    'Event 3: House Price Correct',
  ];

  const TABLE_ROWS = [
    {
      name: 'John Michael',
      event1: 'event1',
      event2: 'event2',
      event3: 'event3',
    },
    {
      name: 'Alexa Liras',
      event1: 'event1',
      event2: 'event2',
      event3: 'event3',
    },
    {
      name: 'Laurent Perrier',
      event1: 'event1',
      event2: 'event2',
      event3: 'event3',
    },
    {
      name: 'Michael Levi',
      event1: 'event1',
      event2: 'event2',
      event3: 'event3',
    },
    {
      name: 'Richard Gran',
      event1: 'event1',
      event2: 'event2',
      event3: 'event3',
    },
  ];
  const [Company, setCompany] = useState('');
  const onChange = ({ target }) => setCompany(target.value);
  return (
    <div className="w-full h-full flex flex-col">
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
        <Button>Add New Event</Button>
        <Button>Add New Company</Button>
        <Button className="flex item-center">
          <ArrowUpTrayIcon className="w-4 mr-2" />
          Browse Files to upload
        </Button>
      </div>

      <div className="flex flex-col mt-8">
        <table className="w-full min-w-max table-auto text-left mt-8">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, event1, event2, event3 }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {event1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {event2}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {event3}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="ml-auto mt-8">
          <DefaultPagination />
        </div>
      </div>
    </div>
  );
}

export default Page;
