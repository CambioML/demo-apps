export enum GenerationStatus {
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
}

export type Report = {
  sustainabilityReport: File;
  reportResults: { [key: string]: MetricFeedback };
  status: GenerationStatus;
};

export enum SustainabilityMetricClassification {
  METRICS_AND_TARGETS = 'Metrics and Targets',
  STRATEGY = 'Strategy',
  GOVERNANCE = 'Governance',
  RISK_MANAGEMENT = 'Risk Management',
}

export enum SustainabilityMetricCategory {
  C1_1a = 'C1.1a', // Governance
  C1_1b = 'C1.1b', // Governance
  C1_1c = 'C1.1c', // Governance
  C1_1d = 'C1.1d', // Governance
  C1_2a = 'C1.2a', // Governance
  C1_2b = 'C1.2b', // Governance
  C2_1a = 'C2.1a', // Risks and Opportunities
  C2_1b = 'C2.1b', // Risks and Opportunities
  C2_2a = 'C2.2a', // Risks and Opportunities
  C2_2b = 'C2.2b', // Risks and Opportunities
  C2_3a = 'C2.3a', // Risks and Opportunities
  C2_3b = 'C2.3b', // Risks and Opportunities
  C3_1a = 'C3.1a', // Business Strategy
  C3_1b = 'C3.1b', // Business Strategy
  C3_2a = 'C3.2a', // Business Strategy
  C3_2b = 'C3.2b', // Business Strategy
  C3_3 = 'C3.3', // Business Strategy
  C3_3a = 'C3.3a', // Business Strategy
  C3_3b = 'C3.3b', // Business Strategy
  C3_4 = 'C3.4', // Business Strategy
  C4_1a = 'C4.1a', // Emissions
  C4_1b = 'C4.1b', // Emissions
  C4_2a = 'C4.2a', // Emissions
  C4_2b = 'C4.2b', // Emissions
  C4_3a = 'C4.3a', // Emissions
  C4_3b = 'C4.3b', // Emissions
  C5_1a = 'C5.1a', // Energy
  C5_1b = 'C5.1b', // Energy
  C5_2a = 'C5.2a', // Energy
  C5_2b = 'C5.2b', // Energy
  C5_3a = 'C5.3a', // Energy
  C5_3b = 'C5.3b', // Energy
  C6_1 = 'C6.1', // Water
  C6_1a = 'C6.1a', // Water
  C6_1b = 'C6.1b', // Water
  C6_2a = 'C6.2a', // Water
  C6_2b = 'C6.2b', // Water
  C6_3a = 'C6.3a', // Water
  C6_3b = 'C6.3b', // Water
  C7_1a = 'C7.1a', // Waste
  C7_1b = 'C7.1b', // Waste
  C7_2a = 'C7.2a', // Waste
  C7_2b = 'C7.2b', // Waste
  C7_3a = 'C7.3a', // Waste
  C7_3b = 'C7.3b', // Waste
  C8_1a = 'C8.1a', // Supply Chain
  C8_1b = 'C8.1b', // Supply Chain
  C8_2a = 'C8.2a', // Supply Chain
  C8_2b = 'C8.2b', // Supply Chain
  C8_3a = 'C8.3a', // Supply Chain
  C8_3b = 'C8.3b', // Supply Chain
  C9_1a = 'C9.1a', // Targets and Performance
  C9_1b = 'C9.1b', // Targets and Performance
  C9_2a = 'C9.2a', // Targets and Performance
  C9_2b = 'C9.2b', // Targets and Performance
  C9_3a = 'C9.3a', // Targets and Performance
  C9_3b = 'C9.3b', // Targets and Performance
  C10_1a = 'C10.1a', // Engagement
  C10_1b = 'C10.1b', // Engagement
  C10_2a = 'C10.2a', // Engagement
  C10_2b = 'C10.2b', // Engagement
  C10_3a = 'C10.3a', // Engagement
  C10_3b = 'C10.3b', // Engagement
  C11_1a = 'C11.1a', // Climate Policy
  C11_1b = 'C11.1b', // Climate Policy
  C11_2a = 'C11.2a', // Climate Policy
  C11_2b = 'C11.2b', // Climate Policy
  C11_3a = 'C11.3a', // Climate Policy
  C11_3b = 'C11.3b', // Climate Policy
}

export type SustainabilityMetric = {
  name: string;
  question: string;
  classification: SustainabilityMetricClassification;
  TCFDDisclosureRequirements: string;
  category: SustainabilityMetricCategory;
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
