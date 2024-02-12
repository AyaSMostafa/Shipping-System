import React from "react";
import {
  FormLabel,
  Paper,
  Button,
  Alert,
  FormControl,
} from "@mui/material";
import { Container} from "@mui/system";
import {  Formik, Form, Field } from "formik";
import { weightApi } from "../../Services/WeightService";
import * as Yup from "yup";
import swal from "sweetalert";

function WeightSettings() {

  const validate = Yup.object().shape({
    defaultWeight: Yup.number().min(1, "لا يمكن أن يكون الوزن أقل من 1 كجم ").required("الوزن مطلوب "),
    defaultPrice: Yup.number().min(1, "لا يمكن أن يكون سعر التكلفة الافتراضية أقل من  1 جنيه").required("السعر مطلوب "),
    additionalPrice: Yup.number().min(1, "لا يمكن أن يكون السعر الاضافي أقل من  1 جنيه").required("السعر الاضافي مطلوب ")
  })



  return (
    <>
      <Formik
        initialValues={{
          defaultWeight: 0,
          defaultPrice: 0,
          additionalPrice: 0
        }}

        validationSchema={
          validate
        }

        onSubmit={async (values) => {
          try {
            {
              swal({
                title: "اضافة  !",
                text: `تمت الاضافة بنجاح `,
                icon: "success",
                buttons: "حسنا  !",
              });
              await weightApi.CreateWeightSettings(values);
            }

          } catch (e) {
            swal({
              title: "اضافة  !",
              text: `فشل في الاضافة `,
              icon: "error",
              buttons: "حسنا  !",
            });
          }
        }}
      >
        {({ errors, touched }) => (




          <Container>
            {(
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

                <Form >
                  <FormLabel sx={{ marginRight: "20px" }}>تكلفة الشحن الافتراضية من 0 كجم إلى وزن  </FormLabel>

                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "20%" }}>
                    <Field
                      name="defaultWeight"
                      id="defaultWeight"
                      type="number"
                    />


                  </FormControl>
                  <FormLabel className="mt-4 " sx={{ marginRight: "20px", marginLeft: "20px" }}>كجم  =</FormLabel>
                  <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '20%' }}>
                    <Field
                      name="defaultPrice"
                      id="defaultPrice"
                      type="number"

                    />

                  </FormControl>
                  <FormLabel className="mt-4" sx={{ marginLeft: "20px" }}>جنيه</FormLabel>
                  <br></br>
                  <FormLabel className="mt-4" sx={{ marginRight: "20px" }}>سعر كل كجم اضافي بمبلغ</FormLabel>
                  <FormControl sx={{ m: 1, mt: 3, width: '20%' }} variant="standard">

                    <Field
                      name="additionalPrice"
                      id="additionalPrice"
                      type="number"
                    />

                  </FormControl>
                  <FormLabel className="mt-4" sx={{ marginLeft: "20px" }}>جنيه</FormLabel>

                  <br />
                  <br />

                  {errors.defaultWeight && (

                    <Alert severity="error" className="mt-2">

                      {errors.defaultWeight}

                    </Alert>

                  )}
                  {errors.defaultPrice && (

                    <Alert severity="error" className="mt-2">

                      {errors.defaultPrice}

                    </Alert>

                  )}
                  {errors.additionalPrice && (

                    <Alert severity="error" className="mt-2">

                      {errors.additionalPrice}

                    </Alert>

                  )}

                  <Button type="submit" variant="contained" color="primary">
                    حفظ
                  </Button>

                </Form>
              </Paper>
            )}
          </Container>
        )}
      </Formik>
    </>

  )
}

export default WeightSettings;
