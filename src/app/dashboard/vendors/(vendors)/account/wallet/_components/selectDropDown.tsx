import { DropDownIcon } from "@/assets";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface IBankAccount {
  bankName: string;
  accountNo: string;
}

// interface FilterByProps {
//   onFilterChange?: (filter: IBankAccount) => void;
//   items?: any[];
//   variant?:
//     | "default"
//     | "destructive"
//     | "outline"
//     | "deep-green"
//     | "light-green"
//     | "white"
//     | "plain";
//   currentFilter?: string;
//   title?: string;
// }

interface FilterByProps {
  onFilterChange: (filterValue: { label: string; value: string }) => void;
  currentFilter: { label: string; value: string };
  items?: { label: string; value: string }[];
  filterBy?: boolean;
  identify?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "deep-green"
    | "light-green"
    | "white"
    | "plain"
    | null
    | undefined;
}
const initItems = [
  { label: "This Month", value: "monthly" },
  { label: "This Week", value: "weekly" },
  { label: "This Year", value: "yearly" },
];

// export default function SelectDropDown({
//   onFilterChange,
//   items = [],
//   variant,
//   currentFilter,
//   title,
// }: FilterByProps) {
//   const isActive = (filterValue: string) => currentFilter === filterValue;

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant={variant || "white"}
//           className="flex items-center justify-center p-3"
//         >
//           <span className="sr-only">Open menu</span>
//           <div className="flex items-center gap-3">
//             <span className="px-2 text-sm font-semibold">
//               {currentFilter || items?.[0]}
//             </span>
//             {/* <span className="font-semibold">{title || " This month"}</span> */}
//             <DropDownIcon />
//           </div>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className=" flex w-full flex-col gap-4 ">
//         <span className="px-2 text-sm font-semibold">
//           {currentFilter || items?.[0]?.bankName}
//         </span>
//         {items.map((filter) => (
//           <DropdownMenuItem
//             key={filter.bankName}
//             onClick={() => onFilterChange && onFilterChange(filter)}
//             className={cn(
//               "mx-0 cursor-pointer bg-transparent transition-all duration-300 ease-in-out hover:bg-primary-50",
//               isActive(filter.bankName)
//                 ? "bg-primary-50 shadow-sm"
//                 : "hover:bg-primary-50",
//             )}
//           >
//             <div className="flex gap-1 px-0">
//               {/* <input type="radio" className="px-0" /> */}
//               <span className="px-0">{filter}</span>
//             </div>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

export default function SelectDropDown({
  onFilterChange,
  currentFilter,
  items = initItems,
  filterBy = true,
  identify,
  variant,
}: FilterByProps) {
  const isActive = (filterValue: string) =>
    currentFilter?.label === filterValue;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant || "plain"}
          className={`flex items-center justify-center ${
            filterBy && "px-6 py-2"
          }  py-1 outline-0`}
        >
          <span className="sr-only">Open menu</span>

          <div className="flex items-center gap-3 py-2">
            <span className="text-[10px] text-[#0A2211]">
              {currentFilter?.label || items?.[0]?.label}
            </span>
            <DropDownIcon />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2">
        {items.map(({ label, value }) => (
          <DropdownMenuItem
            key={label}
            onClick={() => onFilterChange({ label, value })}
            className={cn(
              "cursor-pointer bg-transparent px-4 transition-all duration-300 ease-in-out hover:bg-primary-50",
              isActive(label === "All" || label === identify ? "" : label)
                ? "bg-primary-50 shadow-sm"
                : "hover:bg-primary-50",
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
