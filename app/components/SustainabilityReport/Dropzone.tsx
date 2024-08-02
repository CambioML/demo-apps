import { useDropzone } from 'react-dropzone';
import { CloudArrowUp } from '@phosphor-icons/react';
import { useCallback, useState } from 'react';
import useSustainabilityStore from '@/app/hooks/sustainabilityReport/useSustainabilityStore';
import { GenerationStatus, Report } from '@/app/types/SustainabilityTypes';
const iconContainerClasses = 'flex items-center justify-center text-3xl mb-4';
const allowedTypes = ['text/plain'];

const Dropzone = () => {
  const { addReports, addReportsToAdd } = useSustainabilityStore();
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        if (file) {
          if (!allowedTypes.includes(file.type)) {
            setError(`Error processing ${file.name}: File type is not supported.`);
            return;
          }
          if (file.size > 10 * 1024 * 1024) {
            setError(`Error processing ${file.name}: Size exceeds the limit of 10 MB. Please try again.`);
            return;
          }
        }
      }

      const newReports: Report[] = [];
      acceptedFiles.forEach((file) => {
        const newReport: Report = {
          sustainabilityReport: file,
          reportResults: {},
          status: GenerationStatus.READY,
        };
        newReports.push(newReport);
      });
      addReportsToAdd(newReports);
    },
    [addReports]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div
        className={`border-2 ${error ? 'border-red-400' : 'border-gray-300'} bg-gray-100 border-dashed  h-[25vh] rounded-md text-center cursor-pointer transition duration-300 ease-in-out flex flex-col items-center justify-center hover:border-gray-500 w-full`}
        {...getRootProps()}
      >
        <div className={iconContainerClasses}>{<CloudArrowUp size={32} />}</div>
        <input {...getInputProps()} className="hidden" />
        <p className="mt-2">
          {isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to select files'}
        </p>
        <p className="text-sm text-gray-500">TXT files of CDP Reports only</p>
        <p className="text-sm text-gray-500">Please do not upload any sensitive information.</p>
        <p className="text-sm text-gray-500">Max 10 MB</p>
      </div>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default Dropzone;
