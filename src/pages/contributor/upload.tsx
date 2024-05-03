// material-ui
import {
  IconButton,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import MainCard from "components/MainCard"
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Formik } from "formik"
import * as yup from "yup"
import { useTheme } from "@mui/material/styles"
import UploadMultiFile from "components/third-party/dropzone/MultiFile"
import { useState } from "react"
import { useSendFilesMutation } from "data/store/features/fileupload/FileUploadClient"

const ContributorUpload = () => {
  const [list, setList] = useState(false)
  const theme = useTheme()
  const [sendFiles, { isLoading: isUpdating }] = useSendFilesMutation()

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "30px" }}>
        Upload
      </Typography>
      <Grid container spacing={3}>
        {isUpdating ? "Loading" : null}
        <Grid item xs={12}>
          <MainCard
            title="Upload multiple files"
            sx={{ bgcolor: theme.palette.grey.A100 }}
            secondary={
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <IconButton
                  color={list ? "secondary" : "primary"}
                  size="small"
                  onClick={() => setList(false)}
                >
                  <UnorderedListOutlined style={{ fontSize: "1.15rem" }} />
                </IconButton>
                <IconButton
                  color={list ? "primary" : "secondary"}
                  size="small"
                  onClick={() => setList(true)}
                >
                  <AppstoreOutlined style={{ fontSize: "1.15rem" }} />
                </IconButton>
              </Stack>
            }
          >
            <Formik
              initialValues={{ files: null }}
              onSubmit={(values: any) => {
                sendFiles(values.files)
              }}
            >
              {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.5} alignItems="center">
                        <UploadMultiFile
                          showList={list}
                          setFieldValue={setFieldValue}
                          files={values.files}
                          error={touched.files && !!errors.files}
                          onUpload={handleSubmit}
                        />
                      </Stack>
                      {touched.files && errors.files && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-password-login"
                        >
                          {errors.files as string}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}

export default ContributorUpload
