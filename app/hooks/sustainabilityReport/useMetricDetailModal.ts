import { MetricFeedback } from '@/app/types/SustainabilityTypes';
import { create } from 'zustand';

interface MetricDetailModalStore {
  isOpen: boolean;
  onOpen: (metricFeedback: MetricFeedback, metricName: string) => void;
  onClose: () => void;
  metricFeedback: MetricFeedback | null;
  metricName: string;
}

const useMetricDetailModal = create<MetricDetailModalStore>((set) => ({
  isOpen: false,
  metricFeedback: null,
  metricName: '',
  onOpen: (metricFeedback, metricName) => set({ isOpen: true, metricFeedback, metricName }),
  onClose: () => set({ isOpen: false }),
}));

export default useMetricDetailModal;
