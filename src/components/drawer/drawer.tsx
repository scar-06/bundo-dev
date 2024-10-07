"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import cn from "@/lib/utils";

import { Button } from "../ui/button";

interface IDrawer {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  option?: string;
  width?: string;
  anchor?: "right" | "left" | "center";
  onAction?: () => void;
  onSeconAction?: () => void;
  isFooter?: boolean;
  fullWidth?: boolean;
  actionText?: string;
  secActionText?: string;
  isSecCancel?: boolean;
  actionSeverity?: "error" | "secondary" | "primary" | "success";
  secActionSeverity?: "error" | "secondary" | "primary" | "success";
  loading?: boolean;
  secActionClassName?: string;
  containerClassName?: string;
  childClassName?: string;
  ActionButton?: React.ComponentProps<typeof Button>;
  SecActionButton?: React.ComponentProps<typeof Button>;
  selector: string;
  z?: string;
  bg?: string;
  h?: string;
  borderRadius?: string;
  widthStyles?: string;
}

function Drawer({
  open,
  onClose,
  title,
  children,
  anchor = "right",
  isFooter,
  fullWidth,
  onAction,
  onSeconAction,
  actionText,
  secActionText,
  isSecCancel,
  secActionClassName,
  containerClassName,
  loading,
  childClassName,
  ActionButton,
  SecActionButton,
  selector, // portal id
  z = "z-10",
  bg,
  h,
  borderRadius,
  widthStyles,
}: IDrawer) {
  const portalRef = useRef<Element | null>(null);
  const [bodyOverflow, setBodyOverflow] = useState("");

  useEffect(() => {
    if (open) {
      setBodyOverflow(document.body.style.overflow);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = bodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    portalRef.current = document.getElementById(selector);
  }, [selector]);

  const closeDrawer = () => {
    document.body.style.overflow = bodyOverflow;
    onClose();
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {portalRef.current &&
        ReactDOM.createPortal(
          <div role="presentation" className="app-drawer-root">
            <div
              onClick={closeDrawer}
              className={`hideScrollBar ${
                open ? "block" : "hidden"
              } left-0 transition-opacity duration-200 ${
                open ? "opacity-30" : "opacity-0"
              } fixed top-0 h-[100vh] w-[100%] bg-black ${z}`}
            />

            <div
              className={cn(
                "hideScrollBar fixed top-20 z-[250] transform transition-all duration-500 sm:w-[60vw] md:w-[353px]",
                bg || "bg-white",
                h || "h-screen",
                borderRadius || "",
                widthStyles || "",
                !fullWidth && " max-w-md",
                anchor === "center"
                  ? " left-1/2 -translate-x-1/2"
                  : anchor === "right"
                    ? "right-0 mmlg:top-[72px] "
                    : "left-0",
                anchor === "right"
                  ? ` ${open ? "" : "translate-x-full"}`
                  : anchor === "center"
                    ? `${open ? "top-1/2 -translate-y-1/2" : "top-full"}`
                    : ` ${open ? "" : "-translate-x-full"}`,
              )}
            >
              <div
                className={cn(
                  `hideScrollBar relative grid h-full w-full grid-rows-[auto_1fr_70px] items-stretch overflow-auto font-tv2SansDisplay`,
                  containerClassName,
                )}
              >
                {title && (
                  <div className="z-[2] flex items-center justify-between border-b p-4">
                    <p className="flex-1 text-base font-bold">{title}</p>
                    <button onClick={closeDrawer}>close</button>
                  </div>
                )}
                <div
                  className={cn(
                    " max-h-screen flex-1 overflow-auto",
                    childClassName,
                  )}
                >
                  {children}
                </div>
                {isFooter && (
                  <div className="sticky bottom-0 z-[2] grid items-center rounded-bl-3xl bg-[#F1F4F6] px-4">
                    <div className="flex items-center justify-end gap-2 ">
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          className={secActionClassName}
                          onClick={() => {
                            if (loading) return;
                            if (isSecCancel) {
                              onClose();
                            } else if (onSeconAction) {
                              onSeconAction();
                            }
                          }}
                          {...SecActionButton}
                        >
                          {secActionText || "Cancel"}
                        </Button>
                        {actionText && (
                          <Button
                            variant="deep-green"
                            disabled={loading}
                            onClick={() => {
                              if (loading) return;
                              if (onAction) onAction();
                            }}
                            {...ActionButton}
                          >
                            {actionText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          portalRef.current,
        )}
    </>
  );
}

export default Drawer;
