'use client';
import Title from '../../components/Title';
import { Button, Typography } from '@material-tailwind/react';
import { DefaultPagination } from '../../components/pagination';
import { ArrowsCounterClockwise, Plus, Sparkle } from '@phosphor-icons/react';
import { Attribute, GenerationStatus } from '@/app/types/SustainabilityReportTypes';
import SustainabilityReportUploadModal from '@/app/components/modals/sustainabilityReport/SustainabilityReportUploadModal';
import useSustainabilityReportUploadModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportUploadModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/sustainabilityReportStore';
import useFetchAndAddReports from '@/app/hooks/sustainabilityReport/useFetchAndAddReports';
import SustainabilityReportAttributeModal from '@/app/components/modals/sustainabilityReport/SustainabilityReportAttributeModal';
import useSustainabilityReportAttributeModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportAttributeModal';

function Page() {
  const { reports, attributes, isLoading, setIsLoading } = useSustainabilityStore();
  const sustainabilityReportUploadModal = useSustainabilityReportUploadModal();
  const sustainabilityReportAttributeModal = useSustainabilityReportAttributeModal();

  useFetchAndAddReports();

  const TABLE_HEAD = ['Report'];

  const runRegenerate = async (reportIndex: number) => {
    console.log('Regenerating report:', reportIndex);
  };

  const handleGenerateNew = async (reportIndex: number) => {
    setIsLoading(true);
    await runGenerateNew(reportIndex);
    setIsLoading(false);
  };

  const runGenerateNew = async (reportIndex: number) => {
    console.log('Generating new report:', reportIndex);
  };

  const handleGenerateNewAll = async () => {
    setIsLoading(true);
    try {
      const promises = reports.map(async (_, i) => {
        await runGenerateNew(i);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Error generating all reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateAll = async () => {
    setIsLoading(true);
    try {
      const promises = reports.map(async (_, i) => {
        // updateResults(i, {});
        await runRegenerate(i);
      });
      await Promise.all(promises);
    } catch (error) {
      console.error('Error generating all reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (reportIndex: number) => {
    setIsLoading(true);
    // updateResults(reportIndex, {});
    await runRegenerate(reportIndex);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SustainabilityReportUploadModal />
      <SustainabilityReportAttributeModal />
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
            disabled={isLoading || attributes.length === 0 || reports.length === 0}
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

      <div className="flex flex-col h-full justify-between">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left mt-8">
            <thead>
              <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                {TABLE_HEAD.map((head, index) => (
                  <th key={head} className={` p-4 w-[175px] ${index === 0 && 'sticky left-0 z-10 bg-blue-gray-50'}`}>
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 ">
                      {head}
                    </Typography>
                  </th>
                ))}
                {/* {attributes.map((metric: SustainabilityMetric, i) => (
                  <th key={metric.name + i} className="p-4 w-[150px] xl:w-[225px]">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {metric.name}
                    </Typography>
                  </th>
                ))} */}
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
                        {reportResults[attribute.attributeName as keyof typeof reportResults] ? (
                          <div>results</div>
                        ) : (
                          <div
                            className={`w-full h-[32px] rounded-lg bg-gray-300 ${status === GenerationStatus.GENERATING && ' bg-gray-400 animate-pulse'}`}
                          />
                        )}
                      </td>
                    ))}
                    <td
                      className={
                        'p-4 h-auto w-auto sticky right-0 z-10 flex flex-row items-center justify-end bg-white'
                      }
                    >
                      {attributes.length > 0 && reports.length > 0 && (
                        <div className="flex gap-2">
                          <Button
                            className="bg-blue-900"
                            size="sm"
                            disabled={
                              isLoading || attributes.length === Object.keys(reports[index].reportResults).length
                            }
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
