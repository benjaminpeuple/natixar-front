import { RootState } from "data/store"

export const allMappingsSelector = (state: RootState) =>
  state.unknownCodeMappings
export const mappingToEditSelector = (state: RootState) =>
  state.mappingToEdit.mappingToEdit
