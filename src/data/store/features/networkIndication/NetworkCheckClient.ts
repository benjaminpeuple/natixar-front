import { createApi } from "@reduxjs/toolkit/query/react"
import { backendBaseQuery } from "data/store/config/BackendConfigs"

export const networkCheckApi = createApi({
  reducerPath: "networkCheckApi",
  baseQuery: backendBaseQuery(),
  endpoints: (builder) => ({
    getNetworkInformation: builder.query<string, void>({
      query: () => ({
        url: import.meta.env.VITE_NATIXAR_HEALTH_URL,
        method: "GET",
        responseHandler: "text",
      }),
    }),
  }),
})

export const { useGetNetworkInformationQuery } = networkCheckApi
