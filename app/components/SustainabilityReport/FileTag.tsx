import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Report } from '@/app/types/SustainabilityReportTypes';

function truncateMiddle(text: string, maxLength = 25) {
  if (text.length <= maxLength) return text;
  const start = text.substring(0, Math.ceil(maxLength / 2));
  const end = text.substring(text.length - Math.floor(maxLength / 2));
  return `${start}...${end}`;
}

interface FileTagProps {
  report: Report;
}

const FileTag = ({ report }: FileTagProps) => {
  return (
    <div className="bg-blue-gray-50 px-2 py-1 rounded-full w-full overflow-hidden flex items-center justify-center">
      <Typography variant="paragraph" color="blue-gray" className="font-normal whitespace-nowrap overflow-hidden">
        {truncateMiddle(report.name, 25)}
      </Typography>
    </div>
  );
};

export default FileTag;
