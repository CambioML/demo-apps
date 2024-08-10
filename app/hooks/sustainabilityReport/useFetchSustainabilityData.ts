import { useState, useCallback, useEffect } from 'react';
import useSustainabilityStore from './sustainabilityReportStore';
import { getReports } from '@/app/actions/sustainabilityReport/getReports';
import { getAttributes } from '@/app/actions/sustainabilityReport/getAttributes';
import { GenerationStatus, RawReport, Report, Attribute } from '@/app/types/SustainabilityReportTypes';

const useFetchSustainabilityData = () => {
  const { addReports, reports, userId, attributes, addAttributes } = useSustainabilityStore();
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

  const fetchReports = useCallback(async () => {
    // Ensure attributes are fetched before fetching reports
    if (!attributesFetched) {
      await fetchAttributes(); // Fetch attributes if they haven't been fetched yet
    }

    try {
      const getReportsResponse = await getReports({ userId });
      const { reports: rawReports }: { reports: RawReport[] } = getReportsResponse;

      const existingReportIds = new Set(reports.map((report) => report.id));
      const newReports: Report[] = rawReports
        .filter((rawReport) => !existingReportIds.has(rawReport.reportId))
        .map((rawReport) => ({
          id: rawReport.reportId,
          name: rawReport.originalFileName,
          status: GenerationStatus.READY,
          reportResults: rawReport.results,
        }));

      if (attributes.length > 0) {
        newReports.forEach((report) => {
          Object.keys(report.reportResults).forEach((key) => {
            const isKeyInAttributes = attributes.some((attribute) => attribute.name === key);
            if (!isKeyInAttributes) {
              console.log('Deleting key:', key);
              delete report.reportResults[key];
            }
          });
        });
      }

      if (newReports.length > 0) {
        addReports(newReports);
      }
    } catch (error) {
      console.error('Error fetching or adding reports:', error);
    }
  }, [userId, addReports, reports, attributes, fetchAttributes, attributesFetched]);

  const fetchAttributesThenReports = useCallback(async () => {
    await fetchAttributes();
    await fetchReports();
  }, [fetchAttributes, fetchReports]);

  useEffect(() => {
    // Fetch reports whenever attributes have been successfully fetched
    if (attributesFetched) {
      fetchReports();
    }
  }, [attributesFetched, fetchReports]);

  return { fetchAttributes, fetchReports, fetchAttributesThenReports };
};

export default useFetchSustainabilityData;
