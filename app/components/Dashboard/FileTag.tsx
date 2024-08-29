import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Report } from '@/app/types/SustainabilityReportTypes';
import { X } from '@phosphor-icons/react';
import useDashboardDeleteModal from '@/app/hooks/InsightDashboard/useDashboardDeleteModal';

function truncateMiddle(text: string, maxLength = 25) {
  if (text.length <= maxLength) return text;
  const start = text.substring(0, Math.ceil(maxLength / 2));
  const end = text.substring(text.length - Math.floor(maxLength / 2));
  return `${start}...${end}`;
}

interface FileTagProps {
  report: Report;
  projectId: string;
}

const FileTag = ({ report, projectId }: FileTagProps) => {
  const dashboardDeleteModal = useDashboardDeleteModal();

  const handleDeleteReport = () => {
    console.log('Deleting report:', report);
    dashboardDeleteModal.setProjectId(projectId);
    dashboardDeleteModal.setDeleteItem(report);
    dashboardDeleteModal.onOpen();
  };
  return (
    <div className="relative bg-blue-gray-50 px-2 py-1 rounded-full w-full overflow-hidden flex items-center justify-center group">
      <Typography variant="paragraph" color="blue-gray" className="font-normal whitespace-nowrap overflow-hidden">
        {truncateMiddle(report.name, 25)}
      </Typography>
      <div
        onClick={handleDeleteReport}
        className="absolute right-2 bg-blue-gray-50 p-2 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <X size={16} />
      </div>
    </div>
  );
};

export default FileTag;
