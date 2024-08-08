import { MetricFeedback } from '@/app/types/CDPSustainabilityTypes';
import { create } from 'zustand';

interface MetricDetailModalStore {
  isOpen: boolean;
  onOpen: (metricFeedback: MetricFeedback, metricName: string, metricLevel: string, metricColor: string) => void;
  onClose: () => void;
  metricFeedback: MetricFeedback | null;
  metricName: string;
  metricLevel: string;
  metricColor: string;
}

const useMetricDetailModal = create<MetricDetailModalStore>((set) => ({
  isOpen: false,
  metricFeedback: null,
  metricName: '',
  metricLevel: '',
  metricColor: '',
  onOpen: (metricFeedback, metricName, metricLevel, metricColor) =>
    set({ isOpen: true, metricFeedback, metricName, metricLevel, metricColor }),
  onClose: () => set({ isOpen: false }),
}));

export default useMetricDetailModal;
