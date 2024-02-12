import { Alert, Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AccountApi } from "../../Services/AccountService";
import { StorageHandler } from "../../Services/SessionStorage";
import swal from "sweetalert";

function Login() {
  let LogoutIf = async () => {
    if (StorageHandler.ContainData()) await AccountApi.Logout();
  };
  LogoutIf();

  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "مطلوب";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        values.password
      )
    ) {
      errors.password =
        "يجب تكون كلمة السر تحتوى على حرف كابيتال و رقم و رمز خاص على الاقل و ان يزيد طولها عن 8 ارقام";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let result = await AccountApi.Login(values);
        StorageHandler.StoreLoginData(result.data);

        if (result.data.role === "Merchant") {
          swal({
            title: "تسجيل دخول  !",
            text: `مستخدم صالح`,
            icon: "success",
            buttons: "حسنا  !",
          });
          navigate(`/Merchant/${result.data.id}`);
        } else if (result.data.role) {
          swal({
            title: "تسجيل دخول  !",
            text: `مستخدم صالح`,
            icon: "success",
            buttons: "حسنا  !",
          });
          navigate(`/Employee/${result.data.id}`);
        } else {
          swal({
            title: "فشل في تسجيل الدخول  !",
            text: `مستخدم غير صالح`,
            icon: "error",
            buttons: "حسنا  !",
          });
          navigate(`/Forbidden`, { state: { backPath: `/Login` } });
        }
      } catch (e) {
        swal({
          title: "فشل في تسجيل الدخول  !",
          text: `مستخدم غير صالح`,
          icon: "error",
          buttons: "حسنا  !",
        });
      }
    },
  });
  return (
    <>
      <Container>
        <Paper
          elevation={3}
          sx={{
            width: "70%",
            marginY: 27,
            marginX: "auto",
            padding: 5,
            textAlign: "center",
          }}
        >
          <br />
          <br />
          <form onSubmit={formik.handleSubmit}>
            <Grid className="d-block" container spacing={2}>
              <div className="w-50 m-auto">
                <TextField
                  className="form-control mb-5"
                  label="الايميل"
                  variant="standard"
                  color="secondary"
                  id="email"
                  name="email"
                  type={"email"}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <Alert severity="error">{formik.errors.email}</Alert>
                ) : null}
              </div>
              <div className="w-50 m-auto">
                <TextField
                  className="form-control mb-2"
                  label="الباسورد"
                  variant="standard"
                  color="secondary"
                  id="password"
                  name="password"
                  type={"password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <Alert severity="error">{formik.errors.password}</Alert>
                ) : null}
              </div>

              <Grid alignItems="center" justifyContent="center">
                <br />
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  تسجيل دخول
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
