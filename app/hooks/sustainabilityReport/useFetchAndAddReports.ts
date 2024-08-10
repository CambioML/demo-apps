import { useCallback, useEffect } from 'react';
import useSustainabilityStore from './sustainabilityReportStore';
import { getReports } from '@/app/actions/sustainabilityReport/getReports';
import { GenerationStatus, RawReport, Report } from '@/app/types/SustainabilityReportTypes';

const useFetchAndAddReports = () => {
  const { addReports, reports, userId, attributes } = useSustainabilityStore();

  const fetchAndAddReports = useCallback(async () => {
    try {
      const getReportsResponse = await getReports({ userId });
      const { reports: rawReports }: { reports: RawReport[] } = getReportsResponse;

      // Create a Set of existing report IDs for quick lookup
      const existingReportIds = new Set(reports.map((report) => report.id));
      // Filter out rawReports that already exist
      const newReports: Report[] = rawReports
        .filter((rawReport) => !existingReportIds.has(rawReport.reportId))
        .map((rawReport) => ({
          id: rawReport.reportId,
          name: rawReport.originalFileName,
          status: GenerationStatus.READY,
          reportResults: rawReport.results,
        }));

      console.log('Adding new reports:', newReports, existingReportIds);

      // only keep the reportResults that have a key that is in attributes
      if (attributes.length > 0) {
        newReports.forEach((report) => {
          Object.keys(report.reportResults).forEach((key) => {
            console.log('Checking key:', key, attributes);
            const isKeyInAttributes = attributes.some((attribute) => attribute.name === key);
            if (!isKeyInAttributes) {
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
  }, [userId, addReports, reports]);

  useEffect(() => {
    fetchAndAddReports();
  }, []);

  return { fetchAndAddReports };
};

export default useFetchAndAddReports;
