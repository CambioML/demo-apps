import { Icon } from '@phosphor-icons/react';

interface SideBarItemProps {
  label: string;
  icon: Icon;
}

const SideBarItem = ({ label, icon: Icon }: SideBarItemProps) => {
  return (
    <div className="text-lg p-4 my-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-neutral-100 hover:text-neutral-600">
      <Icon size={24} className="" />
      {label}
    </div>
  );
};

export default SideBarItem;
