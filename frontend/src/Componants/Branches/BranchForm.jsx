import React, { useEffect, useState } from "react";
import { BranchApi } from "../../Services/BranchesService";
import swal from "sweetalert";
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
import { StorageHandler } from "../../Services/SessionStorage";

function BranchForm() {
  const { eid, bid } = useParams();
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "مطلوب";
    } else if (!/^[\u0621-\u064A ]{4,20}$/.test(values.name)) {
      errors.name =
        "يجب أن يكون الاسم مكون من حروف عربية فقط عددها من أربعة إلى عشرين";
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
        if (bid) {
          swal({
            title: "تعديل  !",
            text: ` تم التعديل بنجاح`,
            icon: "success",
            buttons: "حسنا  !",
          });
          await BranchApi.editBranch(bid, values);
          navigate(`/Employee/${eid}/Branches`, { replace: true });
        } else {
          swal({
            title: "اضافة  !",
            text: `تمت اضافة فرع بنجاح `,
            icon: "success",
            buttons: "حسنا  !",
          });
          await BranchApi.addBranch(values);
        navigate(`/Employee/${eid}/Branches`, { replace: true });
        }
      } catch (e) {
        swal({
          title: "اضافة  !",
          text: `فشل في اضافة فرع جديد`,
          icon: "error",
          buttons: "حسنا  !",
        });
      }
    },
  });

  useEffect(() => {
    if (bid) {
      getBranch();
    }
  }, []);

  const [Branch, setBranch] = useState({});
  const [resultChange, setresultChange] = useState(false);

  const getBranch = async () => {
    try {
      const res = await BranchApi.getBranchByID(bid);
      setBranch(res.data);
      formik.values.id = res.data.id;
      formik.values.name = res.data.name;
      formik.values.status = res.data.status;
      setresultChange(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [ShowContent, setShowContent] = useState(false);
  useEffect(() => {
    if (
      StorageHandler.HavePermission("BranchesUpdate") ||
      StorageHandler.HavePermission("BranchesCreate")
    ) {
      setShowContent(true);
    } else {
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
  }, []);

  return (
    <>
      {ShowContent && (
        <Container>
          {(!bid || resultChange) && (
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                marginY: 30,
                marginX: "auto",
                padding: 5,
                textAlign: "center",
              }}
            >
              {bid ? (
                <Typography color="secodary" textAlign={"left"}>
                  تعديل الفرع
                </Typography>
              ) : (
                <Typography color="secodary" textAlign={"left"}>
                  فرع جديد
                </Typography>
              )}

              <br />
              <br />
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <div className="w-50 m-auto">
                    <TextField
                      className="form-control mb-2"
                      label="اسم الفرع"
                      variant="standard"
                      color="success"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name ? (
                      <Alert severity="error">{formik.errors.name}</Alert>
                    ) : null}
                  </div>

                  <Grid item xs={12}>
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
                  </Grid>
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

export default BranchForm;
