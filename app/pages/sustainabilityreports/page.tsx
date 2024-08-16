'use client';
import Title from '../../components/Title';
import { Button, Typography } from '@material-tailwind/react';
import { DefaultPagination } from '../../components/pagination';
import { ArrowsCounterClockwise, PencilSimple, Plus, Sparkle, X } from '@phosphor-icons/react';
import { Attribute, GenerationStatus, Report } from '@/app/types/SustainabilityReportTypes';
import SustainabilityReportUploadModal from '@/app/components/modals/sustainabilityReport/SustainabilityReportUploadModal';
import useSustainabilityReportUploadModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportUploadModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import SustainabilityReportAttributeModal from '@/app/components/modals/sustainabilityReport/SustainabilityReportAttributeModal';
import useSustainabilityReportAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportAttributeModal';
import { generateAttributes } from '@/app/actions/sustainabilityReport/generateAttributes';
import { useEffect } from 'react';
import useFetchSustainabilityData from '@/app/hooks/sustainabilityReport/useFetchSustainabilityData';
import { postUser } from '@/app/actions/sustainabilityReport/postUser';
import { AxiosResponse } from 'axios';
import { getSustainabilityUserId } from '@/app/utils/getCookie';
import SustainabilityUpdateAttributeModal from '@/app/components/modals/sustainabilityReport/SustainabilityUpdateAttributeModal';
import useSustainabilityUpdateAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityUpdateAttributeModal';
import SustainabilityReportDeleteModal from '@/app/components/modals/sustainabilityReport/SustainabilityReportDeleteModal';
import useSustainabilityReportDeleteModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportDeleteModal';

