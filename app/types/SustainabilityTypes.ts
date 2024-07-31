export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Company = {
  companyName: string;
  year: number;
  sustainabilityReport: string;
  reportResults: { [key: string]: MetricFeedback };
  status: GenerationStatus;
};

export enum SustainabilityMetricClassification {
  METRICS_AND_TARGETS = 'Metrics and Targets',
  STRATEGY = 'Strategy',
  GOVERNANCE = 'Governance',
  RISK_MANAGEMENT = 'Risk Management',
}

export type SustainabilityMetric = {
  name: string;
  question: string;
  classification: SustainabilityMetricClassification;
  TCFDDisclosureRequirements: string;
  category: string;
  baselineResponse: string;
  bestPractice: string;
  IFRSS2DisclosureRequirements: string;
};

export type ExtractQAResult = {
  status: number;
  error: string | null;
  result: { qaPairs: Record<string, string>[] };
};

export type ScoreProcessResult = {
  status: number;
  error: string | null;
  result: {
    [key: string]: MetricFeedback;
  } | null;
};

export type FeedbackResult = {
  'IFRS S2 Evaluation': {
    Score: string;
    Rationale: string;
  };
  'IFRS S2 Revision Suggestions': {
    Suggestion: string;
  };
  'IFRS S2 Scoring Criteria': string;
  'TCFD Evaluation': {
    Score: string;
    Rationale: string;
  };
  'TCFD Revision Suggestions': {
    Suggestion: string;
  };
  'TCFD Scoring Criteria': string;
};

export type MetricFeedback = {
  'TCFD Scoring Criteria': string;
  'TCFD Response Score': number | null; // Assuming extractScore returns a number
  'TCFD Response Level': string;
  'TCFD Response Summary': string;
  'TCFD Response Recommendation': string;

  'IFRS S2 Scoring Criteria': string;
  'IFRS S2 Response Score': number | null; // Assuming extractScore returns a number
  'IFRS S2 Response Level': string;
  'IFRS S2 Response Summary': string;
  'IFRS S2 Response Recommendation': string;
};
