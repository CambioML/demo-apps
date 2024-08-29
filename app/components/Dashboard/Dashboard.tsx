'use client';
import Title from '../Title';
import { Button, Typography } from '@material-tailwind/react';
import { DefaultPagination } from '../pagination';
import { ArrowsCounterClockwise, PencilSimple, Plus, Sparkle, X } from '@phosphor-icons/react';
import { Attribute, GenerationStatus, Project } from '@/app/types/SustainabilityReportTypes';
import useDashboardStore from '@/app/hooks/InsightDashboard/dashboardStore';
import { generateAttributes } from '@/app/actions/sustainabilityReport/generateAttributes';
import { useEffect } from 'react';
import { postUser } from '@/app/actions/sustainabilityReport/postUser';
import { AxiosResponse } from 'axios';
import { getInsightDashboardUserId } from '@/app/utils/getCookie';
import FilesContainer from '@/app/components/Dashboard/FilesContainer';
import ProjectContainer from '@/app/components/Dashboard/ProjectContainer';
import ResultContainer from '@/app/components/Dashboard/ResultContainer';
import useDashboardProjectModal from '@/app/hooks/InsightDashboard/useDashboardProjectModal';
import DashboardProjectModal from '../modals/dashboard/DashboardProjectModal';
import useDashboardDeleteModal from '@/app/hooks/InsightDashboard/useDashboardDeleteModal';
import DashboardDeleteModal from '../modals/dashboard/DashboardDeleteModal';
import DashboardAttributeModal from '../modals/dashboard/DashboardAttributeModal';
import useDashboardAttributeModal from '@/app/hooks/InsightDashboard/useDashboardAttributeModal';
import DashboardUpdateAttributeModal from '../modals/dashboard/DashboardUpdateAttributeModal';
import useDashboardUpdateAttributeModal from '@/app/hooks/InsightDashboard/useDashboardUpdateAttributeModal';
import DashboardAddFileModal from '../modals/dashboard/DashboardAddFileModal';

interface DashboardProps {
  dashboardName: string;
  projectLabel: string;
  useFetchData: () => { fetchAllData: () => void };
}