function Page() {
  const { reports, attributes, isLoading, setIsLoading, updateResults, updateStatus, userId, setUserId } =
    useSustainabilityStore();
  const sustainabilityReportUploadModal = useSustainabilityReportUploadModal();
  const sustainabilityReportAttributeModal = useSustainabilityReportAttributeModal();
  const sustainabilityUpdateAttributeModal = useSustainabilityUpdateAttributeModal();
  const sustainabilityReportDeleteModal = useSustainabilityReportDeleteModal();
  const { fetchAttributesThenReports } = useFetchSustainabilityData();

  useEffect(() => {
    if (userId) {
      fetchAttributesThenReports();
    }
  }, [userId]);

  const addUser = async () => {
    const userId = await getSustainabilityUserId();
    const response: AxiosResponse = await postUser({ userId });
    if (response.status === 200 || response.status === 201) {
      console.log('User added/created!', response);
      setUserId(response.data.userId);
    }
  };

  useEffect(() => {
    addUser();
  }, []);

  const TABLE_HEAD = ['Report'];

  const runGenerate = async (reportIndex: number, rerunAll: boolean) => {
    const reportId = reports[reportIndex].id;
    try {
      updateStatus(reportId, GenerationStatus.GENERATING);
      console.log('Regenerating report:', reportId, rerunAll);
      if (rerunAll) updateResults(reportId, {});
      const response = await generateAttributes({ userId, reportIds: [reportId], rerunAll });
      const results = response.attributesGenerated;
      console.log('Regenerate response:', response);
      if (!results[reportId]) {
        console.error('Error regenerating report:', response);
        throw new Error("Couldn't regenerate report");
      }
      const filteredResults = Object.keys(results[reportId]).reduce((acc: { [key: string]: any }, key) => {
        if (attributes.some((attribute) => attribute.id === key)) {
          acc[key] = results[reportId][key];
        }
        return acc;
      }, {});
      updateResults(reportId, filteredResults);
    } catch (error) {
      console.error('Error regenerating report:', error);
    } finally {
      updateStatus(reportId, GenerationStatus.GENERATED);
    }
  };

  const runGenerateAll = async (rerunAll: boolean) => {
    const reportIds = reports.map((report) => report.id);
    try {
      for (const reportId of reportIds) {
        updateStatus(reportId, GenerationStatus.GENERATING);
        if (rerunAll) {
          updateResults(reportId, {});
        }
      }
      const response = await generateAttributes({ userId, reportIds: reportIds, rerunAll });
      console.log;
      const results = response.attributesGenerated;

      for (const reportId in results) {
        const filteredResults = Object.keys(results[reportId]).reduce((acc: { [key: string]: any }, key) => {
          if (attributes.some((attribute) => attribute.id === key)) {
            acc[key] = results[reportId][key];
          }
          return acc;
        }, {});
        updateResults(reportId, filteredResults);
      }
      console.log('Regenerate response:', response);
    } catch (error) {
      console.error('Error regenerating report:', error);
    } finally {
      for (const reportId of reportIds) {
        updateStatus(reportId, GenerationStatus.GENERATED);
      }
    }
  };

  const handleGenerateNew = async (reportIndex: number) => {
    setIsLoading(true);
    await runGenerate(reportIndex, false);
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

  const handleRegenerate = async (reportIndex: number) => {
    setIsLoading(true);
    await runGenerate(reportIndex, true);
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

  const checkNewAttributesForReport = (report: Report): boolean => {
    return attributes.length > Object.keys(report.reportResults).length;
  };

  const checkNewAttributes = () => {
    for (const report of reports) {
      if (checkNewAttributesForReport(report)) return true;
    }
    return false;
  };

  const handleEditAttribute = (attribute: Attribute) => {
    sustainabilityUpdateAttributeModal.setAttribute(attribute);
    sustainabilityUpdateAttributeModal.onOpen();
  };

  const handleDeleteAttribute = (attribute: Attribute) => {
    console.log('Deleting attribute:', attribute);
    sustainabilityReportDeleteModal.setAttribute(attribute);
    sustainabilityReportDeleteModal.onOpen();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SustainabilityReportAttributeModal />
      <SustainabilityReportUploadModal />
      <SustainabilityUpdateAttributeModal />
      <SustainabilityReportDeleteModal />
      <Title label="Sustainability Reports" />
      <div className="mt-8 flex w-full justify-between">
        <Button
          onClick={sustainabilityReportUploadModal.onOpen}
          className={`flex gap-2 bg-blue-900 rounded-lg text-white hover:bg-blue-800`}
          variant="text"
        >
          <Plus size={16} /> New Report
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateNewAll}
            disabled={isLoading || attributes.length === 0 || reports.length === 0 || !checkNewAttributes()}
            className="flex gap-2 bg-blue-900"
          >
            Generate New Scores
            <Sparkle size={16} className="shrink-0" />
          </Button>
          <Button
            onClick={handleRegenerateAll}
            disabled={isLoading || attributes.length === 0 || reports.length === 0}
            className="flex gap-2 bg-blue-900"
          >
            Regenerate All Scores
            <ArrowsCounterClockwise size={16} className="shrink-0" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-full justify-between pt-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 z-20">
              <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                {TABLE_HEAD.map((head, index) => (
                  <th key={head} className={` p-4 w-[175px] ${index === 0 && 'sticky left-0 z-10 bg-blue-gray-50'}`}>
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 ">
                      {head}
                    </Typography>
                  </th>
                ))}
                {attributes.map((attribute: Attribute, i) => (
                  <th key={attribute.name + i} className="p-4 w-[150px] xl:w-[225px]">
                    <div className="h-full flex items-center justify-between">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {attribute.name}
                      </Typography>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleEditAttribute(attribute)}
                          disabled={isLoading}
                          className={`text-gray-700 rounded-xl p-2 ${reports.length > 0 && attributes.length === 0 && 'rounded-lg hover:text-gray-700'}`}
                          variant="text"
                        >
                          <PencilSimple size={16} className="shrink-0" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteAttribute(attribute)}
                          disabled={isLoading}
                          className={`text-gray-700 rounded-xl p-2 ${reports.length > 0 && attributes.length === 0 && 'rounded-lg hover:text-gray-700'}`}
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
                    onClick={sustainabilityReportAttributeModal.onOpen}
                    disabled={isLoading}
                    className={`flex gap-2 text-gray-700 rounded-none border-l-[1px] border-gray-300 ${reports.length > 0 && attributes.length === 0 && 'border-2 border-blue-900 rounded-lg hover:text-gray-700'}`}
                    variant="text"
                  >
                    <Plus size={16} className="shrink-0" /> New Attribute
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map(({ reportResults, status, name }, index) => {
                const isLast = index === reports.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={index} className="border-b border-blue-gray-100">
                    <td className={`${classes} sticky left-0 z-10 bg-white`}>
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-normal  w-full overflow-auto text-nowrap"
                      >
                        {name}
                      </Typography>
                    </td>
                    {attributes.map((attribute: Attribute, index: number) => (
                      <td className={classes} key={index + name}>
                        {attribute.id in reportResults && isNotEmpty(reportResults[attribute.id]) ? (
                          <div>{reportResults[attribute.id]}</div>
                        ) : (
                          <div
                            className={`w-full h-[32px] rounded-lg bg-gray-300 flex justify-center items-center text-gray-600 ${status === GenerationStatus.GENERATING && ' bg-gray-400 animate-pulse'}`}
                          >
                            {attribute.name in reportResults && 'None'}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className={'p-4 w-auto sticky right-0 z-10 bg-white'}>
                      {attributes.length > 0 && reports.length > 0 && (
                        <div className="h-full flex flex-row items-center justify-end">
                          <div className="h-full flex gap-2">
                            <Button
                              className="bg-blue-900"
                              size="sm"
                              disabled={isLoading || !checkNewAttributesForReport(reports[index])}
                              onClick={() => handleGenerateNew(index)}
                              loading={status === GenerationStatus.GENERATING}
                            >
                              <span className="flex gap-2">
                                {status !== GenerationStatus.GENERATING && 'New'} <Sparkle size={16} />
                              </span>
                            </Button>
                            <Button
                              className="bg-blue-900"
                              size="sm"
                              disabled={isLoading}
                              onClick={() => handleRegenerate(index)}
                              loading={status === GenerationStatus.GENERATING}
                            >
                              <span className="flex gap-2">
                                {status !== GenerationStatus.GENERATING && 'All'} <ArrowsCounterClockwise size={16} />
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {reports.length === 0 && (
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
}

export default Page;
