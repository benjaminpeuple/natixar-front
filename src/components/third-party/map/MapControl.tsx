// third-party
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl"

// project-import
import MapControlsStyled from "./MapControlsStyled"

interface Props {
  hideScale?: boolean
  hideGeolocate?: boolean
  hideFullscreen?: boolean
  hideNavigationn?: boolean
}

// ==============================|| MAP BOX - CONTROL ||============================== //

const MapControl = ({
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
}: Props) => (
  <>
    <MapControlsStyled />
    {!hideGeolocate && (
      <GeolocateControl
        position="top-left"
        positionOptions={{ enableHighAccuracy: true }}
      />
    )}
    {!hideFullscreen && <FullscreenControl position="top-left" />}
    {!hideScale && <ScaleControl position="bottom-left" />}
    {!hideNavigationn && <NavigationControl position="bottom-left" />}
  </>
)

export default MapControl
