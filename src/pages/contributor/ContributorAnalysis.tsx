// material-ui
import { Box, Card, Grid, Stack, SxProps, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { FactoryCard } from "sections/contributor/analysis/FactoryCard"
import MainCard from "components/MainCard"
import { useTheme } from "@mui/material/styles"
import ClusteredMap from "components/leaflet-maps/cluster-map"
import {
  selectAlignedIndexes,
  selectAllPoints,
  selectTimeWindow,
} from "data/store/api/EmissionSelectors"
import { useSelector } from "react-redux"
import { detectCompany } from "data/domain/transformers/DataDetectors"
import { distinct, filter, map, sum, summarize, tidy } from "@tidyjs/tidy"
import { memo, useMemo, useState } from "react"
import { expandId } from "data/domain/transformers/StructuralTransformers"
import {
  EmissionCategory,
  EmissionDataPoint,
} from "data/domain/types/emissions/EmissionTypes"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import {
  emissionsGroupByTime,
  formatEmissionAmount,
} from "data/domain/transformers/EmissionTransformers"
import { TimeWindow } from "data/domain/types/time/TimeRelatedTypes"
import { timestampToYear } from "data/domain/transformers/TimeTransformers"

// ==============================|| WIDGET - CHARTS ||============================== //

const byYearChartOptions: ApexOptions = {
  yaxis: {
    title: {
      text: "Emissions",
    },
    labels: {
      formatter(val) {
        return formatEmissionAmount(val)
      },
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "25%",
      barHeight: "70%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
}

interface ByCategoryProps {
  category?: EmissionCategory
  dataPoints: EmissionDataPoint[]
  timeWindow: TimeWindow
}

const EmissionsByScope = memo(
  ({
    category,
    dataPoints,
    timeWindow,
    ...sxProps
  }: ByCategoryProps & SxProps) => {
    const theme = useTheme()

    const groupedByTime = Object.values(
      emissionsGroupByTime(dataPoints, timeWindow, timestampToYear),
    )[0] // We have only one category anyway

    const labels =
      typeof groupedByTime === "undefined" ? [] : Object.keys(groupedByTime)
    const series =
      typeof groupedByTime === "undefined"
        ? []
        : [
            {
              name: category?.name ?? "Total",
              type: "bar",
              data: Object.values(groupedByTime),
            },
          ]

    return (
      <Stack spacing={3} sx={{ ...sxProps }}>
        <MainCard content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Emissions by year</Typography>
            </Stack>
          </Box>
          <ReactApexChart
            options={{ ...byYearChartOptions, labels }}
            color={theme.palette.primary.main}
            series={series}
            height={365}
          />
        </MainCard>
        <Card sx={{ height: 365, p: "1rem" }}>
          <ClusteredMap dataPoints={dataPoints} />
        </Card>
      </Stack>
    )
  },
)

const ContributorAnalysis = () => {
  const { id: idStr } = useParams()
  const id = parseInt(idStr!, 10)
  const indexes = useSelector(selectAlignedIndexes)
  const allDataPoints = useSelector(selectAllPoints)
  const timeWindow = useSelector(selectTimeWindow)
  const [selectedScope, setSelectedScope] = useState(0)
  const company = detectCompany(id, indexes)

  const relevantDataPoints = useMemo(() => {
    if (typeof company === "undefined") {
      return []
    }
    const allSubEntities = expandId([company.id], indexes.entityHierarchy)
    return (
      tidy(
        allDataPoints,
        filter((edp) => allSubEntities.includes(edp.entityId)),
      ) ?? []
    )
  }, [company, allDataPoints, indexes])
  const totalRelevantEmissions = useMemo(
    () =>
      tidy(
        relevantDataPoints,
        summarize({ total: sum("totalEmissionAmount") }),
      )[0].total,
    [relevantDataPoints],
  )

  const relevantEmissionCategories = useMemo(
    () =>
      tidy(
        relevantDataPoints,
        map((edp) => ({
          category: edp.categoryId,
        })),
        distinct(["category"]),
        filter(
          (categoryId) =>
            typeof indexes.categories[categoryId.category]?.parent !==
            "undefined",
        ),
      ).map((item) => item.category),
    [relevantDataPoints],
  )

  const pointsForScope = useMemo(() => {
    if (selectedScope === 0) {
      return relevantDataPoints
    }
    const relevantCategories = expandId(
      [selectedScope],
      indexes.categoryHierarchy,
    )
    return tidy(
      relevantDataPoints,
      filter((edp) => relevantCategories.includes(edp.categoryId)),
    )
  }, [relevantDataPoints, relevantEmissionCategories, selectedScope])

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Contributor Analysis
      </Typography>
      <Grid container rowSpacing={4.5} columnSpacing={3}>
        <Grid item xs={12} md={4}>
          <FactoryCard
            indexes={indexes}
            company={company}
            totalEmissions={totalRelevantEmissions}
            categories={relevantEmissionCategories}
            onCategoryClick={setSelectedScope}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <EmissionsByScope
            category={indexes.categories[selectedScope]}
            dataPoints={pointsForScope}
            timeWindow={timeWindow}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ContributorAnalysis
