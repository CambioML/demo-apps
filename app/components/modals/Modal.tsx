'use client';

import { X } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { useOutsideClickModal } from '@/app/hooks/useOutsideClickModal';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal = ({ isOpen, onClose, title, body, footer }: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const thisRef = useOutsideClickModal(() => {
    handleClose();
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-gray-800/70
      "
    >
      <div
        className="
          relative
          w-full
          md:w-4/5
          max-w-screen-2xl
          my-6
          mx-auto
          h-full
          md:h-auto
        "
      >
        <div
          className={`
          translate
          duration-300
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div
            className="
              translate
              h-full
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
            ref={thisRef}
          >
            <div
              className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              "
            >
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
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/*BODY*/}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            {footer && <div className="flex flex-col p-6">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
