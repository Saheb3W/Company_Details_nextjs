"use client";
import React, { useEffect, useState } from "react";
import {
  useGetAllCompanyDataQuery,
  useGetAllCompanyFilterDataQuery,
} from "./services/companyApi";
import Pagination from "../components/Pagination";

// function Pagination({ pages, currentPage, onPageChange }) {
//   return (
//     <ul className="flex space-x-2">
//       {pages.map((page, index) => (
//         <li key={index}>
//           <button
//             onClick={() => onPageChange(page.label)}
//             className={`px-3 py-2 ${
//               page.active ? "bg-gray-800 text-white" : "bg-gray-200"
//             } rounded-md focus:outline-none`}
//           >
//             {index}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [company_name, setCompany_Name] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  // console.log({ currentPage });
  const { data, error, isLoading } = useGetAllCompanyDataQuery(currentPage);
  const { data: filterData, error: filterError } =
    useGetAllCompanyFilterDataQuery({
      status: status || "",
      company_name: company_name || "",
    });
    console.log({ data });
    useEffect(() => {
      console.log("hello");
      let newItems;
      if (filterData?.companys?.data?.length > 0) {
        newItems = filterData?.companys?.data;
      } else if (data?.companys?.data?.length > 0) {
        newItems = data?.companys?.data;
      } else {
        newItems = [];
      }
      console.log("check data", newItems);
      // Update the state with the new items
      setCurrentItems(newItems);
    }, [filterData, data]);
    
    // Rest of the code remains the same...
    
    
  console.log("object", data?.companys?.data);
 
  // Handle loading and error states
  // console.log("filterData", filterData?.companys?.data);
  // console.log({ filterData });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Determine the current items to display
  //  var currentItems = filterData?.companys?.data?.length > 0
  //  ? filterData.companys.data
  //  : data?.companys?.data || [];

  console.log({ currentItems });
  // console.log("object", data?.companys?.data);

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate pagination
  const itemsPerPage = 5; // Adjust as needed
  const totalPages = Math.ceil(data?.total / itemsPerPage) || 3;

  return (
    <section className="w-full  flex-col">
      {/* Filter section (Add your filter elements here) */}
      <div className="flex flex-row-reverse p-5 gap-4 ml-5 mb-4">
        <div className="border-solid border-2 border-indigo-600 mt-5">
          <input
            onChange={(e) => setStatus(e.target.value)}
            type="text"
            placeholder="Enter Status"
          />
        </div>
        <div className="border-solid border-2 border-indigo-600 mt-5">
          <input
            onChange={(e) => setCompany_Name(e.target.value)}
            type="text"
            placeholder="Enter Company Name"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {currentItems?.length > 0 ? (
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Company Phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Address 1
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr
                        key={item.id}
                        className={
                          item.id % 2 === 0
                            ? "bg-gray-100"
                            : "bg-white border-b"
                        }
                      >
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.company_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.company_phone}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.address1 ? item.address1 : <span>---</span>}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.city ? item.city : <span>---</span>}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.company_status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  {" "}
                  <h3>Data Not Found!</h3>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className=" flex flex-row-reverse mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}

export default Home;
