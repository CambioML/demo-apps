import useDashboardDeleteModal from '@/app/hooks/InsightDashboard/useDashboardDeleteModal';
import { X } from '@phosphor-icons/react';

interface ResultContainerProps {
  result: string;
  projectId: string;
  attributeId: string;
}

const ResultContainer = ({ result, projectId, attributeId }: ResultContainerProps) => {
  const dashboardDeleteModal = useDashboardDeleteModal();

  const handleDeleteResult = () => {
    console.log('Deleting result for attribute:', attributeId);
    dashboardDeleteModal.setProjectId(projectId);
    dashboardDeleteModal.setAttributeId(attributeId);
    dashboardDeleteModal.onOpen();
  };
  return (
    <div className="relative px-2 py-1 w-full overflow-hidden flex items-center justify-center group">
      <div className="max-h-[300px] overflow-y-auto">{result}</div>
      <div
        onClick={handleDeleteResult}
        className="absolute bg-blue-gray-50 right-2 top-2 p-2 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-gray-100"
      >
        <X size={16} />
      </div>
    </div>
  );
};

export default ResultContainer;
