import { SxProps } from "@mui/material"
import HeaderWithCategoriesLegend from "components/charts/HeaderWithCategoriesLegend"
import EmissionByCountry from "components/charts/emissions/EmissionByCountry"

import { useSelector } from "react-redux"
import MainCard from "components/MainCard"
import {
  selectAlignedIndexes as indexesSelector,
  selectCoordinatesByCountry as emissionsSelector,
} from "data/store/api/EmissionSelectors"

const ByCountrySection = ({ ...sxProps }: SxProps) => {
  const indexes = useSelector(indexesSelector)
  const groupedPoints = useSelector(emissionsSelector)

  return (
    <MainCard
      sx={{ ...sxProps }}
      contentSX={{ height: 500 }}
      title={
        <HeaderWithCategoriesLegend
          categories={Object.keys(groupedPoints)}
          titleText="Performance by Country"
        />
      }
    >
      <EmissionByCountry emissionData={groupedPoints} indexes={indexes} />
    </MainCard>
  )
}

export default ByCountrySection
