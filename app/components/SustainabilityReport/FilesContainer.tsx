import { Report } from '@/app/types/SustainabilityReportTypes';
import FileTag from './FileTag';
import useSustainabilityReportAddFileModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportAddFileModal';
import { Plus } from '@phosphor-icons/react';

interface FilesContainerProps {
  reports: Report[];
  projectId: string;
}

const FilesContainer = ({ reports, projectId }: FilesContainerProps) => {
  const sustainabilityReportAddFileModal = useSustainabilityReportAddFileModal();

  const handleAddFile = () => {
    sustainabilityReportAddFileModal.setProjectId(projectId);
    sustainabilityReportAddFileModal.onOpen();
  };

  return (
    <div className="relative flex flex-wrap gap-2 max-w-[250px] h-full overflow-y-auto p-2 rounded group">
      <div
        className="absolute hidden top-0 right-2 p-1 cursor-pointer bg-blue-gray-100 hover:bg-gray-300 rounded-lg group-hover:block"
        onClick={handleAddFile}
      >
        <Plus size={16} />
      </div>
      {reports.map((report, i) => (
        <FileTag key={i} report={report} />
      ))}
    </div>
  );
};

export default FilesContainer;
