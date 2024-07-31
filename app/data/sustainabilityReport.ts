import {
  Company,
  GenerationStatus,
  SustainabilityMetric,
  SustainabilityMetricClassification,
} from '../types/SustainabilityTypes';

export const sustainabilityCompanies: Company[] = [
  {
    companyName: 'Alphabet',
    year: 2023,
    sustainabilityReport: 'Alphabet_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'AT&T',
    year: 2023,
    sustainabilityReport: 'ATT_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Best Buy',
    year: 2023,
    sustainabilityReport: 'BestBuy_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Cisco Systems',
    year: 2023,
    sustainabilityReport: 'Cisco_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Ford Motor Company',
    year: 2023,
    sustainabilityReport: 'Ford_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'HP Inc.',
    year: 2023,
    sustainabilityReport: 'HP_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Intel Corporation',
    year: 2023,
    sustainabilityReport: 'Intel_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Salesforce',
    year: 2023,
    sustainabilityReport: 'Salesforce_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Volvo Group',
    year: 2023,
    sustainabilityReport: 'Volvo_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
  {
    companyName: 'Xerox',
    year: 2023,
    sustainabilityReport: 'Xerox_2023.txt',
    reportResults: {},
    status: GenerationStatus.READY,
  },
];

export const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    name: 'Board Oversight',
    question:
      'Identify the position(s) (do not include any names) of the individual(s) on the board with responsibility for climate-related issues.',
    classification: SustainabilityMetricClassification.GOVERNANCE,
    TCFDDisclosureRequirements: 'a) Describe the board’s oversight of climate-related risks and opportunities.',
    category: 'C1.1a',
    baselineResponse: 'Company specifies no position on the board with responsibility for climate-related issues.',
    bestPractice:
      'Companies allocate responsibility for climate-related issues to specific board-level positions/committees.',
    IFRSS2DisclosureRequirements:
      'Disclose how the governance body (e.g., board of directors) ensures its oversight responsibilities for the reliability and completeness of climate-related information;Provide detailed descriptions of the specific measures the governance body takes to supervise the quality and completeness of climate-related disclosures.',
  },
  {
    name: 'Time Horizons',
    question: 'How does your organization define short-, medium- and long-term time horizons?',
    classification: SustainabilityMetricClassification.STRATEGY,
    TCFDDisclosureRequirements:
      'a) Describe the climate-related risks and opportunities the organization has identified over the short, medium, and long term.',
    category: 'C2.1a',
    baselineResponse:
      'No documented process for identifying, assessing or managing climate-related risks and opportunities',
    bestPractice: 'Establishes six month time horizons that define substantive financial or strategic impact',
    IFRSS2DisclosureRequirements:
      "Provide detailed descriptions of the impact of climate-related risks and opportunities on the business model and value chain, specifically on resource allocation and operational activities; Emphasize the organization's sustainability and flexibility in the face of climate change; Disclose how climate change factors are incorporated into long-term strategy and planning.",
  },
  {
    name: 'Emission Targets and Progress',
    question: 'Provide details of your absolute emissions target(s) and progress made against those targets.',
    classification: SustainabilityMetricClassification.METRICS_AND_TARGETS,
    TCFDDisclosureRequirements:
      'c) Describe the targets used by the organization to manage climate-related risks and opportunities and performance against targets.',
    category: 'C4.1a',
    baselineResponse: 'Company discloses no emissions target',
    bestPractice:
      'Companies make progress against emissions targets that reflect their full emissions inventory, and are line with SBTi criteria.',
    IFRSS2DisclosureRequirements:
      'Disclose specific financial and non-financial metrics used to assess and manage climate-related risks and opportunities; Provide detailed disclosures on the calculation methods, data sources, and related assumptions for greenhouse gas emissions; Disclose specific progress on climate-related targets, the timeline for achieving these targets, and the specific measures taken to achieve them.',
  },
];

export const getCompanyFromReport = (report: string): Company | undefined => {
  return sustainabilityCompanies.find((company) => company.sustainabilityReport === report);
};

export const getMetricFromName = (name: string): SustainabilityMetric | undefined => {
  return sustainabilityMetrics.find((metric) => metric.name === name);
};
