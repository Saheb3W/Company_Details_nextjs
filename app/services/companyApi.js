"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({}),
  tagTypes: ["company"],
  endpoints: (builder) => ({
    getAllCompanyData: builder.query({
      query: (currentPage) =>
        `http://139.59.35.127/production/propsoft-api/public/api/get-all-companys?page=${currentPage}`,
      providesTags: ["company"],
    }),

    getAllCompanyFilterData: builder.query({
      query: ({status, company_name}) =>
        `http://139.59.35.127/production/propsoft-api/public/api/get-all-companys?company_status=${status}&company_name=${company_name}`,
      providesTags: ["company"],
    }),
  }),
});

export const { useGetAllCompanyDataQuery, useGetAllCompanyFilterDataQuery } =
companyApi;
