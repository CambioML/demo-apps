import { Company, ExtractQAResult, SustainabilityMetric } from '@/app/types/SustainabilityTypes';

interface IParams {
  company: Company;
  metrics: SustainabilityMetric[];
}

const extractQAPairs = async ({ company, metrics }: IParams): Promise<ExtractQAResult> => {
  console.log('Extracting QA for company:', company.companyName);
  console.log('Metrics:', metrics);
  const qaPairs: Record<string, string>[] = [];
  const fileResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_PATH}sustainability-reports/${company.sustainabilityReport}`
  );
  const fileContent = await fileResponse.text();
  for (const metric of metrics) {
    let answerStartIndex = fileContent.indexOf(metric.question);
    if (answerStartIndex === -1) {
      console.log('no answer found for:', metric.question);
      continue;
    }
    answerStartIndex += metric.question.length;
    const answerContent = fileContent.slice(answerStartIndex);
    // Regular expression to match the question pattern
    const pattern: RegExp = /^C\d{1,2}\.\d{1,2}[a-z]?/m;

    // Split the answer content into segments based on the pattern
    const segments: string[] = answerContent.split(pattern);
    const answer = segments[0].trim();
    console.log(`answer found for ${metric.question}:`, answer);
    qaPairs.push({ [metric.name]: answer });
  }
  const response: ExtractQAResult = { status: 200, error: null, result: { qaPairs } };

  return response;
};

export default extractQAPairs;
