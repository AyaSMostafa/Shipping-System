import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import {
  TextField,
  Grid,
  Paper,
  Button,
  Alert,
  Typography,
  FormControl,
  Select,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Container } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { cityApi } from "../../Services/CityServices.js";
import { governateApi } from "../../Services/GovernateService";
import { StorageHandler } from "../../Services/SessionStorage.js";

function CityForm() {
  const { eid, cid } = useParams();

  var [govern, setgovern] = useState([]);
  const navigate = useNavigate();

  const [resultChange, setresultChange] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "مطلوب";
    } else if (!/^[\u0621-\u064A ]{3,20}$/.test(values.name)) {
      errors.name =
        "يجب ان يكون الاسم مكون من حروف عربيه فقط عددها من ثلاث الى عشرين";
    }
    if (!values.shippingCost) {
      errors.shippingCost = "مطلوب";
    } else if (values.shippingCost <= 0) {
      errors.shippingCost = "يجب أن تكون تكلفة الشحن أكبر من صفر ";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      governate_Id: 0,
      shippingCost: 0,
      id: 0,
      governate_Name: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (cid) {
          swal({
            title: "تعديل  !",
            text: ` تم التعديل بنجاح`,
            icon: "success",
            buttons: "حسنا  !",
          });
          await cityApi.editCity(cid, values);
          navigate(`/Employee/${eid}/Cities`, { replace: true });
        } else {
          swal({
            title: "اضافة  !",
            text: `تمت اضافة مدينة بنجاح `,
            icon: "success",
            buttons: "حسنا  !",
          });
          await cityApi.addCity(values);
          navigate(`/Employee/${eid}/Cities`, { replace: true });
        }
      } catch (e) {
        swal({
          title: "اضافة  !",
          text: `فشل في اضافة مدينة جديدة`,
          icon: "error",
          buttons: "حسنا  !",
        });
      }
    },
  });
  let result;
  const getCityData = async () => {
    try {
      result = await cityApi.getCityByID(cid);
      console.log(result.data);
      formik.values.governate_Id = result.data.governate_Id;
      formik.values.name = result.data.name;
      formik.values.shippingCost = result.data.shippingCost;
      formik.values.id = result.data.id;
      setresultChange(true);
    } catch (err) {
      console.log(err);
    }
  };

  //governments list
  var getgoverns = async () => {
    try {
      let response = await governateApi.getAllGovernates();
      setgovern(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [ShowContent, setShowContent] = useState(false);
  useEffect(() => {
    if (cid && StorageHandler.HavePermission("CitiesUpdate")) {
      setShowContent(true);
      getCityData();
    } else if (StorageHandler.HavePermission("CitiesCreate")) {
      setShowContent(true);
    } else {
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
    getgoverns();
  }, []);

  //get governs

  return (
    <>
      {ShowContent && (
        <Container>
          {(!cid || resultChange) && (
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
              {cid ? (
                <Typography color="secodary" textAlign={"left"}>
                  تعديل مدينة
                </Typography>
              ) : (
                <Typography color="secodary" textAlign={"left"}>
                  إضافة مدينة جديدة
                </Typography>
              )}
              <br />
              <br />

              <form onSubmit={formik.handleSubmit}>
                <Grid className="d-block" container spacing={2}>
                  <div className="w-50 m-auto mb-4">
                    <TextField
                      className="form-control mb-2"
                      label="الاسم"
                      variant="standard"
                      color="secondary"
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
                    <TextField
                      className="form-control mb-2"
                      label="تكلفة الشحن"
                      variant="standard"
                      color="secondary"
                      id="shippingCost"
                      name="shippingCost"
                      onChange={formik.handleChange}
                      value={formik.values.shippingCost}
                    />
                    {formik.errors.shippingCost ? (
                      <Alert severity="error">
                        {formik.errors.shippingCost}
                      </Alert>
                    ) : null}
                  </div>
                  <Grid item xs={12}>
                    <br />
                    <FormControl required variant="standard">
                      {/* <FormHelperText>Required</FormHelperText> */}

                      <InputLabel htmlFor="gov-required">المحافظه</InputLabel>

                      <Select
                        xs={12}
                        labelId="gov-required"
                        id="governate_Id"
                        name="governate_Id"
                        value={formik.values.governate_Id}
                        label="المحافظه"
                        onChange={formik.handleChange}
                        sx={{ minWidth: 100 }}
                      >
                        {govern.map((gov, index) => (
                          <MenuItem key={index} value={gov.id}>
                            {gov.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default CityForm;
