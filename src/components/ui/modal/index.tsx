"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "../button";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id?: string;
  alignEnd?: boolean;
  children?: React.ReactNode;
  showCloseIcon?: boolean;
  customPanelClassName?: string;
}

function Modal({
  isOpen,
  closeModal,
  id,
  children,
  alignEnd,
  showCloseIcon,
  customPanelClassName,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment} unmount>
      <Dialog
        as="div"
        className="relative z-[1000000000]"
        onClose={closeModal}
        id={id}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[99] bg-black/70" />
        </Transition.Child>

        <div className="no-scrollbar fixed inset-0 z-[100] w-full overflow-y-auto">
          <div
            className={clsx(
              "flex min-h-full items-center p-4 text-center",
              alignEnd ? "justify-end" : "justify-center",
              showCloseIcon && "px-14",
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "flex w-full items-center max-w-[635px]",
                  customPanelClassName,
                )}
              >
                {children}

                {showCloseIcon && (
                  <Button variant={"plain"} size={"plain"}>
                    &times;
                  </Button>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export { Modal };
