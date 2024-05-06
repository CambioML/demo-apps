import { X } from '@phosphor-icons/react';
import Heading from '../Heading';

interface ModuleContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  handleClose?: () => void;
}

const ModuleContainer = ({ title, subtitle, children, handleClose }: ModuleContainerProps) => {
  return (
    <div className="h-full w-full max-w-screen-xl bg-white rounded-xl p-8 pb-16 relative">
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
                       hover:bg-neutral-200
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
