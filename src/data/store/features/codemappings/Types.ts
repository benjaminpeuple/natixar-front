import _ from "lodash"

interface CodeMapping {
  id: string
  tool: string
  codeFromTool: string
  description: string
  goodsCode?: string
  precision?: string[]
  timestamp: number
}

const mappingIsFilledFn = (mapping: CodeMapping): boolean => {
  const goodsCodeIsFilled =
    mapping.goodsCode !== undefined && _.trim(mapping.goodsCode).length > 0
  const keywordsAreFilled =
    mapping.precision !== undefined && mapping.precision.length > 0

  return goodsCodeIsFilled && keywordsAreFilled
}

interface GoodsRegistryInfo {
  goodsCode: number
  additionalInformation: string
}

interface MappintToEditContent {
  mappingToEdit: CodeMapping | null
  foundMappings: CodeMapping[]
  informationFromRegistry: GoodsRegistryInfo | null
}

interface IncompleteCodeMappingStorage {
  mappings: CodeMapping[]
  currentIds: string[]
  recentKnownIds: string[]
  mostRecentTimestamp: number
}

export const mappingIsFilled = mappingIsFilledFn
export type { CodeMapping }
export type { GoodsRegistryInfo }
export type { MappintToEditContent }
export type { IncompleteCodeMappingStorage }
