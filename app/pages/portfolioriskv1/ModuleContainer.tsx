import { X } from '@phosphor-icons/react';
import Heading from '../../components/Heading';

interface ModuleContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  handleClose?: () => void;
  outline?: boolean;
}

const ModuleContainer = ({ title, subtitle, children, handleClose, outline }: ModuleContainerProps) => {
  return (
    <div
      className={`min-h-fit w-full max-w-screen-xl bg-white rounded-xl p-8 relative ${outline && 'border-2 border-gray-100'}`}
    >
      {handleClose && (
        <button
          onClick={handleClose}
          className="
                       p-1
                       border=0
                       hover:opacity-70
                       transition
                       absolute
                       right-7
                       hover:bg-gray-200
                       rounded-full
                     "
        >
          <X size={24} />
        </button>
      )}
      <Heading title={title} subtitle={subtitle} small />
      {children}
    </div>
  );
};

export default ModuleContainer;
