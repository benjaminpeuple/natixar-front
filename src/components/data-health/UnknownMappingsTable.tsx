import { memo, useCallback, useState } from "react"
import { Link, SxProps } from "@mui/material"
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColTypeDef,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridPreProcessEditCellProps,
  GridValidRowModel,
} from "@mui/x-data-grid"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"
import KeywordInput from "components/inputs/KeywordInput"
import KeywordsWidget from "components/inputs/KeywordsWidget"
import "./mappingRowStyles.css"

import { CodeMapping } from "data/store/features/codemappings/Types"
import KeywordsCellEditor from "./KeywordsCellEditor"
import NeshCodeCellEditor from "./NeshCodeCellEditor"

/**
It's 6 for NESH
and 8 for NC8 
*/
const GOODS_CODE_LIMITATION = 6
const CODE_DETAIL_URL_PREFIX = import.meta.env.VITE_GOODS_DETAIL_PAGE
const PAGINATION_OPTIONS = [20, 50, 100]

const HEADER_CSS_CLASS = "common-super-class-name"
const AWESOME_COLUMN: GridColTypeDef = {
  headerClassName: HEADER_CSS_CLASS,
}

const VIEWABLE_COLUMN: GridColTypeDef = {
  ...AWESOME_COLUMN,
  editable: false,
}
const EDITABLE_COLUMN: GridColTypeDef = {
  ...AWESOME_COLUMN,
  editable: true,
  filterable: false,
}

const columns: GridColDef[] = [
  { field: "tool", headerName: "Tool", minWidth: 100, ...VIEWABLE_COLUMN },
  {
    field: "codeFromTool",
    headerName: "Code",
    minWidth: 120,
    ...VIEWABLE_COLUMN,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 0.5,
    ...VIEWABLE_COLUMN,
  },
  {
    field: "goodsCode",
    headerName: "NESH Code",
    type: "number",
    minWidth: 170,
    ...EDITABLE_COLUMN,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value
      }
      return params.value.toString().padStart(GOODS_CODE_LIMITATION, "0")
    },
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const newValue = params.props.value
      if (!params.hasChanged || !newValue) {
        return { ...params.props }
      }
      const hasError = Number.isNaN(parseInt(newValue, 10))
      return { ...params.props, error: hasError }
    },
    renderCell: (params) =>
      params.value ? (
        <Link
          underline="always"
          target="_blank"
          rel="noopener noreferrer"
          href={`${CODE_DETAIL_URL_PREFIX}${params.value}`}
        >
          {params.formattedValue}
        </Link>
      ) : null,
    renderEditCell: (params) => <NeshCodeCellEditor {...params} />,
  },
  {
    field: "precision",
    headerName: "Precision",
    flex: 0.5,
    ...EDITABLE_COLUMN,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const newValue = params.props.value
      if (!params.hasChanged || !newValue) {
        return { ...params.props }
      }
      const keywords = newValue as string[]
      const hasError = keywords.length <= 0
      return { ...params.props, error: hasError || undefined }
    },
    renderCell: (params) => <KeywordsWidget {...params} />,
    renderEditCell: (params: GridRenderEditCellParams) => {
      const keywordsAmount = params.value?.length
      const buttonText = keywordsAmount
        ? `Edit ${keywordsAmount} keywords`
        : "Insert any keyword"

      return (
        <KeywordsCellEditor buttonText={buttonText}>
          <KeywordInput {...params} />
        </KeywordsCellEditor>
      )
    },
  },
]

interface UnknownMappingsTableProps {
  rows: CodeMapping[]
  setRows: (newRows: CodeMapping[]) => void
  mostRecentTimestamp: number
  onRowUpdated: (newRow: CodeMapping) => void
}

const UnknownMappingsTable = ({
  rows,
  setRows,
  mostRecentTimestamp,
  onRowUpdated,
  ...sxProps
}: UnknownMappingsTableProps & SxProps) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const handleRowModesModelChange = useCallback(
    (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel)
    },
    [setRowModesModel],
  )

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    },
    [setRowModesModel],
  )

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    },
    [setRowModesModel],
  )

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    },
    [setRowModesModel],
  )

  const processRowUpdate = useCallback(
    (newRow: GridRowModel) => {
      const updatedRow = { ...newRow } as CodeMapping
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
      try {
        onRowUpdated(updatedRow)
      } catch (e) {
        // Nothing
      }
      return updatedRow
    },
    [setRows, onRowUpdated],
  )

  const getRowClass = useCallback(
    (params: GridValidRowModel) => {
      const { row } = params
      const rowIsFilled =
        row.goodsCode && row.precision && row.precision!!.length > 0
      const rowIsRecent = row.timestamp === mostRecentTimestamp
      let rowClass = ""
      if (rowIsFilled) {
        rowClass = "filledRow"
      } else if (rowIsRecent) {
        rowClass = "recentRow"
      }
      return rowClass
    },
    [mostRecentTimestamp],
  )

  const createActionsColumn = () => ({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    cellClassName: "actions",
    ...AWESOME_COLUMN,
    hideable: false,
    minWidth: 100,
    getActions: (params: GridRowParams) => {
      // const currentRow = params.row
      const { id } = params
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<CheckIcon />}
            label="Save"
            className="textPrimary"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CloseIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ]
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)} // , currentRow
          color="inherit"
        />,
      ]
    },
  })

  const columnDefinitions = [...columns, createActionsColumn()]

  return (
    <DataGrid
      sx={{
        "& .MuiDataGrid-cell": {
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeader": {
          outline: "none !important",
        },
        "& .Mui-error": {
          backgroundColor: `blue`,
          color: "#ff4343",
        },
        [`& .${HEADER_CSS_CLASS}`]: {
          backgroundColor: "#F0F0F0",
        },
        ...sxProps,
      }}
      editMode="row"
      columns={columnDefinitions}
      getRowClassName={getRowClass}
      rows={rows}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      processRowUpdate={processRowUpdate}
      rowSelection={false}
      disableColumnSelector
      initialState={{
        pagination: { paginationModel: { pageSize: PAGINATION_OPTIONS[0] } },
      }}
      pageSizeOptions={PAGINATION_OPTIONS}
    />
  )
}

export default memo(UnknownMappingsTable)
