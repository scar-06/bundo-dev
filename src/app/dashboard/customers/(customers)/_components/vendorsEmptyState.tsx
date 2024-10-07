import { DetailViewIcon } from "@/assets";

function VendorsEmptyState({
  descriptionOne,
  descriptionTwo,
  icon,
  iconText,
  icon2,
}: {
  descriptionOne?: string;
  descriptionTwo?: string;
  icon?: React.ReactNode;
  iconText?: string;
  icon2?: React.ReactNode;
}) {
  return (
    <div className="flex  w-[100%] flex-col items-center justify-center">
      {icon2 ? (
        <div>
          {icon2} <span>{iconText}</span>
        </div>
      ) : (
        <div className=" mb-1 rounded-full bg-[#FAF8F3] p-6">
          {icon || <DetailViewIcon />}
        </div>
      )}

      <div className="flex flex-col items-center">
        <span className="mt-4 text-center text-xs font-normal sm:text-sm">
          {descriptionOne}
        </span>
        <span className="text-center text-xs font-normal sm:text-sm ">
          {descriptionTwo}
        </span>
      </div>
    </div>
  );
}

export default VendorsEmptyState;
