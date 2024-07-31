'use client';
import Title from '../../components/Title';
import { Input, Button, Typography } from '@material-tailwind/react';
import { DefaultPagination } from '../../components/pagination';
import SustainabilityCompanyModal from '@/app/components/modals/SustainabilityCompanyModal';
import useSustainabilityCompanyModal from '@/app/hooks/sustainabilityReport/useSustainabilityCompanyModal';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';
import { ArrowsCounterClockwise, Sparkle } from '@phosphor-icons/react';
import {
  ExtractQAResult,
  GenerationStatus,
  ScoreProcessResult,
  SustainabilityMetric,
} from '@/app/types/SustainabilityTypes';
import SustainabilityMetricModal from '@/app/components/modals/SustainabilityMetricModal';
import useSustainabilityMetricModal from '@/app/hooks/sustainabilityReport/useSustainabilityMetricModal';
import { sustainabilityCompanies, sustainabilityMetrics } from '@/app/data/sustainabilityReport';
import extractQAPairs from '@/app/actions/sustainabilityReport/extractQAPairs';
import scoreProcess from '@/app/actions/sustainabilityReport/scoreProcess';
import MetricComponent from '@/app/components/SustainabilityReport/MetricComponent';
import MetricDetailModal from '@/app/components/modals/MetricDetailModal';

function Page() {
  const { companies, metrics, isLoading, setIsLoading, updateStatus, updateResults } = useSustainabilityStore();

  const TABLE_HEAD = ['Company', 'Generate Metrics'];

  const sustainabilityCompanyModal = useSustainabilityCompanyModal();
  const sustainabilityMetricModal = useSustainabilityMetricModal();

  const handleGenerate = async (companyIndex: number) => {
    setIsLoading(true);
    const company = companies[companyIndex];
    updateStatus(companyIndex, GenerationStatus.GENERATING);
    const qaResult: ExtractQAResult = await extractQAPairs({ company, metrics });
    const scoreResult: ScoreProcessResult = await scoreProcess({ qaPairs: qaResult.result.qaPairs, metrics });
    if (scoreResult.status !== 200 || scoreResult.result === null) {
      console.error('Error generating score:', scoreResult.error);
      setIsLoading(false);
      return;
    }
    console.log('Score generated for:', company.companyName, scoreResult.result);
    updateStatus(companyIndex, GenerationStatus.GENERATED);
    updateResults(companyIndex, scoreResult.result);
    setIsLoading(false);
  };

  const handleRegenerate = async (companyIndex: number) => {
    updateResults(companyIndex, {});
    handleGenerate(companyIndex);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SustainabilityCompanyModal />
      <SustainabilityMetricModal />
      <MetricDetailModal />
      <Title label="CDP Sustainability Reports 2023 - Fortune 500" />

      <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2 mt-8">
        <Input label="Company Name" className="cols-span-1" />
        <Input label="Start Date" />
        <Input label="End Date" />
        <Button>Search</Button>
      </div>

      <div className="mt-8 gap-6 flex">
        <Button
          onClick={sustainabilityCompanyModal.onOpen}
          disabled={isLoading || companies.length === sustainabilityCompanies.length}
        >
          Add New Company
        </Button>
        <Button
          onClick={sustainabilityMetricModal.onOpen}
          disabled={isLoading || metrics.length === sustainabilityMetrics.length}
        >
          Add New Metric
        </Button>
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left mt-8">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${index === 0 || index === 1 ? 'w-[150px]' : 'w-auto'}`}
                  >
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
                {metrics.map((metric: SustainabilityMetric, i) => (
                  <th key={metric.name + i} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {metric.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companies.map(({ companyName, reportResults, status }, index) => {
                const isLast = index === companies.length - 1;
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={index}>
                    <td className={`${classes}`}>
                      <Typography variant="paragraph" color="blue-gray" className="font-normal">
                        {companyName}
                      </Typography>
                    </td>
                    <td className={`${classes}`}>
                      {metrics.length === 0 && status === GenerationStatus.READY ? (
                        <Button size="sm" onClick={sustainabilityMetricModal.onOpen} disabled={isLoading}>
                          Add Metric
                        </Button>
                      ) : (
                        <>
                          {status === GenerationStatus.READY && (
                            <Button size="sm" disabled={isLoading} onClick={() => handleGenerate(index)}>
                              <span className="flex">
                                Generate <Sparkle size={16} className="ml-2" />
                              </span>{' '}
                            </Button>
                          )}
                          {status === GenerationStatus.GENERATING && (
                            <Button size="sm" color="blue-gray" className="animate-pulse">
                              <span className="flex">Generating...</span>
                            </Button>
                          )}
                          {status === GenerationStatus.GENERATED && (
                            <Button size="sm" disabled={isLoading} onClick={() => handleRegenerate(index)}>
                              <span className="flex">
                                Regenerate <ArrowsCounterClockwise size={16} className="ml-2" />
                              </span>
                            </Button>
                          )}
                        </>
                      )}
                    </td>
                    {metrics.map((metric, index) => (
                      <td className={classes} key={index + companyName}>
                        {reportResults[metric.name] ? (
                          <MetricComponent metricFeedback={reportResults[metric.name]} metricName={metric.name} />
                        ) : (
                          <div
                            className={`w-full h-[32px] rounded-lg bg-gray-300 ${status === GenerationStatus.GENERATING && 'animate-pulse'}`}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
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
