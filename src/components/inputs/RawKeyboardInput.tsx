import { Chip, Input, Stack, SxProps } from "@mui/material"
import { useRef, useState } from "react"

type KeywordsObserver = (newKeywords: string[]) => void
interface RawKeywordInputProps {
  value?: string[]
  onKeywordsUpdate?: KeywordsObserver
}

const RawKeywordInput = (props: RawKeywordInputProps & SxProps) => {
  const {
    value: initialValue,
    onKeywordsUpdate: keywordsObserver,
    ...sxProps
  } = props
  const [keywords, setKeywords] = useState<string[]>(initialValue || [])
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLElement>()

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ",") {
      const text = inputValue ? inputValue.trim() : ""
      if (text.length > 0) {
        const newKeywords = [...keywords, text]
        setKeywords(newKeywords)
        setInputValue("")
        if (keywordsObserver) {
          keywordsObserver(newKeywords)
        }
      }
      event.preventDefault()
    }
  }

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
        ...sxProps,
      }}
    >
      <Input
        value={inputValue}
        placeholder="Keywords"
        ref={inputRef}
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

export default RawKeywordInput
