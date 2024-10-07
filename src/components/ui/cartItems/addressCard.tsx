"use client";

import { useState } from "react";
import { DeleteIcon, DisabledIcon, EditIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";

import {
  deleteDeliveryLocation,
  IDeliveryLocation,
} from "@/lib/app/orders/services";
import cn from "@/lib/utils";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";
import ConfirmDialog from "@/app/dashboard/vendors/(vendors)/_components/confirmDialog";

import { Modal } from "../modal";
import EditDropOffDetails from "./editDropOffDetails";

function AddressCard({
  address,
  setSelectedDeleiveryAddressId,
  isActive,
}: {
  address: IDeliveryLocation;
  setSelectedDeleiveryAddressId: (id: string) => void;
  isActive: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteDeliveryLocation({ _id: address?._id ?? "" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DELIVERYLOCATION],
      });
      notify.success({ message: "Address deleted successfully" });
      setShowModal(false);
    } catch (error) {
      notify.error({
        message: "Unable to delete address",
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div
      key={address._id}
      className=" relative h-full !w-fit max-w-[360px] cursor-pointer"
    >
      <div
        className={cn(
          "hideScrollBar flex  w-full flex-col  justify-between gap-4  overflow-x-auto overflow-y-scroll rounded-lg border-2 bg-white p-5 px-4",
          isActive ? " border-[#34A853]" : " border-transparent",
        )}
        onClick={() =>
          setSelectedDeleiveryAddressId(address.addressCode as string)
        }
      >
        <div
          className={cn(
            "absolute right-2 top-2 text-green-600",
            isActive ? "block" : "hidden",
          )}
        >
          <DisabledIcon />
        </div>
        <div className="h-full w-full">
          <div className="flex flex-col gap-4">
            <Typography variant="body-3" fontWeight={"bold"}>
              {address.firstName} {address.lastName}
            </Typography>
            <div>
              <Typography>{address.address}</Typography>
              <Typography>+{address.phoneNumber}</Typography>
              {address?.addtitionalPhoneNumber && (
                <Typography>+{address.addtitionalPhoneNumber}</Typography>
              )}
              <Typography>{address.email}</Typography>
              <Typography>{address.note}</Typography>
            </div>
          </div>
        </div>
        <div className="flex w-full  justify-between ">
          <EditDropOffDetails id={address?._id} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <DeleteIcon className="cursor-pointer" />
          </button>
        </div>
      </div>
      <Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
        <ConfirmDialog
          deleting={deleting}
          handleDelete={handleDelete}
          showModal={showModal}
          setShowModal={setShowModal}
          confirmationMessage="Are you sure you want to remove this address?"
        />
      </Modal>
    </div>
  );
}

export default AddressCard;
