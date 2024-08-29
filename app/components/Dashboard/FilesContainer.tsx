import { Report } from '@/app/types/SustainabilityReportTypes';
import FileTag from './FileTag';
import useDashboardAddFileModal from '@/app/hooks/InsightDashboard/useDashboardAddFileModal';
import { Plus } from '@phosphor-icons/react';

interface FilesContainerProps {
  reports: Report[];
  projectId: string;
}

const FilesContainer = ({ reports, projectId }: FilesContainerProps) => {
  const dashboardAddFileModal = useDashboardAddFileModal();

  const handleAddFile = () => {
    dashboardAddFileModal.setProjectId(projectId);
    dashboardAddFileModal.onOpen();
  };

  return (
    <div className="relative flex flex-wrap gap-2 max-w-[250px] h-full overflow-y-auto p-2 rounded group">
      <div
        className="absolute opacity-0 top-0 right-2 p-1 cursor-pointer bg-blue-gray-50 hover:bg-gray-300 rounded-lg group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleAddFile}
      >
        <Plus size={16} />
      </div>
      <div className="flex flex-col gap-2 py-6">
        {reports.map((report, i) => (
          <FileTag key={i} report={report} projectId={projectId} />
        ))}
      </div>
    </div>
  );
};

export default FilesContainer;
