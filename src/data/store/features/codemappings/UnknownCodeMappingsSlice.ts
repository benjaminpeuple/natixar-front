import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"
import { IncompleteCodeMappingStorage } from "./Types"
import { unknownMappingsApi } from "./UnknownCodeMappingsClient"

const initialState: IncompleteCodeMappingStorage = {
  mappings: [],
  currentIds: [],
  recentKnownIds: [],
  mostRecentTimestamp: 0,
}

export const unknownCodesSlice = createSlice({
  name: "unknown-code-mappings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        unknownMappingsApi.endpoints.getCurrentUnknownMappings.matchFulfilled,
        (state, action) => {
          Object.assign(state, action.payload)
          state.mappings = _.sortBy(state.mappings, "timestamp").reverse()
        },
      )
      .addMatcher(
        unknownMappingsApi.endpoints.getCurrentUnknownMappingIds.matchFulfilled,
        (state, action) => {
          state.recentKnownIds = action.payload
        },
      )
  },
})

// export const {} = unknownCodesSlice.actions
export default unknownCodesSlice.reducer
