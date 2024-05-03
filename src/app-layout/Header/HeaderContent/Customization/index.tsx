import { useMemo, useState } from "react"

// material-ui
import { useTheme } from "@mui/material/styles"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  Stack,
  Typography,
} from "@mui/material"

// project import
import MainCard from "components/MainCard"
import IconButton from "components/@extended/IconButton"
import SimpleBar from "components/third-party/SimpleBar"
import useConfig from "hooks/useConfig"

// assets
import {
  LayoutOutlined,
  HighlightOutlined,
  BorderInnerOutlined,
  BgColorsOutlined,
  CloseCircleOutlined,
  FontColorsOutlined,
} from "@ant-design/icons"

// types
import ThemeMenuLayout from "./ThemeMenuLayout"
import ThemeWidth from "./ThemeWidth"

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme()
  const { container, menuOrientation } = useConfig()

  // eslint-disable-next-line
  // eslint-disable-next-line
  const themeMenuLayout = useMemo(() => <ThemeMenuLayout />, [menuOrientation]);
  // eslint-disable-next-line
  // eslint-disable-next-line
  // eslint-disable-next-line
  const themeWidth = useMemo(() => <ThemeWidth />, [container]);
  // eslint-disable-next-line

  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Drawer
      sx={{
        zIndex: 2001,
      }}
      anchor="right"
      onClose={handleToggle}
      open={open}
      PaperProps={{
        sx: {
          width: 340,
        },
      }}
    >
      {open && (
        <MainCard
          title="Theme Customization"
          sx={{
            border: "none",
            borderRadius: 0,
            height: "100vh",
            "& .MuiCardHeader-root": {
              color: "background.paper",
              bgcolor: "primary.main",
              "& .MuiTypography-root": { fontSize: "1rem" },
            },
          }}
          content={false}
          secondary={
            <IconButton
              shape="rounded"
              size="small"
              onClick={handleToggle}
              sx={{ color: "background.paper" }}
            >
              <CloseCircleOutlined style={{ fontSize: "1.15rem" }} />
            </IconButton>
          }
        >
          <SimpleBar
            sx={{
              "& .simplebar-content": {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                height: "calc(100vh - 64px)",
                "& .MuiAccordion-root": {
                  borderColor: theme.palette.divider,
                  "& .MuiAccordionSummary-root": {
                    bgcolor: "transparent",
                    flexDirection: "row",
                    pl: 1,
                  },
                  "& .MuiAccordionDetails-root": {
                    border: "none",
                  },
                  "& .Mui-expanded": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <Accordion defaultExpanded sx={{ borderTop: "none" }}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <LayoutOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Theme Layout
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose your layout
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <BorderInnerOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Menu Orientation
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose Vertical or Horizontal Menu Orientation
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>{themeMenuLayout}</AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <HighlightOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Theme Mode
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose light or dark mode
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <BgColorsOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Color Scheme
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose your primary theme color
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <BorderInnerOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Layout Width
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose fluid or container layout
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>{themeWidth}</AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded sx={{ borderBottom: "none" }}>
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <IconButton
                      disableRipple
                      color="primary"
                      sx={{ bgcolor: "primary.lighter" }}
                      onClick={handleToggle}
                      aria-label="settings toggler"
                    >
                      <FontColorsOutlined />
                    </IconButton>
                    <Stack>
                      <Typography variant="subtitle1" color="textPrimary">
                        Font Family
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Choose your font family.
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
              </Accordion>
            </Box>
          </SimpleBar>
        </MainCard>
      )}
    </Drawer>
  )
}

export default Customization
