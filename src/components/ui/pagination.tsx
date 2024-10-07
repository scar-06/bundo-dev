import { AngleLeft } from "@/assets";
import ReactPaginate from "react-paginate";

function PaginationButtons({
  setCurrentPage,
  currentPage,
  totalPages,
}: {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 1;
  return (
    <ReactPaginate
      breakLabel={<span className="mr-4">...</span>}
      previousLabel={
        showPrevButton ? (
          <span className="mr-4 flex h-10 w-10  rotate-180 items-center justify-center rounded-md border border-[#606F5C] text-[#606F5C] hover:border-green-500 hover:bg-primary-500 hover:text-white">
            <AngleLeft />
          </span>
        ) : null
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      nextLabel={
        showNextButton ? (
          <span className="mr-4 flex h-10 w-10  items-center justify-center rounded-md border border-[#606F5C] text-[#606F5C] hover:border-green-500 hover:bg-primary-500 hover:text-white">
            <AngleLeft />
          </span>
        ) : null
      }
      containerClassName="flex items-center justify-center mt-8 mb-4  mx-auto"
      pageClassName="block border border-solid border-[#606F5C] text-[#606F5C] hover:bg-primary-500 hover:text-white w-10 h-10 flex items-center justify-center rounded-md mr-4"
      activeClassName="bg-primary-500 text-white hover:bg-primary-500 hover:text-white border-green-500"
    />
  );
}

export default PaginationButtons;
