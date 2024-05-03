import React, { useLayoutEffect, useRef, useState } from "react"
import { Chip, Input, Stack } from "@mui/material"
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid"

const SEPARATOR_KEY = "Enter"

const KeywordInput = (props: GridRenderEditCellParams) => {
  const { id, field, value, hasFocus } = props
  const [keywords, setKeywords] = useState<string[]>(
    (value as string[]) ? (value as string[]) : [],
  )
  const [inputValue, setInputValue] = useState("")
  const apiRef = useGridApiContext()
  const inputRef = useRef<HTMLElement>()

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === SEPARATOR_KEY) {
      event.preventDefault()
      event.stopPropagation()
      const text = inputValue ? inputValue.trim() : ""
      if (text.length > 0) {
        const newKeywords = [...keywords, text]
        setKeywords(newKeywords)
        setInputValue("")
        apiRef.current.setEditCellValue({ id, field, value: newKeywords })
      }
    }
  }

  useLayoutEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [hasFocus])

  const handleDelete = (index: number) => {
    const updatedKeywords = [...keywords]
    updatedKeywords.splice(index, 1)
    setKeywords(updatedKeywords)
  }

  return (
    <Stack
      direction="row"
      gap={1}
      flexWrap="wrap"
      sx={{
        width: "100%",
        p: 1,
        m: 0,
      }}
    >
      <Input
        value={inputValue}
        placeholder="Keywords"
        ref={inputRef}
        autoFocus
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {keywords.map((keyword, index) => (
        <Chip
          color="success"
          key={index}
          label={keyword}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Stack>
  )
}

export default KeywordInput
