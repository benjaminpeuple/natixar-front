import { useEffect, useState } from "react"

// material-ui
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

// third-party
import ReactApexChart, { Props as ChartProps } from "react-apexcharts"

// project import
import useConfig from "hooks/useConfig"

// types
import { ThemeMode } from "types/config"

type EmissionChartProps = {
  color: string
  xLabels: Array<string>
}

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "01.2020",
      "01.2021",
      "01.2022",
      "01.2023",
      "01.2024",
      "01.2025",
      "01.2026",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    show: true,
    strokeDashArray: 2,
    position: "back",
  },
}

// ==============================|| MONTHLY BAR CHART ||============================== //

const EmissionsChart = ({ color, xLabels }: EmissionChartProps) => {
  const theme = useTheme()
  const { mode } = useConfig()

  const { primary, secondary } = theme.palette.text
  const [series] = useState([
    {
      data: [5800, 2200, 3500, 2100, 4100, 3000, 3300],
    },
  ])

  const [options, setOptions] = useState<ChartProps>(barChartOptions)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color],
      xaxis: {
        categories: xLabels,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
          categories: [
            "01.2020",
            "01.2021",
            "01.2022",
            "01.2023",
            "01.2024",
            "01.2025",
            "01.2026",
          ],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
          formatter: (value: number) =>
            value === 0 ? value : `${value / 1000}K`,
        },
      },
      theme: {
        mode: mode === ThemeMode.DARK ? "dark" : "light",
      },
    }))
  }, [mode, primary, color, secondary])

  return (
    <Box id="chart" sx={{ bgcolor: "transparent" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={365}
      />
    </Box>
  )
}

export default EmissionsChart
