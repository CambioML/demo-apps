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

      const existingProjectIds = new Set(projects.map((project) => project.id));
      const newProjects: Project[] = rawProjects
        .filter((rawProject) => !existingProjectIds.has(rawProject.id))
        .map((rawProject) => ({
          ...rawProject,
          reports: [
            ...rawProject.reports.map((report) => ({
              ...report,
              status: GenerationStatus.READY,
            })),
          ],
        }));

      // if (attributes.length > 0) {
      //   newProjects.forEach((report) => {
      //     Object.keys(report.reportResults).forEach((key) => {
      //       const isKeyInAttributes = attributes.some((attribute) => attribute.name === key);
      //       if (!isKeyInAttributes) {
      //         console.log('Deleting key:', key);
      //         delete report.reportResults[key];
      //       }
      //     });
      //   });
      // }

      if (newProjects.length > 0) {
        console.log('Adding projects:', newProjects);
        addProjects(newProjects);
      }
    } catch (error) {
      console.error('Error fetching or adding reports:', error);
    }
  }, [userId, addReports, reports, attributes, fetchAttributes, attributesFetched]);

  const fetchAttributesThenProjects = useCallback(async () => {
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
