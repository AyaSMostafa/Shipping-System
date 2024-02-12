import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AccountApi } from "../../Services/AccountService";
import { RolePermissionsApi } from "../../Services/RolePermissionsService.js";

function NewMerch() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

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
    if (!values.fullName) {
      errors.fullName = "مطلوب";
    } else if (!/^[\u0621-\u064AA-Za-z ]{3,}$/.test(values.fullName)) {
      errors.fullName =
        "يحب ان لا يحتوى الاسم على ارقام او علامات خاصه و ان يزيد طوله عن 3 احرف";
    }
    if (!values.userName) {
      errors.userName = "مطلوب";
    } else if (
      !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z\u0621-\u064A0-9._]+(?<![_.])$/.test(
        values.userName
      )
    ) {
      errors.userName =
        "لا يجب ان يبدا اسم المستخدم او ينتهى ب _ او . و طوله من 8 الى 20 حرف";
    }
    if (!values.email) {
      errors.email = "مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = " يجب ان يحتوي عنوان البريد الالكتروني علي @examp.com";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        swal({
          title: "اضافة  !",
          text: `تمت اضافة تاجر بنجاح `,
          icon: "success",
          buttons: "حسنا  !",
        });
        await AccountApi.MerchantRegister(values);
        navigate(`/Employee/${eid}`, { replace: true });
      } catch (e) {
        swal({
          title: "اضافة  !",
          text: `فشل في اضافة تاجر جديد`,
          icon: "error",
          buttons: "حسنا  !",
        });
      }
    },
  });

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const res = await RolePermissionsApi.getAllRoles();
      setRoles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
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
          <Typography color="secodary" textAlign={"left"}>
            مستخدم جديد
          </Typography>

          <br />
          <br />
          <form onSubmit={formik.handleSubmit}>
            <Grid className="d-block" container spacing={2}>
              <div className="w-50 m-auto">
                <TextField
                  className="form-control mb-2"
                  label="الاسم الكامل"
                  variant="standard"
                  color="secondary"
                  id="fullName"
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
                {formik.errors.fullName ? (
                  <Alert severity="error">{formik.errors.fullName}</Alert>
                ) : null}
              </div>
              <div className="w-50 m-auto">
                <TextField
                  className="form-control mb-2"
                  label="اسم المستخدم"
                  variant="standard"
                  color="secondary"
                  id="userName"
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
                {formik.errors.userName ? (
                  <Alert severity="error">{formik.errors.userName}</Alert>
                ) : null}
              </div>
              <div className="w-50 m-auto">
                <TextField
                  className="form-control mb-2"
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
              <Grid item xs={12}>
                <InputLabel htmlFor="role">الصلاحيات</InputLabel>

                <Select
                  xs={12}
                  labelId="role"
                  id="role"
                  name="role"
                  value={formik.values.governate_Id}
                  label="الصلاحيات"
                  onChange={formik.handleChange}
                  sx={{ minWidth: 100 }}
                  variant="standard"
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
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
      </Container>
    </>
  );
}

export default NewMerch;
