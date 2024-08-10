import {
  FeedbackResult,
  MetricFeedback,
  ScoreProcessResult,
  SustainabilityMetric,
} from '@/app/types/CDPSustainabilityTypes';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

const SCORE_DICT: { [key: number]: string } = {
  0: 'Non-Compliant',
  1: 'Low-Compliant',
  2: 'Partially Compliant',
  3: 'Baseline Compliant',
  4: 'Compliant',
  5: 'Beyond Compliant',
  6: 'Unknown',
};

// Function to remove specific characters from a string
function removeCharacters(inputString: string): string {
  const charactersToRemove = ['"', '{', '}', '\\', "'", '#', '*', '-'];
  charactersToRemove.forEach((char) => {
    inputString = inputString.split(char).join('');
  });
  return inputString;
}

// Function to extract score from feedback
function extractScore(feedback: string): number | null {
  const pattern = /\s*(\d+)\/5/;
  const match = feedback.match(pattern);
  return match ? Number(match[1]) : 6;
}

// Function to extract QA sections from feedback
function extractQA(feedback: string): FeedbackResult {
  feedback = removeCharacters(feedback);
  function extractSectionByKeywords(startKeyword: string, endKeyword: string, text: string): string | null {
    try {
      const startIndex = text.indexOf(startKeyword) + startKeyword.length;
      const endIndex = text.indexOf(endKeyword, startIndex);
      let section = text.substring(startIndex, endIndex).trim();
      if (section.startsWith(':')) {
        section = section.substring(1).trim();
      }
      return section;
    } catch (error) {
      return null;
    }
  }

  function extractScoreRationale(section: string | null): [string | null, string | null] {
    if (!section) return [null, null];
    const scoreMatch = section.match(/\s*Score:\s*(\d+\/\d+)/);
    const rationaleMatch = section.match(/\s*Rationale\s*:\s*(.*?)(?:$|[\r\n])/);
    const score = scoreMatch ? scoreMatch[1] : null;
    const rationale = rationaleMatch ? rationaleMatch[1].replace('\n', ' ').trim() : null;
    return [score, rationale];
  }

  function extractSuggestion(section: string | null): string | null {
    if (!section) return null;
    const suggestionMatch = section.match(/Suggestion\s*:\s*(.*?)(?:$|[\r\n])/);
    const suggestion = suggestionMatch ? suggestionMatch[1].replace('\n', ' ').trim() : null;
    return suggestion;
  }

  const tcfdScoringCriteria = extractSectionByKeywords('TCFD Scoring Criteria', 'TCFD Evaluation', feedback);
  const tcfdEvaluationSection = extractSectionByKeywords('TCFD Evaluation', 'TCFD Revision Suggestions', feedback);
  const tcfdRevisionSuggestionsSection = extractSectionByKeywords(
    'TCFD Revision Suggestions',
    'IFRS S2 Scoring Criteria',
    feedback
  );
  const ifrsScoringCriteria = extractSectionByKeywords('IFRS S2 Scoring Criteria', 'IFRS S2 Evaluation', feedback);
  const ifrsEvaluationSection = extractSectionByKeywords(
    'IFRS S2 Evaluation',
    'IFRS S2 Revision Suggestions',
    feedback
  );
  const ifrsRevisionSuggestionsSection = extractSectionByKeywords(
    'IFRS S2 Revision Suggestions',
    'Finish Response.',
    feedback
  );

  const [tcfdScore, tcfdRationale] = extractScoreRationale(tcfdEvaluationSection);
  const [ifrsScore, ifrsRationale] = extractScoreRationale(ifrsEvaluationSection);

  const tcfdSuggestion = extractSuggestion(tcfdRevisionSuggestionsSection);
  const ifrsSuggestion = extractSuggestion(ifrsRevisionSuggestionsSection);

  const result: FeedbackResult = {
    'TCFD Scoring Criteria': tcfdScoringCriteria || '',
    'TCFD Evaluation': {
      Score: tcfdScore || '',
      Rationale: tcfdRationale || '',
    },
    'TCFD Revision Suggestions': {
      Suggestion: tcfdSuggestion || '',
    },
    'IFRS S2 Scoring Criteria': ifrsScoringCriteria || '',
    'IFRS S2 Evaluation': {
      Score: ifrsScore || '',
      Rationale: ifrsRationale || '',
    },
    'IFRS S2 Revision Suggestions': {
      Suggestion: ifrsSuggestion || '',
    },
  };

  return result;
}

interface IParams {
  qaPairs: Record<string, string>[];
  metrics: SustainabilityMetric[];
}

