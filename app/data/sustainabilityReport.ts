import {
  SustainabilityMetric,
  SustainabilityMetricCategory,
  SustainabilityMetricClassification,
} from '../types/SustainabilityTypes';

export const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    name: 'Board Oversight',
    question:
      'Identify the position(s) (do not include any names) of the individual(s) on the board with responsibility for climate-related issues.',
    classification: SustainabilityMetricClassification.GOVERNANCE,
    TCFDDisclosureRequirements: 'a) Describe the board’s oversight of climate-related risks and opportunities.',
    category: SustainabilityMetricCategory.C1_1a,
    baselineResponse: 'Report specifies no position on the board with responsibility for climate-related issues.',
    bestPractice:
      'Companies allocate responsibility for climate-related issues to specific board-level positions/committees.',
    IFRSS2DisclosureRequirements:
      'Disclose how the governance body (e.g., board of directors) ensures its oversight responsibilities for the reliability and completeness of climate-related information;Provide detailed descriptions of the specific measures the governance body takes to supervise the quality and completeness of climate-related disclosures.',
  },
  {
    name: 'Climate-Related Financial Planning',
    question: 'Describe where and how climate-related risks and opportunities have influenced your strategy.',
    classification: SustainabilityMetricClassification.STRATEGY,
    TCFDDisclosureRequirements:
      'Describe the impact of climate-related risks and opportunities on the organization’s businesses, strategy, and financial planning.',
    category: SustainabilityMetricCategory.C3_4,
    baselineResponse:
      'Report does not provide disclosure on how identified risks and opportunities have impacted different business areas.',
    bestPractice: 'Report details how identified risks and opportunities have been factored into financial planning.',
    IFRSS2DisclosureRequirements:
      "Provide detailed descriptions of the impact of climate-related risks and opportunities on the business model and value chain, specifically on resource allocation and operational activities; Emphasize the organization's sustainability and flexibility in the face of climate change.;Disclose how climate change factors are incorporated into long-term strategy and planning.",
  },
  {
    name: 'Climate-Related Strategy',
    question: 'Describe where and how climate-related risks and opportunities have influenced your strategy.',
    classification: SustainabilityMetricClassification.STRATEGY,
    TCFDDisclosureRequirements:
      'Describe the impact of climate-related risks and opportunities on the organization’s businesses, strategy, and financial planning.',
    category: SustainabilityMetricCategory.C3_3,
    baselineResponse:
      'Report does not describe where and how climate-related risks and opportunities have influenced its strategy',
    bestPractice:
      'Report describes in detail where and how climate-related risks and opportunities have influenced its strategy',
    IFRSS2DisclosureRequirements:
      "Provide detailed descriptions of the impact of climate-related risks and opportunities on the business model and value chain, specifically on resource allocation and operational activities; Emphasize the organization's sustainability and flexibility in the face of climate change.;Disclose how climate change factors are incorporated into long-term strategy and planning.",
  },
  {
    name: 'Emissions Targets (Absolute)',
    question: 'Provide details of your absolute emissions target(s) and progress made against those targets.',
    classification: SustainabilityMetricClassification.METRICS_AND_TARGETS,
    TCFDDisclosureRequirements:
      'Describe the targets used by the organization to manage climate-related risks and opportunities and performance against targets.',
    category: SustainabilityMetricCategory.C4_1a,
    baselineResponse: 'Report discloses no emissions target',
    bestPractice:
      'Companies make progress against emissions targets that reflect their full emissions inventory, and are line with SBTi criteria.',
    IFRSS2DisclosureRequirements:
      'Disclose specific financial and non-financial metrics used to assess and manage climate-related risks and opportunities; Provide detailed disclosures on the calculation methods, data sources, and related assumptions for greenhouse gas emissions; Disclose specific progress on climate-related targets, the timeline for achieving these targets, and the specific measures taken to achieve them.',
  },
  {
    name: 'Emission Targets and Progress',
    question: 'Provide details of your absolute emissions target(s) and progress made against those targets.',
    classification: SustainabilityMetricClassification.METRICS_AND_TARGETS,
    TCFDDisclosureRequirements:
      'c) Describe the targets used by the organization to manage climate-related risks and opportunities and performance against targets.',
    category: SustainabilityMetricCategory.C4_1a,
    baselineResponse: 'Report discloses no emissions target',
    bestPractice:
      'Companies make progress against emissions targets that reflect their full emissions inventory, and are line with SBTi criteria.',
    IFRSS2DisclosureRequirements:
      'Disclose specific financial and non-financial metrics used to assess and manage climate-related risks and opportunities; Provide detailed disclosures on the calculation methods, data sources, and related assumptions for greenhouse gas emissions; Disclose specific progress on climate-related targets, the timeline for achieving these targets, and the specific measures taken to achieve them.',
  },
  {
    name: 'Scope One CO2e Emissions',
    question: 'What were your organization’s gross global Scope 1 emissions in metric tons CO2e?',
    classification: SustainabilityMetricClassification.METRICS_AND_TARGETS,
    TCFDDisclosureRequirements:
      'Disclose Scope 1, Scope 2, and, if appropriate, Scope 3 greenhouse gas (GHG) emissions, and the related risks.',
    category: SustainabilityMetricCategory.C6_1,
    baselineResponse: 'Report does not disclose Scope 1 emissions',
    bestPractice:
      'Companies disclose that their Scope 1 emissions in the reporting year have reduced in line with a 1.5 °C-aligned pathway.',
    IFRSS2DisclosureRequirements:
      'Disclose specific financial and non-financial metrics used to assess and manage climate-related risks and opportunities; Provide detailed disclosures on the calculation methods, data sources, and related assumptions for greenhouse gas emissions;Disclose specific progress on climate-related targets, the timeline for achieving these targets, and the specific measures taken to achieve them',
  },
  {
    name: 'Time Horizons',
    question: 'How does your organization define short-, medium- and long-term time horizons?',
    classification: SustainabilityMetricClassification.STRATEGY,
    TCFDDisclosureRequirements:
      'a) Describe the climate-related risks and opportunities the organization has identified over the short, medium, and long term.',
    category: SustainabilityMetricCategory.C2_1a,
    baselineResponse:
      'No documented process for identifying, assessing or managing climate-related risks and opportunities',
    bestPractice: 'Establishes six month time horizons that define substantive financial or strategic impact',
    IFRSS2DisclosureRequirements:
      "Provide detailed descriptions of the impact of climate-related risks and opportunities on the business model and value chain, specifically on resource allocation and operational activities; Emphasize the organization's sustainability and flexibility in the face of climate change; Disclose how climate change factors are incorporated into long-term strategy and planning.",
  },
];

export const getMetricFromName = (name: string): SustainabilityMetric | undefined => {
  return sustainabilityMetrics.find((metric) => metric.name === name);
};
