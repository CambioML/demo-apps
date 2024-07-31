import { ScenarioDetailResponse } from '@/app/types/ScenarioTypes';
import ReferenceLinkButton from './ReferenceLinkButton';

interface DetailTableProps {
  detail: ScenarioDetailResponse;
}

const cellStyle = 'p-2 text-center whitespace-pre-wrap break-words';

const uuidRegex = /\b([a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12})\b/g;

const processStringWithUUIDs = (input: string): React.ReactNode[] => {
  const stringsToRemove = ['ID:', 'IDs:'];
  const pattern = new RegExp(stringsToRemove.map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  input = input.replace(pattern, '');

  const segments: React.ReactNode[] = [];
  let match;
  let lastIndex = 0;

  while ((match = uuidRegex.exec(input)) !== null) {
    // Add plain text segment before the match
    if (match.index > lastIndex) {
      segments.push(input.substring(lastIndex, match.index));
    }
    // Add UUID component
    const uuid = match[0];
    segments.push(<ReferenceLinkButton key={uuid} uuid={uuid} />);
    lastIndex = match.index + match[0].length;
  }

  // Add any remaining plain text after the last match
  if (lastIndex < input.length) {
    segments.push(input.substring(lastIndex));
  }

  return segments;
};

const DetailTable = ({ detail }: DetailTableProps) => {
  const renderCellValue = (value: string | React.ReactNode) => {
    return typeof value === 'string' ? <div>{value}</div> : value;
  };

  return (
    <div className="absolute w-full">
      <table className="border-none w-full table-fixed">
        <thead>
          <tr>
            {detail.header.map((header, index) => (
              <th key={index} className={`${cellStyle} sticky z-20 top-0 bg-gray-100`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {detail.data.map((rowData, index) => (
            <tr key={index}>
              {rowData.map((value, columnIndex) => (
                <td className={cellStyle} key={columnIndex}>
                  {renderCellValue(processStringWithUUIDs(value))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
