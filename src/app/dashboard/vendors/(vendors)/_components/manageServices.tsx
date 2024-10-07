"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DeleteCircleIcon, EditCircleIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "@/lib/app/products/services";
import { getAllVendorProducts, Product } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { FilterBy } from "../orders/data-table";
import ConfirmDialog from "./confirmDialog";

function EditServiceCard({ pictures, name, _id }: Partial<Product>) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteProduct({ _id: _id ?? "" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VENDOR_PRODUCTS],
      });
      notify.success({ message: "product deleted successfully" });
      setShowModal(false);
    } catch (error) {
      notify.error({
        message: "Unable to delete product",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="relative isolate  flex aspect-square w-[clamp(60px,_8vw,_72px)] items-center justify-center rounded">
            <Image
              src={pictures ? pictures[0] : ""}
              alt={name ?? ""}
              fill
              className=" rounded object-cover"
            />
          </span>
          <h3 className="text-sm text-tertiary-pale-950">{name}</h3>
        </div>
        <div className="flex gap-2">
          <Button variant={"plain"} size={"plain"}>
            <Link
              href={`/dashboard/vendors/manage_services/edit_service/${_id}`}
            >
              <EditCircleIcon />
            </Link>
          </Button>
          <Button
            variant={"plain"}
            size={"plain"}
            onClick={() => setShowModal(!showModal)}
          >
            <DeleteCircleIcon />
          </Button>
        </div>
      </div>
      <Modal isOpen={showModal} closeModal={() => setShowModal(!showModal)}>
        <ConfirmDialog
          deleting={deleting}
          handleDelete={handleDelete}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}
function ManageServices() {
  const filterItems = ["Ascending", "Descending"];

  const [currentFilter, setCurrentFilter] = useState(filterItems[0]);
  const handleFilterChange = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const queryClient = useQueryClient();

  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [QUERY_KEYS.VENDOR_PRODUCTS],
      queryFn: async () => getAllVendorProducts(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  if (isFetching) {
    return <div>Fetching a vendor products...</div>;
  }
  if (isError) {
    return <div>Error fetching a vendor</div>;
  }

  const products = data?.products;

  return (
    <div>
      <div className="mb-8">
        <GoBack text="Manage Service" noMargin />
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm text-[#302F2C]">{"All Uploads"}</h2>
        <div className="flex w-fit justify-center">
          <FilterBy
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter}
            items={filterItems}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 ">
        {products && products?.length > 0 ? (
          <>
            {products.map((product) => (
              <EditServiceCard {...product} key={product.name} />
            ))}
          </>
        ) : (
          <div>No Uploads</div>
        )}
      </div>
    </div>
  );
}

export default ManageServices;
