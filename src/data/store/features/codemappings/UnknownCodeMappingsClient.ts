import { createApi } from "@reduxjs/toolkit/query/react"
import { backupBackendBaseQuery } from "data/store/config/BackendConfigs"
import { CodeMapping, IncompleteCodeMappingStorage } from "./Types"

interface AllMappingResponse {
  ids: string[]
  mappings: CodeMapping[]
  mostRecentTimestamp: number
}

const TAG_TYPE_MAPPING = "UnknownMappings"
const TAG_TYPE_MAPPING_ID = "UnknownMappingIds"

export const unknownMappingsApi = createApi({
  reducerPath: "unknownMappingsApi",
  baseQuery: backupBackendBaseQuery(),
  tagTypes: [TAG_TYPE_MAPPING, TAG_TYPE_MAPPING_ID],
  endpoints: (builder) => ({
    getCurrentUnknownMappings: builder.query<
      IncompleteCodeMappingStorage,
      void
    >({
      query: () => ({
        url: `/unknownMappings`,
        method: "GET",
      }),
      transformResponse(
        responseMappings: AllMappingResponse,
      ): IncompleteCodeMappingStorage {
        return {
          mappings: responseMappings.mappings,
          currentIds: responseMappings.ids,
          recentKnownIds: responseMappings.ids,
          mostRecentTimestamp: responseMappings.mostRecentTimestamp,
        }
      },
      providesTags: () => [
        { type: TAG_TYPE_MAPPING, id: "LIST" },
        { type: TAG_TYPE_MAPPING_ID, id: "LIST" },
      ],
    }),
    getCurrentUnknownMappingIds: builder.query<string[], void>({
      query: () => ({
        url: `/unknownMappingIds`,
        method: "GET",
      }),
      providesTags: () => [{ type: TAG_TYPE_MAPPING_ID, id: "LIST" }],
    }),
    saveFilledMappings: builder.mutation({
      query: (payload) => ({
        url: "/mappings",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: [
        { type: TAG_TYPE_MAPPING, id: "LIST" },
        { type: TAG_TYPE_MAPPING_ID, id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetCurrentUnknownMappingsQuery,
  useLazyGetCurrentUnknownMappingsQuery,
  useGetCurrentUnknownMappingIdsQuery,
  useLazyGetCurrentUnknownMappingIdsQuery,
  useSaveFilledMappingsMutation,
} = unknownMappingsApi
