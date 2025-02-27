import { useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {

  // Handle page click
//   const handlePageClick = (page) => {
//     if (page === "Previous" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else if (page === "Next" && currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     } else if (typeof page === "number") {
//       setCurrentPage(page);
//     }
//   };

console.log({currentPage, })


const handlePageClick = (page) => {
    if (page === "Previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === "Next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === "number" && page >= 1 && page <= totalPages) { 
      // Ensure page number is within valid range
      setCurrentPage(page); 
    } 
  };

  // Generate pagination items dynamically
  const generatePaginationItems = () => {
    const paginationItems = [];

    // "Previous" button
    paginationItems.push(
      <li key="prev">
        <button
          onClick={() => handlePageClick("Previous")}
          className="flex items-center justify-center text-orange-600 text-sm py-2 px-3 leading-tight border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card      rounded-l-lg"
          disabled={currentPage === 1}
        >
         <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
        </button>
      </li>
    );

    // Pages before the current page
    const pagesBefore = Array.from({ length: 3 }, (_, index) => currentPage - 3 + index).filter(
      (page) => page > 0 && page < currentPage
    );

    pagesBefore.forEach((page) => {
      paginationItems.push(
        <li key={page}>
          <button
            onClick={() => handlePageClick(page)}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card      ${page === currentPage ? 'bg-sky-100 text-orange-600' : ''}`}
          >
            {page}
          </button>
        </li>
      );
    });

    // Current page
    paginationItems.push(
      <li key="current">
        <button
          className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-orange-600 bg-sky-100 text-orange-600 bg-muted/60 dark:bg-card "
          disabled
        >
          {currentPage}
        </button>
      </li>
    );

    // Pages after the current page
    const pagesAfter = Array.from({ length: 2 }, (_, index) => currentPage + 1 + index).filter(
      (page) => page <= totalPages && page > currentPage
    );

    pagesAfter.forEach((page) => {
      paginationItems.push(
        <li key={page}>
          <button
            onClick={() => handlePageClick(page)}
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card      ${page === currentPage ? 'bg-sky-100 text-orange-600' : ''}`}
          >
            {page}
          </button>
        </li>
      );
    });

    // Add truncation if necessary
    if (currentPage + 2 < totalPages) {
      paginationItems.push(
        <li key="more">
          <button
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-orange-600 bg-white border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card     "
            disabled
          >
            ...
          </button>
        </li>
      );
    }

    // Last page
    if (currentPage !== totalPages) {
      paginationItems.push(
        <li key={totalPages}>
          <button
            onClick={() => handlePageClick(totalPages)}
            className={`flex items-center justify-center  text-sm py-2 px-3 leading-tight border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card      ${currentPage === totalPages ? 'bg-sky-100 text-orange-600' : ''}`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    // "Next" button
    paginationItems.push(
      <li key="next">
        <button
          onClick={() => handlePageClick("Next")}
          className="flex items-center justify-center text-orange-600 text-sm py-2 px-3 leading-tight border border-orange-600  hover:text-gray-700 bg-muted/60 dark:bg-card      rounded-r-lg"
          disabled={currentPage === totalPages}
        >
          <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
        </button>
      </li>
    );

    // const uniqueArray = [...new Set(paginationItems)];
    const uniqueArray = paginationItems.filter(
        (item, index, self) => index === self.findIndex((t) => t.key === item.key)
      );

// console.log({uniqueArray})
    return uniqueArray

  };

  return (
    <div className="mt-4">
      <ul className="inline-flex items-center -space-x-px">
        {generatePaginationItems()}
      </ul>
    </div>
  );
};

export default Pagination;