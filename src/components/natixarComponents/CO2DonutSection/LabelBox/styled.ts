export const ContainerStyles = (color: string) => ({
  display: "flex",
  flexDirection: "column",
  columnGap: "5px",
  alignItems: "flex-start",
  height: "100%",
  backgroundColor: `${color}60`,
  borderLeft: `1px solid ${color}`,
  padding: "20px",
  gap: "20px",
  justifyContent: "flex-start",
  cursor: "pointer",
})

export const DotStyles = (color: string) => ({
  width: "10px",
  height: "10px",
  backgroundColor: `${color}`,
  borderRadius: "50%",
})

export const LabelValueStyles = {
  display: "flex",
  flexDirection: "row",
  columnGap: "5px",
  alignItems: "center",
}

export const ButtonContainerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "end",
  marginTop: "20px",
  width: "100%",
}
