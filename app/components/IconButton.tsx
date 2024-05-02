import { Icon } from '@phosphor-icons/react';

interface IconButtonProps {
  icon: Icon;
  onClick: () => void;
}

const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center cursor-pointer p-4 hover:bg-neutral-200 hover:text-neutral-800 rounded-lg"
      onClick={onClick}
    >
      <Icon size={16} className="shrink-0" />
    </div>
  );
};

export default IconButton;
