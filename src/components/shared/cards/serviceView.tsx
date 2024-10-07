import Image from "next/image";
import Link from "next/link";
import { EditCircleIcon } from "@/assets";
import { formatDistance } from "date-fns";

import { Product } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";

import ContactsButton from "./contactsButton";

function ServiceView({
  product,
  variant,
}: {
  product: Product;
  variant: "vendor" | "customer";
}) {
  const { createdAt } = product;
  const newDate = createdAt ? new Date(createdAt) : new Date();
  const now = new Date();
  const formattedDate = formatDistance(newDate, now, { addSuffix: true });
  return (
    <div className="relative isolate  flex h-fit w-full max-w-[411px] flex-col overflow-hidden rounded-md bg-[#FAF8F3] shadow-sm">
      <span className=" flex w-fit items-center  rounded-[10px] rounded-tl-none bg-tertiary-deep-green-950 p-[6px_7px] text-xl font-semibold text-white shadow-md">
        <span className="mr-1 "> ₦ </span> {product.startingPriceRange} -{" "}
        {product.endingPriceRange}
      </span>
      <div className="flex max-w-[411px] flex-col gap-7 p-[1.2rem_1rem]">
        <div className="flex w-full justify-between">
          <h3 className=" text-xl font-semibold">{product.name}</h3>
        </div>
        <div className="flex w-full flex-col  gap-4">
          <div className="flex gap-2">
            {product.categories?.slice(0, 2)?.map((tag) => (
              <span
                className="whitespace-nowrap rounded-full bg-tertiary-pale-100  px-[12px] py-[6px]   text-[10px] font-semibold xsm:text-xs"
                key={Math.random() * 21}
              >
                {tag}
              </span>
            ))}
            {(product.categories?.length as number) - 2 > 0 && (
              <span
                className=" whitespace-nowrap rounded-full bg-tertiary-pale-100 px-[12px] py-[6px] text-[10px] font-semibold xsm:text-xs "
                key={Math.random() * 21}
              >
                +{(product.categories?.length as number) - 2}
              </span>
            )}
          </div>
          <div className="flex h-fit w-full flex-col gap-12 text-sm leading-7 text-tertiary-pale-950">
            <p>{product.description}</p>
          </div>
        </div>
        <div className=" inline-flex h-[115px] w-full gap-4 overflow-x-auto">
          {product.pictures.map((picture) => (
            <div className="relative h-[112px] w-[132px] " key={picture}>
              <Image
                src={picture ?? ""}
                alt="brand logo"
                fill
                className="  object-cover"
              />
            </div>
          ))}
        </div>
        <div className=" mt-36 flex items-center text-sm">
          <ContactsButton {...product.contact_means} />
        </div>
      </div>
      {variant === "vendor" && (
        <div className=" flex w-full items-center justify-between p-[1.2rem_1rem]">
          <Button
            title="Edit Service"
            variant={"plain"}
            size={"plain"}
            className=""
          >
            <Link
              href={`/dashboard/vendors/manage_services/edit_service/${product._id}`}
              className="flex  items-center gap-2"
            >
              <EditCircleIcon /> <b>{formattedDate}</b>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ServiceView;
