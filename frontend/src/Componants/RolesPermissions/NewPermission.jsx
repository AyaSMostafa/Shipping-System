import React, { useEffect, useState } from "react";
import { RolePermissionsApi } from "../../Services/RolePermissionsService.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Paper, Button, Alert } from "@mui/material";
import { Field, Formik, Form } from "formik";
import { StorageHandler } from "../../Services/SessionStorage.js";
import swal from "sweetalert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function NewPermission() {
  const rows = [
    { id: 1, name: "المحافظات", en: "Governates" },
    { id: 2, name: "المدن", en: "Cities" },
    { id: 3, name: "الفروع", en: "Branches" },
    { id: 4, name: "الطلبات", en: "Orders" },
  ];

  const [givenPermissions, setGivenPermissions] = useState({});
  const [ShowContent, setShowContent] = useState(false);
  const { rid, eid } = useParams();

  useEffect(() => {
    if (StorageHandler.GetRole() === "SuperAdmin") {
      setShowContent(true);
    } else {
      swal({
        title: "صلاحيات  !",
        text: `فشل في الصلاحية `,
        icon: "error",
        buttons: "حسنا  !",
      });
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
    getRolePermissions(rid);
  }, []);

  const getRolePermissions = async () => {
    try {
      if (rid) {
        const res = await RolePermissionsApi.getRolePermissionsByID(rid);
        setGivenPermissions(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "مطلوب";
    } else if (!/^[\u0621-\u064A ]{4,20}$/.test(values.name)) {
      errors.name =
        "يجب أن يكون الاسم مكون من حروف عربية فقط عددها من أربعة إلى عشرين";
    }

    if (values.permissions.length == 0) {
      errors.permissions = "من فضلك قم بإختيار الصلاحيات المرغوبة";
    }
    return errors;
  };

  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      console.log(values);
      if (rid) {
        await RolePermissionsApi.editRolePermissions(rid, values);
        swal({
          title: "تعديل  !",
          text: `تمت اضافة صلاحية بنجاح `,
          icon: "success",
          buttons: "حسنا  !",
        });
        navigate(`/Employee/${eid}/NewPermissions`, { replace: true });
      } else {
        await RolePermissionsApi.addRolePermissions(values);
        swal({
          title: "اضافة  !",
          text: `تمت اضافة صلاحية بنجاح `,
          icon: "success",
          buttons: "حسنا  !",
        });
        navigate(`/Employee/${eid}/NewPermissions`, { replace: true });
      }
    } catch (e) {
      swal({
        title: "اضافة  !",
        text: `فشل في اضافة صلاحية جديدة `,
        icon: "error",
        buttons: "حسنا  !",
      });
    }
  };

  return (
    <>
      {ShowContent && (
        <Paper className="mt-5 p-3">
          <Formik
            initialValues={{
              roleId: "",
              name: "",
              permissions: [],
            }}
            onSubmit={submit}
            validate={validate}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container>
                  <Grid item xs={7} sx={{ margin: "auto" }}>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="اسم المجموعة"
                    ></Field>
                    {errors.name && (
                      <Alert severity="error" className="mt-2">
                        {errors.name}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="mt-3"
                    >
                      حفظ
                    </Button>
                  </Grid>
                  <br />
                  <br />
                  <TableContainer className="mt-3">
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            {" "}
                            الصفحة{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            إضافة
                          </StyledTableCell>
                          <StyledTableCell align="center"> حذف</StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            تعديل
                          </StyledTableCell>
                          <StyledTableCell align="center"> عرض</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows &&
                          rows.map((row) => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell align="center">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Field
                                  type="checkbox"
                                  name="permissions"
                                  value={row.en + "Create"}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Field
                                  type="checkbox"
                                  name="permissions"
                                  value={row.en + "Delete"}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Field
                                  type="checkbox"
                                  name="permissions"
                                  value={row.en + "Update"}
                                />{" "}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Field
                                  type="checkbox"
                                  name="permissions"
                                  value={row.en + "Display"}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {errors.permissions && touched.permissions && (
                    <Alert severity="error" className="mt-2 m-auto">
                      {errors.permissions}
                    </Alert>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </>

    // <>
    //    <Paper className="mt-5 p-5">
    //     <form onSubmit={formik.handleSubmit}>
    //       <Grid container>
    //         <Grid item xs={7} sx={{ margin: "auto" }}>
    //           <TextField
    //             label="اسم المجموعة"
    //             variant="standard"
    //             color="primary"
    //             id="name"
    //             name="name"
    //             onChange={formik.handleChange}
    //             value={formik.values.name}
    //             sx={{ width: "50%" }}
    //           />
    //           {formik.errors.name ? (
    //             <Alert severity="error">{formik.errors.name}</Alert>
    //           ) : null}

    //           <Button type="submit" variant="contained" color="primary">
    //             Submit
    //           </Button>
    //         </Grid>
    //         <br />
    //         <br />
    //         <TableContainer>
    //           <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //             <TableHead>
    //               <TableRow>
    //                 <StyledTableCell align="center"> الصفحة </StyledTableCell>
    //                 <StyledTableCell align="center"> إضافة</StyledTableCell>
    //                 <StyledTableCell align="center"> حذف</StyledTableCell>
    //                 <StyledTableCell align="center"> تعديل</StyledTableCell>
    //                 <StyledTableCell align="center"> عرض</StyledTableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               {rows &&
    //                 rows.map((row) => (
    //                   <StyledTableRow key={row.id}>
    //                     <StyledTableCell align="center">
    //                       {row.name}
    //                     </StyledTableCell>
    //                     <StyledTableCell align="center">
    //                       <Field
    //                         type="checkbox"
    //                         name="permissions"
    //                         value={formik.values.permissions[row.en + "Create"]}
    //                       />
    //                       <Checkbox
    //                         color="secondary"
    //                         onChange={formik.handleChange}
    //                         name="permissions"
    //                         value={formik.values.permissions[row.en + "Create"]}
    //                       />
    //                     </StyledTableCell>
    //                     <StyledTableCell align="center">
    //                       <Checkbox color="secondary" />
    //                     </StyledTableCell>
    //                     <StyledTableCell align="center">
    //                       <Checkbox color="secondary" />
    //                     </StyledTableCell>
    //                     <StyledTableCell align="center">
    //                       <Checkbox color="secondary" />
    //                     </StyledTableCell>
    //                   </StyledTableRow>
    //                 ))}
    //             </TableBody>
    //           </Table>
    //         </TableContainer>
    //       </Grid>
    //     </form>
    //   </Paper>
    // </>
  );
}

export default NewPermission;
