import { X } from '@phosphor-icons/react';

interface ModuleContainerProps {
  title: string;
  children: React.ReactNode;
  handleClose?: () => void;
}

const ModuleContainer = ({ title, children, handleClose }: ModuleContainerProps) => {
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
      <div className="text-2xl font-semibold pb-4">{title}</div>
      {children}
    </div>
  );
};

export default ModuleContainer;
