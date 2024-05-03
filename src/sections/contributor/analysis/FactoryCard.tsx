import { useState } from "react"

// material-ui
import {
  Box,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  SxProps,
  Grid,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

// project import
import MainCard from "components/MainCard"
import FactoryImage from "assets/images/contributor/analysis/factory.png"

// types
import { ThemeMode } from "types/config"
import { BusinessEntity } from "data/domain/types/participants/ContributorsTypes"
import { formatEmissionAmount } from "data/domain/transformers/EmissionTransformers"
import { AlignedIndexes } from "data/domain/types/emissions/EmissionTypes"

interface FactoryCardProps {
  company?: BusinessEntity
  totalEmissions: number
  indexes: AlignedIndexes
  categories: number[]
  onCategoryClick?: (categoryId: number) => void
}

export const FactoryCard = ({
  company,
  totalEmissions,
  indexes,
  categories,
  onCategoryClick,
  ...sxProps
}: FactoryCardProps & SxProps) => {
  const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleListItemClick = (categoryId: number) => {
    const newId = selectedIndex === categoryId ? 0 : categoryId
    setSelectedIndex(newId)
    if (onCategoryClick) {
      onCategoryClick(newId)
    }
  }

  const categoryListItems = categories.map((categoryId) => {
    const category = indexes.categories[categoryId]
    return (
      <ListItemButton
        key={categoryId}
        selected={selectedIndex === categoryId}
        onClick={() => handleListItemClick(categoryId)}
      >
        <ListItemText primary={category.name} />
      </ListItemButton>
    )
  })

  return (
    <MainCard sx={{ ...sxProps }}>
      <Stack spacing={6}>
        <Box sx={{ width: "100%" }}>
          <img
            src={company?.image ?? FactoryImage}
            alt="Factory"
            style={{ objectFit: "cover", width: "100%", height: 160 }}
          />
          <Typography
            sx={{ marginTop: "20px", fontWeight: 400, maxLines: 2 }}
            variant="h3"
          >
            {company?.name ?? ""}
          </Typography>
        </Box>
        <Grid container spacing={1.5}>
          <Grid item xs={3}>
            <Typography color="secondary" align="right">
              Address
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ maxLines: 2 }} noWrap={false}>
              {company?.details?.address ?? "Unknown"}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="secondary" align="right">
              Registration
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>
              {company?.details?.registration ?? "Unknown"}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            border: "1px solid",
            borderRadius: 1,
            borderColor:
              theme.palette.mode === ThemeMode.DARK
                ? theme.palette.divider
                : theme.palette.grey.A800,
            textAlign: "center",
          }}
        >
          <Typography sx={{ padding: 0.5 }} color="secondary">
            Total Emissions
          </Typography>
          <Typography sx={{ padding: 0.5, fontWeight: 800 }} variant="h5">
            {formatEmissionAmount(totalEmissions)}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: 500, marginBottom: "20px" }}
            variant="h5"
          >
            Category emissions
          </Typography>
          <List
            component="nav"
            sx={{
              p: 0,
              "& .MuiListItemIcon-root": {
                minWidth: 32,
                color: theme.palette.grey[500],
              },
            }}
          >
            {categoryListItems}
          </List>
        </Box>
      </Stack>
    </MainCard>
  )
}
