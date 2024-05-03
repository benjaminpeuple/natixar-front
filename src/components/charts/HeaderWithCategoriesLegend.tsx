import { memo } from "react"
import { Stack, SxProps, Typography } from "@mui/material"
import CategoriesLegend from "components/categories/CategoriesLegend"
import _ from "lodash"

interface CategoryHeaderProps {
  titleText: string
  categories: string[]
}

const HeaderWithCategoriesLegend = ({
  titleText,
  categories,
  ...sxProps
}: CategoryHeaderProps & SxProps) => {
  const simpleCategories = categories.filter(
    (category) => !_.isEqual(category.toLowerCase(), "cluster"),
  )

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        ...sxProps,
      }}
    >
      <Typography variant="h4">{titleText}</Typography>
      <CategoriesLegend categories={simpleCategories} />
    </Stack>
  )
}

export default memo(HeaderWithCategoriesLegend)
