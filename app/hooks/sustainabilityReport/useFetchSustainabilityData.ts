import { useState, useCallback, useEffect } from 'react';
import useSustainabilityStore from './sustainabilityReportStore';
import { getAttributes } from '@/app/actions/sustainabilityReport/getAttributes';
import { GenerationStatus, Attribute, Project } from '@/app/types/SustainabilityReportTypes';
import { getProjects } from '@/app/actions/sustainabilityReport/getProjects';

const useFetchSustainabilityData = () => {
  const { addReports, reports, userId, attributes, addAttributes, projects, addProjects } = useSustainabilityStore();
  const [attributesFetched, setAttributesFetched] = useState(false);

  const fetchAttributes = useCallback(async () => {
    try {
      const getAttributesResponse = await getAttributes({ userId });
      const { attributes: rawAttributes }: { attributes: Attribute[] } = getAttributesResponse;

      const existingAttributeIds = new Set(attributes.map((attribute: Attribute) => attribute.id));
      const newAttributes: Attribute[] = rawAttributes
        .filter((rawAttribute) => !existingAttributeIds.has(rawAttribute.id))
        .map((rawAttribute) => ({
          id: rawAttribute.id,
          name: rawAttribute.name,
          description: rawAttribute.description,
        }));

      if (newAttributes.length > 0) {
        addAttributes(newAttributes);
      }

      setAttributesFetched(true); // Mark attributes as fetched
    } catch (error) {
      console.error('Error fetching or adding attributes:', error);
    }
  }, [userId, addAttributes, attributes]);

  const fetchProjects = useCallback(async () => {
    // Ensure attributes are fetched before fetching reports
    if (!attributesFetched) {
      await fetchAttributes(); // Fetch attributes if they haven't been fetched yet
    }

    try {
      const getProjectsResponse = await getProjects({ userId });
      const { projects: rawProjects }: { projects: Project[] } = getProjectsResponse;

      // Create a Map for easier lookup of existing projects by ID
      const existingProjectsMap = new Map(projects.map((project) => [project.id, project]));

      // Prepare updated projects by iterating through rawProjects
      const updatedProjects: Project[] = rawProjects.map((rawProject) => {
        const existingProject = existingProjectsMap.get(rawProject.id);

        if (existingProject) {
          // If the project already exists, merge the content (e.g., update reports)
          return {
            ...existingProject,
            ...rawProject,
            reports: rawProject.reports.map((report) => ({
              ...report,
              status: GenerationStatus.READY,
            })),
          };
        } else {
          // If the project is new, add it as a new project
          return {
            ...rawProject,
            reports: rawProject.reports.map((report) => ({
              ...report,
              status: GenerationStatus.READY,
            })),
          };
        }
      });

      // Filter out projects that haven't changed (optional, if needed)
      const changedProjects = updatedProjects.filter((updatedProject) => {
        const existingProject = existingProjectsMap.get(updatedProject.id);
        return !existingProject || JSON.stringify(existingProject) !== JSON.stringify(updatedProject);
      });

      if (changedProjects.length > 0) {
        console.log('Updating projects:', changedProjects);
        addProjects(changedProjects);
      }
    } catch (error) {
      console.error('Error fetching or updating reports:', error);
    }
  }, [userId, addReports, reports, attributes, fetchAttributes, attributesFetched]);

  const fetchAttributesThenProjects = useCallback(async () => {
    console.log('Fetching attributes then projects');
    await fetchAttributes();
    await fetchProjects();
  }, [fetchAttributes, fetchProjects]);

  useEffect(() => {
    // Fetch reports whenever attributes have been successfully fetched
    if (attributesFetched) {
      fetchProjects();
    }
  }, [attributesFetched, fetchProjects]);

  return { fetchAttributes, fetchProjects, fetchAttributesThenProjects };
};

export default useFetchSustainabilityData;
