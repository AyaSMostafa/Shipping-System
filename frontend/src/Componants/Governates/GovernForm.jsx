import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Switch,
  Grid,
  FormLabel,
  Stack,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { governateApi } from "../../Services/GovernateService.js";
import { StorageHandler } from "../../Services/SessionStorage.js";
import swal from "sweetalert";

function GovernForm() {
  const { eid, gid } = useParams();
  const [resultChange, setresultChange] = useState(false);
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "مطلوب";
    } else if (!/^[\u0621-\u064A ]{4,20}$/.test(values.name)) {
      errors.name =
        "يجب ان يكون الاسم مكون من حروف عربيه فقط عددها من اربعة الى عشرين";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      status: false,
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (gid) {
          swal({
            title: "تعديل  !",
            text: ` تم التعديل بنجاح`,
            icon: "success",
            buttons: "حسنا  !",
          });
          await governateApi.editGovernate(gid, values);
          navigate(`/Employee/${eid}/Governates`, { replace: true });

        } else {
          swal({
            title: "اضافة  !",
            text: `تمت اضافة محافظة بنجاح `,
            icon: "success",
            buttons: "حسنا  !",
          });
          await governateApi.addGovernate(values);
        navigate(`/Employee/${eid}/Governates`, { replace: true });

        }
      } catch (e) {
        swal({
          title: "اضافة  !",
          text: `فشل في اضافة محافظة جديدة`,
          icon: "error",
          buttons: "حسنا  !",
        });
      }
    },
  });
  let result;
  const getGovernData = async () => {
    try {
      result = await governateApi.getGovernateByID(gid);
      console.log(result.data);
      formik.values.id = result.data.id;
      formik.values.name = result.data.name;
      formik.values.status = result.data.status;
      setresultChange(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [ShowContent, setShowContent] = useState(false);
  useEffect(() => {
    if (gid && StorageHandler.HavePermission("GovernatesUpdate")) {
      setShowContent(true);
      getGovernData();
    } else if (StorageHandler.HavePermission("GovernatesCreate")) {
      setShowContent(true);
    } else {
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
  }, []);

  return (
    <>
      {ShowContent && (
        <Container>
          {(!gid || resultChange) && (
            <Paper
              elevation={3}
              sx={{
                width: "75%",
                marginY: 30,
                marginX: "auto",
                padding: 5,
                textAlign: "center",
              }}
            >
              {gid ? (
                <Typography color="secodary" textAlign={"left"}>
                  تعديل محافظة
                </Typography>
              ) : (
                <Typography color="secodary" textAlign={"left"}>
                  محافظة جديدة
                </Typography>
              )}

              <br />
              <br />
              <form onSubmit={formik.handleSubmit}>
                <Grid className="d-block" container spacing={2}>
                  <div className="w-50 m-auto">
                    <TextField
                    className="form-control mb-2"
                      label="الاسم"
                      variant="standard"
                      color="primary"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name ? (
                      <Alert severity="error">{formik.errors.name}</Alert>
                    ) : null}
                  </div>

                  <div className="w-50 m-auto">
                    <FormLabel component="legend">الحالة</FormLabel>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FormLabel component="legend">غير مفعلة</FormLabel>
                      <Switch
                        color="primary"
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        checked={formik.values.status}
                      />
                      <FormLabel component="legend">مفعلة</FormLabel>
                    </Stack>
                  </div>
                  <Grid alignItems="center" justifyContent="center">
                    <br />
                    <br />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                      حفظ
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          )}
        </Container>
      )}
    </>
  );
}

export default GovernForm;
