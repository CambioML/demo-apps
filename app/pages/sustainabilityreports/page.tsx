'use client';
import Title from '../../components/Title';
import { Input, Button, Typography } from '@material-tailwind/react';
import { DefaultPagination } from '../../components/pagination';
import SustainabilityReportModal from '@/app/components/modals/SustainabilityReportModal';
import useSustainabilityReportModal from '@/app/hooks/sustainabilityReport/useSustainabilityReportModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';
import { ArrowsCounterClockwise, Plus, Sparkle } from '@phosphor-icons/react';
import {
  ExtractQAResult,
  GenerationStatus,
  ScoreProcessResult,
  SustainabilityMetric,
} from '@/app/types/SustainabilityTypes';
import SustainabilityMetricModal from '@/app/components/modals/SustainabilityMetricModal';
import useSustainabilityMetricModal from '@/app/hooks/sustainabilityReport/useSustainabilityMetricModal';
import extractQAPairs from '@/app/actions/sustainabilityReport/extractQAPairs';
import scoreProcess from '@/app/actions/sustainabilityReport/scoreProcess';
import MetricComponent from '@/app/components/SustainabilityReport/MetricComponent';
import MetricDetailModal from '@/app/components/modals/MetricDetailModal';

function Page() {
  const { reports, metrics, isLoading, setIsLoading, updateStatus, updateResults } = useSustainabilityStore();

  const TABLE_HEAD = ['Report'];

  const sustainabilityCompanyModal = useSustainabilityReportModal();
  const sustainabilityMetricModal = useSustainabilityMetricModal();

  const handleGenerate = async (reportIndex: number) => {
    setIsLoading(true);
    const report = reports[reportIndex];
    updateStatus(reportIndex, GenerationStatus.GENERATING);
    const qaResult: ExtractQAResult = await extractQAPairs({ report, metrics });
    const scoreResult: ScoreProcessResult = await scoreProcess({ qaPairs: qaResult.result.qaPairs, metrics });
    if (scoreResult.status !== 200 || scoreResult.result === null) {
      console.error('Error generating score:', scoreResult.error);
      setIsLoading(false);
      return;
    }
    console.log('Score generated for:', report.sustainabilityReport, scoreResult.result);
    updateStatus(reportIndex, GenerationStatus.GENERATED);
    updateResults(reportIndex, scoreResult.result);
    setIsLoading(false);
  };

  const handleGenerateAll = async () => {
    setIsLoading(true);
    try {
      const promises = reports.map(async (report, i) => {
        updateStatus(i, GenerationStatus.GENERATING);
        updateResults(i, {});
        const qaResult: ExtractQAResult = await extractQAPairs({ report, metrics });
        const scoreResult: ScoreProcessResult = await scoreProcess({ qaPairs: qaResult.result.qaPairs, metrics });
        if (scoreResult.status !== 200 || scoreResult.result === null) {
          console.error('Error generating score:', scoreResult.error);
          setIsLoading(false);
          return;
        }
        updateStatus(i, GenerationStatus.GENERATED);
        updateResults(i, scoreResult.result);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Error generating all reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (reportIndex: number) => {
    updateResults(reportIndex, {});
    handleGenerate(reportIndex);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SustainabilityReportModal />
      <SustainabilityMetricModal />
      <MetricDetailModal />
      <Title label="CDP Sustainability Reports 2023 - Fortune 500" />

      <div className="grid w-full grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-2 mt-8">
        <Input label="Company Name" className="cols-span-1" />
        <Input label="Start Date" />
        <Input label="End Date" />
        <Button fullWidth className="col-span-3 xl:col-span-1 bg-blue-900">
          Search
        </Button>
      </div>

      <div className="mt-8 gap-6 flex"></div>

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
                {metrics.map((metric: SustainabilityMetric, i) => (
                  <th key={metric.name + i} className="p-4 w-[150px] xl:w-[225px]">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {metric.name}
                    </Typography>
                  </th>
                ))}
                <th className="p-2 w-auto sticky right-0 z-10 flex flex-row items-start justify-between bg-blue-gray-50">
                  <Button
                    onClick={sustainabilityMetricModal.onOpen}
                    disabled={isLoading}
                    className="flex gap-2 text-gray-700 rounded-none border-l-[1px] border-gray-300"
                    variant="text"
                  >
                    <Plus size={16} className="shrink-0" /> New Metric
                  </Button>
                  <Button
                    onClick={handleGenerateAll}
                    disabled={isLoading || metrics.length === 0 || reports.length === 0}
                    className="flex gap-2 bg-blue-900"
                  >
                    <Sparkle size={16} className="shrink-0" /> Generate All
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map(({ reportResults, status, sustainabilityReport }, index) => {
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
                        {sustainabilityReport.name}
                      </Typography>
                    </td>
                    {metrics.map((metric, index) => (
                      <td className={classes} key={index + sustainabilityReport.name}>
                        {reportResults[metric.name] ? (
                          <MetricComponent metricFeedback={reportResults[metric.name]} metricName={metric.name} />
                        ) : (
                          <div
                            className={`w-full h-[32px] rounded-lg bg-gray-300 ${status === GenerationStatus.GENERATING && 'animate-pulse'}`}
                          />
                        )}
                      </td>
                    ))}
                    <td className={'p-2 h-full w-auto sticky right-0 z-10 flex flex-row items-center justify-end'}>
                      {metrics.length > 0 && reports.length > 0 && (
                        <>
                          {status === GenerationStatus.READY && (
                            <Button
                              size="sm"
                              className="bg-blue-900"
                              disabled={isLoading}
                              onClick={() => handleGenerate(index)}
                            >
                              <span className="flex">
                                Generate <Sparkle size={16} className="ml-2" />
                              </span>
                            </Button>
                          )}
                          {status === GenerationStatus.GENERATING && (
                            <Button className="bg-blue-900" size="sm" color="blue-gray" loading>
                              <span className="flex">Generating...</span>
                            </Button>
                          )}
                          {status === GenerationStatus.GENERATED && (
                            <Button
                              className="bg-blue-900"
                              size="sm"
                              disabled={isLoading}
                              onClick={() => handleRegenerate(index)}
                            >
                              <span className="flex">
                                Regenerate <ArrowsCounterClockwise size={16} className="ml-2" />
                              </span>
                            </Button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
              {reports.length === 0 && <tr className="w-full h-[50px] border-b border-blue-gray-100"></tr>}
              <tr className="w-full h-[50px] border-b border-blue-gray-100">
                <td className="sticky left-0 z-10 bg-white" colSpan={4}>
                  <Button
                    onClick={sustainabilityCompanyModal.onOpen}
                    className="flex gap-2 text-gray-700 rounded-none"
                    variant="text"
                  >
                    <Plus size={16} /> New Report
                  </Button>
                </td>
              </tr>
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
