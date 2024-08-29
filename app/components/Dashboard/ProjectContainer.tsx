import useDashboardDeleteModal from '@/app/hooks/InsightDashboard/useDashboardDeleteModal';
import { Project } from '@/app/types/SustainabilityReportTypes';
import { Typography } from '@material-tailwind/react';
import { X } from '@phosphor-icons/react';

interface ProjectContainerProps {
  project: Project;
}

const ProjectContainer = ({ project }: ProjectContainerProps) => {
  const dashboardDeleteModal = useDashboardDeleteModal();

  const handleDeleteProject = () => {
    console.log('Deleting project:', project.name);
    dashboardDeleteModal.setDeleteItem(project);
    dashboardDeleteModal.onOpen();
  };
  return (
    <div className="relative px-2 py-1 w-full overflow-hidden flex items-center justify-center group">
      <Typography variant="paragraph" color="blue-gray" className="font-normal w-full overflow-auto text-nowrap pr-10">
        {project.name}
      </Typography>
      <div
        onClick={handleDeleteProject}
        className="absolute right-2 p-2 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-gray-50"
      >
        <X size={16} />
      </div>
    </div>
  );
};

export default ProjectContainer;
