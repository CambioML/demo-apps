import useMetricDetailModal from '@/app/hooks/CDPsustainabilityReport/useMetricDetailModal';
import { MetricFeedback } from '@/app/types/CDPSustainabilityTypes';
import { Button } from '@material-tailwind/react';

interface MetricComponentProps {
  metricFeedback: MetricFeedback;
  metricName: string;
}

const getBGColor = (score: number) => {
  switch (score) {
    case 0:
      return 'bg-red-600';
    case 1:
      return 'bg-red-500';
    case 2:
      return 'bg-yellow-600';
    case 3:
      return 'bg-green-500';
    case 4:
      return 'bg-green-600';
    case 5:
      return 'bg-green-700';
    default:
      return 'bg-gray-600';
  }
};

const getScoreAndLevel = (
  TCFDScore: number,
  IFRSS2Score: number,
  TCFDLevel: string,
  IFRSS2Level: string
): [number, string] => {
  let score;
  let level = 'Unknown';
  if (TCFDScore === 6 && IFRSS2Score === 6) {
    score = 6;
  } else if (TCFDScore === 6) {
    score = IFRSS2Score;
    level = IFRSS2Level;
  } else if (IFRSS2Score === 6) {
    score = TCFDScore;
  } else if (TCFDScore < IFRSS2Score) {
    score = TCFDScore;
    level = TCFDLevel;
  } else {
    score = IFRSS2Score;
    level = IFRSS2Level;
  }
  return [score, level];
};

const MetricComponent = ({ metricFeedback, metricName }: MetricComponentProps) => {
  const TCFDScore = metricFeedback['TCFD Response Score'] || 6;
  const IFRSS2Score = metricFeedback['IFRS S2 Response Score'] || 6;
  const TCFDLevel = metricFeedback['TCFD Response Level'] || 'Unknown';
  const IFRSS2Level = metricFeedback['IFRS S2 Response Level'] || 'Unknown';
  const [score, level] = getScoreAndLevel(TCFDScore, IFRSS2Score, TCFDLevel, IFRSS2Level);
  const MetricDetailModal = useMetricDetailModal();

  const handleMetricClick = () => {
    MetricDetailModal.onOpen(metricFeedback, metricName, level, getBGColor(score));
  };

  return (
    <Button
      size="sm"
      className={`${getBGColor(score)} w-full flex items-center justify-between gap-2`}
      onClick={handleMetricClick}
    >
      <span className="flex-shrink-0">{score}</span>
      <span className="flex-grow text-center">{level}</span>
    </Button>
  );
};

export default MetricComponent;
