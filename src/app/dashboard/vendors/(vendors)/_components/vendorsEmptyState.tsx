import { DetailViewIcon } from "@/assets";

function VendorsEmptyState({ message }: { message?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <span className=" mb-1 rounded-full bg-[#FAF8F3] p-4">
        <DetailViewIcon />
      </span>
      <span>{message || "Click on a product item to see more details"}</span>
    </div>
  );
}

export default VendorsEmptyState;
