"use client";

import { useState } from "react";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { DropDownIcon, FilterIcon, SearchIcon } from "@/assets";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoaderIcon } from "lucide-react";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import PaginationButtons from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageLoader from "@/components/loaders/pageLoader";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import Loading from "@/app/loading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy?: boolean;
  items?: string[];
  identify?: string;
  isPagination?: boolean;
  showSearchFilter?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  icon?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  isLoading?: boolean;
  setCurrentPage?: (v: any) => void;
  hideFilter?: boolean;
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
interface FilterByProps {
  onFilterChange: (filterValue: string) => void;
  currentFilter: string;
  items?: string[];
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
const initItems = ["All", "Blocked", "In Transit", "Delivered"];
export function FilterBy({
  onFilterChange,
  currentFilter,
  items = initItems,
  filterBy = true,
  identify,
  variant,
}: FilterByProps) {
  const isActive = (filterValue: string) => currentFilter === filterValue;

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
          {filterBy ? (
            <div className="flex  items-center">
              {" "}
              <FilterIcon className="h-6 w-6" />{" "}
              <span className="font-light">Filter By</span>
            </div>
          ) : (
            <div className=" mx-0 flex items-center gap-2 rounded-lg border-[2px] border-[#0000000D] px-6 py-3">
              {" "}
              <span className="text-[10px] text-[#0A2211]">
                {currentFilter || items?.[0]}
              </span>
              <DropDownIcon />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2">
        {items.map((filter) => (
          <DropdownMenuItem
            key={filter}
            onClick={() => onFilterChange(filter === "All" ? "" : filter)}
            className={cn(
              "cursor-pointer bg-transparent px-4 transition-all duration-300 ease-in-out hover:bg-primary-50",
              isActive(filter === "All" || filter === identify ? "" : filter)
                ? "bg-primary-50 shadow-sm"
                : "hover:bg-primary-50",
            )}
          >
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function DataTable<TData, TValue>({
  columns,
  data,
  filterBy,
  items,
  identify,
  isPagination = true,
  variant,
  onChange,
  showSearchFilter = true,
  description,
  icon,
  currentPage,
  totalPages,
  isLoading,
  setCurrentPage,
  hideFilter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const handleFilterChange = (newFilter: string) => {
    setCurrentFilter(newFilter);
    setColumnFilters([{ id: "status", value: newFilter }]);
  };

  return (
    <div className="rounded-md border shadow-lg">
      {showSearchFilter && (
        <div className="flex h-fit w-full items-center justify-between  px-4 py-4 lg:px-6 ">
          <div
            tabIndex={0}
            className="group my-2 flex h-[53px] w-full max-w-sm items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)]  px-[10px] lg:w-full xlg:w-full"
          >
            <label htmlFor="filter" className="">
              <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
            </label>
            <Input
              placeholder="Search all columns..."
              name={"filter"}
              id="filter"
              value={globalFilter ?? ""}
              onChange={(e) =>
                onChange!(e)! || setGlobalFilter(String(e.target.value))
              }
              className="h-full border-none bg-transparent text-sm font-normal outline-none"
            />
          </div>
          {!hideFilter && (
            <div>
              <FilterBy
                onFilterChange={handleFilterChange}
                currentFilter={currentFilter}
                filterBy={filterBy}
                items={items}
                identify={identify}
                variant={variant}
              />
            </div>
          )}
        </div>
      )}
      <div className=" !font-tv2SansDisplay">
        {isLoading ? (
          Array(10)
            .fill(0)
            .map((_) => (
              <div key={Math.random()}>
                {/* <PageLoader /> */}

                <SkeletonLoader
                  className={cn(
                    " bg-[#fff] px-4 py-8 text-left align-middle text-sm font-normal text-[#fff] shadow-xl ",
                  )}
                />
              </div>
            ))
        ) : (
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {description ? (
                        <div className="my-8 flex w-full flex-col items-center gap-5">
                          <div className="flex w-full justify-center">
                            {icon}
                          </div>
                          <span className="text-sm">{description}</span>
                        </div>
                      ) : (
                        "No results."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div>
              {!!table.getRowModel().rows?.length && isPagination && (
                <div className="flex  space-x-2 px-6 py-8 ">
                  <PaginationButtons
                    currentPage={currentPage ?? 1}
                    totalPages={totalPages ?? 2}
                    setCurrentPage={setCurrentPage!}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
