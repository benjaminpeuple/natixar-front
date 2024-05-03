import MainCard from "components/MainCard"
import HeaderWithCategoriesLegend from "components/charts/HeaderWithCategoriesLegend"
import EmissionByCompany from "components/charts/emissions/EmissionByCompany"

import { SxProps } from "@mui/material"

import { useSelector } from "react-redux"
import {
  selectAlignedIndexes as indexesSelector,
  selectVisibleEmissionsByCompany as emissionSelector,
} from "data/store/api/EmissionSelectors"

const ByCompanySection = ({ ...sxProps }: SxProps) => {
  const groupedPoints = useSelector(emissionSelector)
  const indexes = useSelector(indexesSelector)

  return (
    <MainCard
      sx={{ ...sxProps }}
      contentSX={{ height: 500 }}
      title={
        <HeaderWithCategoriesLegend
          titleText="Emissions by contributor"
          categories={Object.keys(groupedPoints)}
        />
      }
    >
      <EmissionByCompany emissionData={groupedPoints} indexes={indexes} />
    </MainCard>
  )
}

export default ByCompanySection
