'use client';
import Title from '../../components/Title';
import { Input, Button, Typography } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { DefaultPagination } from '../../components/pagination';

function Page() {
  const TABLE_HEAD = [
    'Company',
    'References',
    'Scope 1 CO2 emissions',
    'Scope 2 CO2 emissions (location-based)',
    'Potential financial impact figure',
    'Action',
  ];

  const TABLE_ROWS = [
    {
      name: 'John Michael',
      references: 'CDP Link',
      scope1: 'scope1',
      scope2: 'scope2',
      potential: 'Potential',
      action: 'Share',
    },
    {
      name: 'Alexa Liras',
      references: 'CDP Link',
      scope1: 'scope1',
      scope2: 'scope2',
      potential: 'Potential',
      action: 'Share',
    },
    {
      name: 'Laurent Perrier',
      references: 'CDP Link',
      scope1: 'scope1',
      scope2: 'scope2',
      potential: 'Potential',
      action: 'Share',
    },
    {
      name: 'Michael Levi',
      references: 'CDP Link',
      scope1: 'scope1',
      scope2: 'scope2',
      potential: 'Potential',
      action: 'Share',
    },
    {
      name: 'Richard Gran',
      references: 'CDP Link',
      scope1: 'scope1',
      scope2: 'scope2',
      potential: 'Potential',
      action: 'Share',
    },
  ];
  return (
    <div className="w-full h-full flex flex-col">
      <Title label="CDP Sustainability Reports 2023 - Fortune 500" />

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
            {TABLE_ROWS.map(({ name, references, scope1, scope2, potential, action }, index) => {
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
                      {references}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {scope1}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {scope2}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {potential}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      <a>View More</a>
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
