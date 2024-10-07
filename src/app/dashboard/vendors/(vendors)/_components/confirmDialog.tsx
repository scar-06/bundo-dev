import React from "react";

import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  deleting: boolean;
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  confirmationMessage?: string;
  width?: string;
}

function ConfirmDialog({
  deleting,
  handleDelete,
  showModal,
  setShowModal,
  confirmationMessage = "Are you sure you want to delete this item?",
  width,
}: ConfirmDialogProps) {
  return (
    <div
      className={`hideScrollBar flex  max-w-[504px] flex-col items-center justify-center gap-8 overflow-y-auto rounded-[40px] bg-white px-[44px] py-[49px] ${width}`}
      style={{
        boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
      }}
    >
      <h3 className="max-w-[280px] text-center">{confirmationMessage}</h3>
      <div className="flex w-full max-w-[300px] items-center justify-center gap-6">
        {deleting ? (
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            disabled
            loading
          >
            Deleting
          </Button>
        ) : (
          <>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleDelete}
            >
              YES
            </Button>
            <Button
              variant="light-green"
              size="sm"
              className="w-full"
              onClick={() => setShowModal(!showModal)}
            >
              No
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ConfirmDialog;
