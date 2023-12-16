"use client"
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          onClick={() => onPageChange(i)}
          className={`${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          } relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </a>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
        href="#"
        onClick={() => onPageChange(currentPage - 1)}
        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={currentPage === 1}
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      {renderPageNumbers()}
      <button
        href="#"
        onClick={() => onPageChange(currentPage + 1)}
        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
