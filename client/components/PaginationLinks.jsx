import React, { useState } from "react";
import Pagination from "./Pagination";

// Dummy data for products


const PaginationLinks = ({currentPage, setCurrentPage, dummyData}) => {
  const productsPerPage = 8;

  // Calculate start and end indices
  const startProductIndex = (currentPage - 1) * productsPerPage + 1;
  const endProductIndex = Math.min(
    currentPage * productsPerPage,
    dummyData.pagination.totalProducts
  );

  // Get products for the current page
  const currentPageProducts = dummyData.products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      {/* Pagination info */}
      <nav className="space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 bg-muted/60 dark:bg-card ">
          {/* Showing{" "} */}
          <span className="font-semibold text-orange-600">
            {startProductIndex} - {endProductIndex}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-orange-600">
            {dummyData.pagination.totalProducts}
          </span>
        </span>

        {/* Pagination Component */}
        <Pagination
          totalPages={Math.ceil(dummyData.pagination.totalProducts / productsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </nav>

      {/* Display products for the current page */}
     
    </div>
  );
};

// Pagination component to handle page changes

export default PaginationLinks;
