import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CodeMapping, MappintToEditContent } from "./Types"

const initialState: MappintToEditContent = {
  mappingToEdit: null,
  foundMappings: [],
  informationFromRegistry: null,
}

const updateWithMapping = (
  state: MappintToEditContent,
  newMapping: CodeMapping | null,
) => {
  state.mappingToEdit = newMapping
  state.foundMappings = []
  state.informationFromRegistry = null
}

const mappingEditor: CaseReducer<
  MappintToEditContent,
  PayloadAction<CodeMapping>
> = (state, action) => {
  updateWithMapping(state, action.payload)
}

export const mappingEditSlice = createSlice({
  name: "mapping-edit-slice",
  initialState,
  reducers: {
    selectMappingToEdit: mappingEditor,
    clearMapping: (state) => {
      updateWithMapping(state, null)
    },
  },
  //   extraReducers: (builder) => {
  /*
        builder
            .addMatcher(unknownMappingsApi.endpoints.getCurrentUnknownMappings.matchFulfilled, (state, action) => {
                state.mappings = action.payload.mappings
                state.currentIds = action.payload.currentIds
                state.recentKnownIds = action.payload.recentKnownIds
            })
            .addMatcher(unknownMappingsApi.endpoints.getCurrentUnknownMappingIds.matchFulfilled, (state, action) => {
                state.recentKnownIds = action.payload
            })
            */
  //   },
})

export const { selectMappingToEdit, clearMapping } = mappingEditSlice.actions
export default mappingEditSlice.reducer
