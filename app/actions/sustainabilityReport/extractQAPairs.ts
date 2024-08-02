import { Report, ExtractQAResult, SustainabilityMetric } from '@/app/types/SustainabilityTypes';

interface IParams {
  report: Report;
  metrics: SustainabilityMetric[];
}

const extractQAPairs = async ({ report, metrics }: IParams): Promise<ExtractQAResult> => {
  console.log('Extracting QA for report:', report.sustainabilityReport.name);
  console.log('Metrics:', metrics);

  const qaPairs: Record<string, string>[] = [];

  // Convert File object to text
  const fileContent = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(report.sustainabilityReport);
  });

  for (const metric of metrics) {
    let answerStartIndex = fileContent.indexOf(metric.question);
    if (answerStartIndex === -1) {
      console.log('No answer found for:', metric.question);
      continue;
    }
    answerStartIndex += metric.question.length;
    const answerContent = fileContent.slice(answerStartIndex);

    // Regular expression to match the question pattern
    const pattern: RegExp = /^C\d{1,2}\.\d{1,2}[a-z]?/m;

    // Split the answer content into segments based on the pattern
    const segments: string[] = answerContent.split(pattern);
    const answer = segments[0].trim();
    console.log(`Answer found for ${metric.question}:`, answer);
    qaPairs.push({ [metric.name]: answer });
  }

  const response: ExtractQAResult = { status: 200, error: null, result: { qaPairs } };
  return response;
};

export default extractQAPairs;
