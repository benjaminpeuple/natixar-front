import { MapContainer, TileLayer } from "react-leaflet"
import { LatLngTuple } from "leaflet"

import "leaflet/dist/leaflet.css"

import { Box, SxProps } from "@mui/material"
import { memo } from "react"
import { EmissionDataPoint } from "data/domain/types/emissions/EmissionTypes"
import ClusterByCategoryLayer from "./cluster-by-category-layer"

const defaultLatLng: LatLngTuple = [48.865572, 2.283523]
const zoom: number = 8

const ClusteredMap = ({
  dataPoints,
  onClusterPointsSelect,
  ...sxProps
}: {
  dataPoints: EmissionDataPoint[]
  onClusterPointsSelect?: (points: EmissionDataPoint[]) => void
} & SxProps) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      ...sxProps,
    }}
  >
    <MapContainer
      center={defaultLatLng}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        attribution="©OpenStreetMap, ©CartoDB"
      />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
        attribution="©OpenStreetMap, ©CartoDB"
      />
      {/*
        I will leave the default map here, just in case if it's necessary
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors" /> */}
      <ClusterByCategoryLayer
        dataPoints={dataPoints}
        onClusterPointsSelect={onClusterPointsSelect}
      />
    </MapContainer>
  </Box>
)

export default memo(ClusteredMap)
