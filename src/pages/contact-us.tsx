// material-ui
import { Container, Grid } from "@mui/material"

// ==============================|| CONTACT US - MAIN ||============================== //

function contactUS() {
  return (
    <Grid
      container
      spacing={12}
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 12 }}
    >
      <Grid item xs={12} md={12} />
      <Grid item xs={12} sm={10} lg={9}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }} />
      </Grid>
    </Grid>
  )
}

export default contactUS
