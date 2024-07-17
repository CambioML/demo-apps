'use client';
import { ListItem, ListItemPrefix, ListItemSuffix } from '@material-tailwind/react';
import Link from 'next/link';
interface SideBarItemProps {
  label: string;
  type: string;
  icon?: any;
  suffix?: any;
  link?: string;
}

const SideBarItem = ({ type, icon, label, suffix, link }: SideBarItemProps) => {
  return (
    <>
      {type === 'menu' && (
        <Link href={link || '#'}>
          <ListItem>
            {icon && <ListItemPrefix className="h-6 w-6 shrink-0">{icon}</ListItemPrefix>}
            {label}
            {suffix && <ListItemSuffix>{suffix}</ListItemSuffix>}
          </ListItem>
        </Link>
      )}
      {type === 'divid' && <hr className="my-2 border-blue-gray-50" />}
    </>
  );
};

export default SideBarItem;
