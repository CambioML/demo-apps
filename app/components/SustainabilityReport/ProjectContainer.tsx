import useSustainabilityReportDeleteModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportDeleteModal';
import { Project } from '@/app/types/SustainabilityReportTypes';
import { Typography } from '@material-tailwind/react';
import { X } from '@phosphor-icons/react';

interface ProjectContainerProps {
  project: Project;
}

const ProjectContainer = ({ project }: ProjectContainerProps) => {
  const sustainabilityReportDeleteModal = useSustainabilityReportDeleteModal();

  const handleDeleteProject = () => {
    console.log('Deleting project:', project.name);
    sustainabilityReportDeleteModal.setDeleteItem(project);
    sustainabilityReportDeleteModal.onOpen();
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