const Dashboard = ({ dashboardName, projectLabel, useFetchData }: DashboardProps) => {
  const { projects, attributes, isLoading, setIsLoading, updateResults, updateStatus, userId, setUserId } =
    useDashboardStore();
  const dashboardProjectModal = useDashboardProjectModal();
  const dashboardAttributeModal = useDashboardAttributeModal();
  const dashboardUpdateAttributeModal = useDashboardUpdateAttributeModal();
  const dashboardDeleteModal = useDashboardDeleteModal();
  const { fetchAllData } = useFetchData();

  const addUser = async () => {
    const userId = await getInsightDashboardUserId();
    const response: AxiosResponse = await postUser({ userId });
    if (response.status === 200 || response.status === 201) {
      console.log('User added/created!', response);
      setUserId(response.data.userId);
    }
  };

  useEffect(() => {
    addUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAllData();
    }
  }, [userId]);

  const runGenerate = async (projectId: string, rerunAll: boolean) => {
    try {
      updateStatus(projectId, GenerationStatus.GENERATING);
      console.log('Regenerating report:', projectId, rerunAll);
      if (rerunAll) updateResults(projectId, {});
      const response = await generateAttributes({ userId, projectIds: [projectId], rerunAll });
      const results = response.attributesGenerated;
      console.log('Regenerate response:', response);
      if (!results[projectId]) {
        console.error('Error regenerating report:', response);
        throw new Error("Couldn't regenerate report");
      }
      const filteredResults = Object.keys(results[projectId]).reduce((acc: { [key: string]: any }, key) => {
        if (attributes.some((attribute) => attribute.id === key)) {
          acc[key] = results[projectId][key];
        }
        return acc;
      }, {});
      updateResults(projectId, filteredResults);
    } catch (error) {
      console.error('Error regenerating report:', error);
    } finally {
      updateStatus(projectId, GenerationStatus.GENERATED);
    }
  };

  const runGenerateAll = async (rerunAll: boolean) => {
    const projectIds = projects.map((project) => project.id);
    try {
      for (const projectId of projectIds) {
        updateStatus(projectId, GenerationStatus.GENERATING);
        if (rerunAll) {
          updateResults(projectId, {});
        }
      }
      const response = await generateAttributes({ userId, projectIds: projectIds, rerunAll });
      const results = response.attributesGenerated;

      for (const projectId in results) {
        const filteredResults = Object.keys(results[projectId]).reduce((acc: { [key: string]: any }, key) => {
          if (attributes.some((attribute) => attribute.id === key)) {
            acc[key] = results[projectId][key];
          }
          return acc;
        }, {});
        updateResults(projectId, filteredResults);
      }
      console.log('Regenerate response:', response);
    } catch (error) {
      console.error('Error regenerating report:', error);
    } finally {
      for (const reportId of projectIds) {
        updateStatus(reportId, GenerationStatus.GENERATED);
      }
    }
  };

  const handleGenerateNew = async (projectId: string) => {
    setIsLoading(true);
    await runGenerate(projectId, false);
    setIsLoading(false);
  };

  const handleGenerateNewAll = async () => {
    setIsLoading(true);
    try {
      await runGenerateAll(false);
    } catch (error) {
      console.error('Error generating all reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateAll = async () => {
    setIsLoading(true);
    try {
      await runGenerateAll(true);
    } catch (error) {
      console.error('Error generating all reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (projectId: string) => {
    setIsLoading(true);
    await runGenerate(projectId, true);
    setIsLoading(false);
  };

  function isNotEmpty(value: any): boolean {
    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return false;
  }

  const checkNewAttributesForProject = (project: Project): boolean => {
    return (
      attributes.length >
      Object.keys(project.projectResults).filter((key) => project.projectResults[key] !== null).length
    );
  };

  const checkFilesForProject = (project: Project): boolean => {
    return project.reports.length > 0;
  };

  const checkFilesForAllProjects = () => {
    for (const project of projects) {
      if (checkFilesForProject(project)) return true;
    }
    return false;
  };

  const checkNewAttributes = () => {
    for (const project of projects) {
      if (checkNewAttributesForProject(project)) return true;
    }
    return false;
  };

  const handleEditAttribute = (attribute: Attribute) => {
    dashboardUpdateAttributeModal.setAttribute(attribute);
    dashboardUpdateAttributeModal.onOpen();
  };

  const handleDeleteAttribute = (attribute: Attribute) => {
    console.log('Deleting attribute:', attribute);
    dashboardDeleteModal.setDeleteItem(attribute);
    dashboardDeleteModal.onOpen();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <DashboardProjectModal projectLabel={projectLabel} />
      <DashboardAttributeModal />
      <DashboardDeleteModal />
      <DashboardUpdateAttributeModal />
      <DashboardAddFileModal />
      <Title label={dashboardName} />
      <div className="mt-8 flex w-full justify-between">
        <Button
          onClick={dashboardProjectModal.onOpen}
          className={`flex gap-2 bg-blue-900 rounded-lg text-white hover:bg-blue-800`}
          variant="text"
        >
          <Plus size={16} /> New {projectLabel}
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateNewAll}
            disabled={
              isLoading ||
              attributes.length === 0 ||
              projects.length === 0 ||
              !checkNewAttributes() ||
              !checkFilesForAllProjects()
            }
            className="flex gap-2 bg-blue-900"
          >
            Generate New
            <Sparkle size={16} className="shrink-0" />
          </Button>
          <Button
            onClick={handleRegenerateAll}
            disabled={isLoading || attributes.length === 0 || projects.length === 0 || !checkFilesForAllProjects()}
            className="flex gap-2 bg-blue-900"
          >
            Regenerate All
            <ArrowsCounterClockwise size={16} className="shrink-0" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-full justify-between pt-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 z-20">
              <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                <th className="p-4 min-w-[125px] max-w-[175px] sticky left-0 z-30 bg-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 ">
                    {projectLabel}
                  </Typography>
                </th>
                <th className="p-4 w-fit">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 ">
                    Files
                  </Typography>
                </th>
                {attributes.map((attribute: Attribute, i) => (
                  <th key={attribute.name + i} className="relative group p-4 w-[200px] xl:w-[300px]">
                    <div className="h-full flex items-center justify-between">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 z-10"
                      >
                        {attribute.name}
                      </Typography>
                      <div className="flex gap-1 absolute right-0 z-20 bg-blue-gray-50 group-hover:bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={() => handleEditAttribute(attribute)}
                          disabled={isLoading}
                          className={`text-gray-700 rounded-xl p-2 ${projects.length > 0 && attributes.length === 0 && 'rounded-lg hover:text-gray-700'}`}
                          variant="text"
                        >
                          <PencilSimple size={16} className="shrink-0" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteAttribute(attribute)}
                          disabled={isLoading}
                          className={`text-gray-700 rounded-xl p-2 ${projects.length > 0 && attributes.length === 0 && 'rounded-lg hover:text-gray-700'}`}
                          variant="text"
                        >
                          <X size={16} className="shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </th>
                ))}
                <th className="p-2 w-auto sticky right-0 z-10 flex flex-row items-start justify-between bg-blue-gray-50">
                  <Button
                    onClick={dashboardAttributeModal.onOpen}
                    disabled={isLoading}
                    className={`flex gap-2 text-gray-700 rounded-none border-l-[1px] border-gray-300 ${projects.length > 0 && attributes.length === 0 && 'border-2 border-blue-900 rounded-lg hover:text-gray-700'}`}
                    variant="text"
                  >
                    <Plus size={16} className="shrink-0" /> New Attribute
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                const isLast = index === projects.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={index} className="border-b border-blue-gray-100 max-h-[300px]">
                    <td className={`${classes} sticky left-0 z-10 bg-white`}>
                      <ProjectContainer project={project} />
                    </td>
                    <td className={`${classes} w-[250px] h-auto max-h-[300px] overflow-y-auto`}>
                      <FilesContainer reports={project.reports} projectId={project.id} />
                    </td>

                    {attributes.map((attribute: Attribute, index: number) => (
                      <td className={`${classes} max-h-[300px] overflow-y-auto`} key={index + project.name}>
                        {attribute.id in project.projectResults && isNotEmpty(project.projectResults[attribute.id]) ? (
                          <ResultContainer
                            result={project.projectResults[attribute.id]}
                            projectId={project.id}
                            attributeId={attribute.id}
                          />
                        ) : (
                          <div
                            className={`w-full h-[32px] rounded-lg bg-gray-300 flex justify-center items-center text-gray-600 ${
                              project.status === GenerationStatus.GENERATING && 'bg-gray-400 animate-pulse'
                            }`}
                          >
                            {project.status !== GenerationStatus.GENERATING && 'None'}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className={'p-4 w-auto sticky right-0 z-10 bg-white max-h-[300px] overflow-y-auto'}>
                      {attributes.length > 0 && projects.length > 0 && (
                        <div className="h-full flex flex-row items-center justify-end">
                          <div className="h-full flex gap-2">
                            <Button
                              className="bg-blue-900"
                              size="sm"
                              disabled={
                                isLoading ||
                                !checkNewAttributesForProject(projects[index]) ||
                                !checkFilesForProject(projects[index])
                              }
                              onClick={() => handleGenerateNew(projects[index].id)}
                              loading={project.status === GenerationStatus.GENERATING}
                            >
                              <span className="flex gap-2">
                                {project.status !== GenerationStatus.GENERATING && 'New'} <Sparkle size={16} />
                              </span>
                            </Button>
                            <Button
                              className="bg-blue-900"
                              size="sm"
                              disabled={isLoading || !checkFilesForProject(projects[index])}
                              onClick={() => handleRegenerate(projects[index].id)}
                              loading={project.status === GenerationStatus.GENERATING}
                            >
                              <span className="flex gap-2">
                                {project.status !== GenerationStatus.GENERATING && 'All'}{' '}
                                <ArrowsCounterClockwise size={16} />
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {projects.length === 0 && (
                <>
                  <tr className="w-full h-[50px] border-b border-blue-gray-100"></tr>
                  <tr className="w-full h-[50px] border-b border-blue-gray-100">
                    <td className="sticky left-0 z-10 bg-white" colSpan={4}></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="ml-auto mt-8">
          <DefaultPagination />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