const scoreProcess = async ({ qaPairs, metrics }: IParams): Promise<ScoreProcessResult> => {
  console.log('scoring process...');
  const metricEvaluations: { [key: string]: MetricFeedback } = {};

  const tasks = qaPairs.map(async (qaPair) => {
    const [questionName, answer] = Object.entries(qaPair)[0];
    const metric = metrics.find((metric) => metric.name === questionName);
    if (!metric) {
      throw new Error(`Metric not found for question: ${questionName}`);
    }
    const prompt = `Input Content:
            Question Description: ${metric.question}
            Baseline Response: ${metric.baselineResponse}
            Best Practice: ${metric.bestPractice}
            TCFD Disclosure Requirements: ${metric.TCFDDisclosureRequirements}
            IFRS S2 Disclosure Requirements: ${metric.IFRSS2DisclosureRequirements}
            Company Response: ${answer}
            Output Content:
            TCFD Scoring Criteria:
            Based on the given Question Description, Baseline Response (worst case), and Best Practice (best case), provide a 0-5 points scoring criteria specific to the TCFD requirements.
            Response Format:
            TCFD Scoring Criteria: 0-5 points based on the following:
            0 -
            1 -
            2 -
            3 -
            4 -
            5 -
            TCFD Evaluation:
            Evaluate the Company's response quality and depth based on the specified TCFD disclosure requirements. Please return the following in bullet point format:
                1. Determine if the response meets the specified TCFD disclosure requirements.
                2. Provide a TCFD score (0-5) based on the TCFD Scoring Criteria.
                3. If the TCFD score is under 4,provide at least three detailed reasons in the Rationale.
            Response Format:
            TCFD Evaluation:
            Score: x/5
            Rationale: "
            1. xxx
            2. xxx
            "
            TCFD Revision Suggestions:
            Based on the TCFD score, please return the following in bullet point format:
                1. Identify deficiencies for unmet disclosure requirements.
                2. Provide revision suggestions for each deficiency.
                3. If the TCFD score is under 4, provide at least three detailed suggestions, highlighting specific actions and examples for improvement.
            Response Format:
            TCFD Revision Suggestions:
            Suggestion: "
            1. xxx
            2. xxx
            "
            IFRS S2 Scoring Criteria:
            Based on the given Question Description, Baseline Response (worst case), and Best Practice (best case), provide a 0-5 points scoring criteria specific to the IFRS S2 requirements.
            Response Format:
            IFRS S2 Scoring Criteria:0-5 points based on the following:
            0 -
            1 -
            2 -
            3 -
            4 -
            5 -
            IFRS S2 Evaluation:
            Based on the IFRS S2 requirements, please return the following in bullet point format:
                1. Re-evaluate the Company's response.
                2. Provide a new score (0-5) based on the IFRS S2 Scoring Criteria.
                3. If the IFRS S2 score is under 4, should provide at least three detailed reasons in the Rationale.
            Response Format:
            IFRS S2 Evaluation:
            Score: x/5
            Rationale: "
                1. xxx
                2. xxx
            "
            IFRS S2 Revision Suggestions:
            Based on the IFRS S2 Evaluation score, please return the following in bullet point format:
                1. Deficiencies for unmet disclosure requirements.
                2. Revision suggestions for each deficiency.
                3. If the IFRS S2 score is under 4, provide at least three detailed suggestions, highlighting specific actions and examples for improvement.
            Response Format:
            IFRS S2 Revision Suggestions:
            Suggestion: "
            1. xxx
            2. xxx
            "
    `;
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      max_tokens: 4096,
      messages: [
        { role: 'user', content: prompt },
        { role: 'assistant', content: '{' },
      ],
      model: 'gpt-4o',
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
    const initResult = chatCompletion.choices[0].message.content + 'Finish Response.';

    const feedback: FeedbackResult = extractQA(initResult);

    const currOutput: MetricFeedback = {
      'TCFD Scoring Criteria': feedback['TCFD Scoring Criteria'],
      'TCFD Response Score': extractScore(feedback['TCFD Evaluation']['Score']),
      'TCFD Response Level': SCORE_DICT[extractScore(feedback['TCFD Evaluation']['Score']) || 6],
      'TCFD Response Summary': feedback['TCFD Evaluation'].Rationale,
      'TCFD Response Recommendation': feedback['TCFD Revision Suggestions'].Suggestion,

      'IFRS S2 Scoring Criteria': feedback['IFRS S2 Scoring Criteria'],
      'IFRS S2 Response Score': extractScore(feedback['IFRS S2 Evaluation'].Score),
      'IFRS S2 Response Level': SCORE_DICT[extractScore(feedback['IFRS S2 Evaluation'].Score) || 6],
      'IFRS S2 Response Summary': feedback['IFRS S2 Evaluation'].Rationale,
      'IFRS S2 Response Recommendation': feedback['IFRS S2 Revision Suggestions'].Suggestion,
    };
    metricEvaluations[questionName] = currOutput;
  });

  try {
    await Promise.all(tasks);
    const response: ScoreProcessResult = {
      status: 200,
      error: null,
      result: metricEvaluations,
    };
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 500,
        error: error.message,
        result: null,
      };
    } else {
      return {
        status: 500,
        error: 'Error generating score.',
        result: null,
      };
    }
  }
};

export default scoreProcess;
