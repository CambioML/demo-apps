'use client';
import { Avatar } from '@material-tailwind/react';
import { BellIcon } from '@heroicons/react/24/outline';

function Header() {
  return (
    <div className="w-full h-20 flex items-center border-gray-200 border-b px-4 py-2">
      <div className="ml-auto flex">
        {/* <Badge color="red"> */}
        <BellIcon className="w-8 mr-2 cursor-pointer" />
        {/* </Badge> */}
        <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-200">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="sm" />
          <span className="ml-2 font-semibold text-gray-700 text-lg">Jojo Ortiz</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
