'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { Button } from '@material-tailwind/react';
import { useOutsideClickModal } from '@/app/hooks/useOutsideClickModal';

interface FormModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  redAction?: boolean;
  actionDisabled?: boolean;
  secondaryActionDisabled?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  redAction = false,
  actionDisabled = false,
  secondaryActionDisabled = false,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const thisRef = useOutsideClickModal(() => {
    handleClose();
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
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
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        "
        >
          <div
            className={`
          translate
          duration-300
          h-full
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
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
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                  flex
                  flex-row
                  items-center
                  gap-4
                  w-full
                "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled || secondaryActionDisabled}
                      onClick={handleSecondaryAction}
                      className="flex-1 text-base"
                      variant="outlined"
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    disabled={disabled || actionDisabled}
                    onClick={handleSubmit}
                    className={`flex-1 text-base ${redAction ? 'bg-red-900' : 'bg-blue-900'}`}
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
