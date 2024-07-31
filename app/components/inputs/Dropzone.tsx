import { useDropzone } from 'react-dropzone';
import { CloudArrowUp } from '@phosphor-icons/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import useScenarioStore from '@/app/hooks/useScenarioStore';
const iconContainerClasses = 'flex items-center justify-center text-3xl mb-4';
const allowedTypes = ['application/pdf', 'text/html', 'text/plain', 'image/png', 'image/jpeg', 'image/jpg'];

const Dropzone = () => {
  const { filesToUpload, setFilesToUpload } = useScenarioStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        if (file) {
          if (!allowedTypes.includes(file.type)) {
            toast.error(`Error processing ${file.name}: File type is not supported.`);
            return;
          }
          if (file.size > 10 * 1024 * 1024) {
            toast.error(`Error processing ${file.name}: Size exceeds the limit of 10 MB. Please try again.`);
            return;
          }
        }
      }
      setFilesToUpload([...filesToUpload, ...acceptedFiles]);
      console.log(acceptedFiles);
    },
    [setFilesToUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="border-2 bg-gray-100 border-dashed border-gray-300 h-[25vh] rounded-md text-center cursor-pointer transition duration-300 ease-in-out flex flex-col items-center justify-center hover:border-gray-500 w-full"
      {...getRootProps()}
    >
      <div className={iconContainerClasses}>{<CloudArrowUp size={32} />}</div>
      <input {...getInputProps()} className="hidden" />
      <p className="mt-2">
        {isDragActive ? 'Drop files here' : 'Drag and drop a files here, or click to select files'}
      </p>
      <p className="text-sm text-gray-500">PDF, TXT, HTML, PNG, JPG, and JPEG files only</p>
      <p className="text-sm text-gray-500">Please do not upload any sensitive information.</p>
      <p className="text-sm text-gray-500">Max 10 MB</p>
    </div>
  );
};

export default Dropzone;
