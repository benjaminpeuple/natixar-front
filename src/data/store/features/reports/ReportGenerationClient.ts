import { createApi } from "@reduxjs/toolkit/query/react"
import { EmissionFilterState } from "data/domain/types/emissions/EmissionTypes"
import { backupBackendBaseQuery } from "data/store/config/BackendConfigs"

export const reportGenerationApi = createApi({
  reducerPath: "reportGenerator",
  baseQuery: backupBackendBaseQuery(),
  endpoints: (builder) => ({
    generateReport: builder.mutation<string, EmissionFilterState>({
      query: (payload) => ({
        url: "/reports",
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
})

export const { useGenerateReportMutation } = reportGenerationApi
