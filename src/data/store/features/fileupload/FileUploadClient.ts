import { createApi } from "@reduxjs/toolkit/query/react"
import { backupBackendBaseQuery } from "data/store/config/BackendConfigs"

export const fileUploadApi = createApi({
  reducerPath: "fileUpload",
  baseQuery: backupBackendBaseQuery(),
  endpoints: (builder) => ({
    sendFiles: builder.mutation<string, File[]>({
      query: (payload) => {
        const formData = new FormData()
        payload.forEach((file) => formData.append("files", file))

        return {
          url: "/files",
          method: "POST",
          body: formData,
        }
      },
    }),
  }),
})

export const { useSendFilesMutation } = fileUploadApi
