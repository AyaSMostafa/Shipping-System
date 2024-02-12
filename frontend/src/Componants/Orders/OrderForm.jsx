import React, { useEffect, useState } from "react";
import {
  TextField,
  Switch,
  Grid,
  FormLabel,
  Stack,
  Paper,
  Button,
  MenuItem,
  Alert,
  FormControl,
  Select,
  InputLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { OrderApi } from "../../Services/OrdersService.js";
import { StorageHandler } from "../../Services/SessionStorage.js";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import swal from "sweetalert";

function OrderForm() {
  const { eid, mid, oid } = useParams();
  const [orderDependecies, setOrderDependecies] = useState();
  const [ShowCities, setShowCities] = useState(false);
  const [Cities, setCities] = useState();
  const [selectCities, setselectCities] = useState();

  const validate = (values) => {
    const errors = {
      products: [],
      clientPhones: [],
    };
    const ph1 = {};
    if (!values.clientPhones[0]) {
      ph1.value = "مطلوب";
    } else if (!/^01[0125][0-9]{8}$/.test(values.clientPhones[0])) {
      ph1.value = "يجب ان يكون رقم الهاتف مكون من 11 رقم ويبدا ب 01";
    }
    if (Object.keys(ph1).length > 0) errors.clientPhones.push(ph1);

    const ph2 = {};
    if (values.clientPhones[1]) {
      if (!/^01[0125][0-9]{8}$/.test(values.clientPhones[1])) {
        ph2.value = "يجب ان يكون رقم الهاتف مكون من 11 رقم ويبدا ب 01";
      } else if (values.clientPhones[0] === values.clientPhones[1]) {
        ph2.value = "برجاء ادخال رقم هاتف اخر";
      }
    }
    if (Object.keys(ph2).length > 0) errors.clientPhones.push(ph2);

    if (!values.clientName) {
      errors.clientName = "مطلوب";
    } else if (!/^[\u0621-\u064A ]{3,30}$/.test(values.clientName)) {
      errors.clientName =
        "يجب ان يكون الاسم مكون من حروف عربيه فقط عددها من ثلاثة الى ثلاثين";
    }
    if (!values.email) {
      errors.email = "مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = " يجب ان يحتوي عنوان البريد الالكتروني علي @examp.com";
    }
    if (!values.governate_Id) {
      errors.governate_Id = "مطلوب";
    }
    if (!values.city_Id) {
      errors.city_Id = "مطلوب";
    }
    if (!values.orderType_Id) {
      errors.orderType_Id = "مطلوب";
    }
    if (!values.payment_Id) {
      errors.payment_Id = "مطلوب";
    }
    if (!values.shipment_Id) {
      errors.shipment_Id = "مطلوب";
    }
    if (!values.street) {
      errors.street = "مطلوب";
    } else if (!/^[\u0621-\u064A0-9 ]{5,200}$/.test(values.street)) {
      errors.street =
        "يجب ان يكون اسم الشارع او المدينة مكون من حروف عربيه فقط عددها من خمسة الى مئتين";
    }
    if (!values.branch_Id) {
      errors.branch_Id = "مطلوب";
    }
    let productsErr = 0;
    if (values.products.length > 0) {
      values.products.forEach((product) => {
        const error = {};
        if (!product.name) {
          error.name = "مطلوب";
        } else if (!/^[\u0621-\u064A ]{3,10}$/.test(product.name)) {
          error.name =
            "يجب ان يكون الاسم مكون من حروف عربيه فقط عددها من ثلاثة الى عشرة";
        }
        if (product.quantity <= 0) {
          error.quantity = "يجب ان تكون كمية المنتج اكبر من صفر";
        }
        if (product.weight <= 0) {
          error.weight = "يجب ان تكون وزن المنتج اكبر من صفر";
        }
        if (Object.keys(error).length > 0) productsErr += 1;
        errors.products.push(error);
      });
    } else {
      errors.productsList = "يجب ان يحتوى الطلب على منتجات لشحنها";
    }
    if (values.productsCost <= 0) {
      errors.productsCost = "يجب ادخال تكلفة صحيحة للمنتجات";
    }
    if (productsErr === 0) delete errors.products;
    if (errors.clientPhones.length === 0) delete errors.clientPhones;
    return errors;
  };
  const [ShowContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (eid && oid && StorageHandler.HavePermission("OrdersUpdate")) {
      getOrderDependencies();
      getOrderData();
      setShowContent(true);
    } else if (mid && StorageHandler.HavePermission("OrdersCreate")) {
      getOrderDependencies();
      setShowContent(true);
    } else {
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
  }, []);

  const getOrderData = async () => {
    //TODO: call get by id api
    let response = await OrderApi.getOrderByID(oid);
    let order = response.data;

    if (!order.products.length) {
      order.products = [
        {
          name: "",
          quantity: 0,
          weight: 0,
        },
      ];
    }
    setOrderDisplay(order);
  };

  const getOrderDependencies = async () => {
    try {
      const res = await OrderApi.getOrderDependencies();
      setCities(res.data.cities);
      setOrderDependecies(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const initialValues = {
    id: 0,
    clientPhones: ["", ""],
    clientName: "",
    email: "",
    street: "",
    orderState_Id: 0,
    villageDelivery: false,
    city_Id: "",
    governate_Id: 0,
    orderType_Id: 0,
    payment_Id: 0,
    shipment_Id: 0,
    branch_Id: 0,
    products: [
      {
        name: "",
        quantity: 0,
        weight: 0,
      },
    ],
    productsCost: 0,
    netWeight: 0,
    shippingCost: 0,
    merchantID: "",
    orderDate: new Date(),
    notes: "لا يوجد ملاحظات",
    WeightSettingsID: 0,
  };
  const [OrderDisplay, setOrderDisplay] = useState(initialValues);
  const submit = async (values) => {
    try {
      console.log(oid);
      console.log(values);
      if (oid) {
        var res = await OrderApi.editOrder(oid, values);
        var Order = res.data;
        console.log(Order);
        console.log(res);
        swal({
          title: "تم تعديل طلبك بنجاح",
          text: `
        الوزن الكلي للطلب: ${Order.netWeight} كجم\n
        التكلفة الكلية للطلب: ${
          Order.productsCost + Order.shippingCost
        } جنيها\n\n
        `,
          icon: "success",
          buttons: "حسنا  !",
        });
        navigate(`/Employee/${eid}/Orders`, { replace: true });
      } else {
        var resul = await OrderApi.addOrder(values);
        var newOrder = resul.data;
        swal({
          title: "تم إضافة طلبك بنجاح",
          text: `
        الوزن الكلي للطلب: ${newOrder.netWeight} كجم\n
        التكلفة الكلية للطلب: ${
          newOrder.productsCost + newOrder.shippingCost
        } جنيها\n\n
        سنحرص على إيصال طلبك في أسرع وقت :)
        `,
          icon: "success",
          buttons: "حسنا  !",
        });
        navigate(`/Merchant/${mid}/Orders`, { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeGovernrate = (chosenID) => {
    setselectCities(Cities.filter((city) => city.governate_Id === chosenID));
    setShowCities(true);
  };
  return (
    <>
      {ShowContent && orderDependecies && (
        <Paper
          elevation={3}
          sx={{
            width: "75%",
            marginY: 20,
            marginX: "auto",
            padding: 5,
            textAlign: "center",
          }}
        >
          {oid ? (
            <h2 className="mb-4 text-primary">تعديل طلب</h2>
          ) : (
            <h2 className="mb-4 text-primary">إضافة طلب جديد</h2>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={OrderDisplay}
            onSubmit={submit}
            validate={validate}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <Grid
                  className="d-flex flex-wrap justify-content-between"
                  container
                  spacing={2}
                >
                  <FormControl className="m-4 w-25" required variant="standard">
                    <InputLabel htmlFor="orderType_Id">نوع الطلب</InputLabel>
                    <Select
                      xs={12}
                      labelId="orderType_Id"
                      id="orderType_Id"
                      name="orderType_Id"
                      label="نوع الطلب"
                      value={formik.values.orderType_Id}
                      onChange={formik.handleChange}
                      sx={{ minWidth: 100 }}
                    >
                      {orderDependecies.orderTypes.map((orderType, index) => (
                        <MenuItem key={index} value={orderType.id}>
                          {orderType.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.orderType_Id && (
                      <Tooltip title={formik.errors.orderType_Id}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </FormControl>
                  <div className="m-4 w-25">
                    <TextField
                      className="form-control mb-2"
                      label="اسم العميل"
                      variant="standard"
                      color="secondary"
                      id="clientName"
                      name="clientName"
                      onChange={formik.handleChange}
                      value={formik.values.clientName}
                    />
                    {formik.errors.clientName && (
                      <Tooltip title={formik.errors.clientName}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                  <div className="m-4 w-25">
                    <TextField
                      className="form-control mb-2"
                      label="البريد الالكتروني"
                      variant="standard"
                      color="secondary"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && (
                      <Tooltip title={formik.errors.email}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                  <div className="col-7">
                    <FieldArray name="clientPhones">
                      {() => (
                        <div className="d-flex">
                          <div className="col-6 m-4">
                            <TextField
                              className="form-control mb-2"
                              label="رقم الهاتف"
                              variant="standard"
                              color="secondary"
                              onChange={formik.handleChange}
                              value={formik.values.clientPhones[0]}
                              name="clientPhones[0]"
                              id="clientPhones[0]"
                              placeholder="رقم الهاتف"
                              type="text"
                            />
                            {formik.errors.clientPhones &&
                              formik.errors.clientPhones[0] &&
                              formik.errors.clientPhones[0].value && (
                                <Tooltip
                                  title={formik.errors.clientPhones[0].value}
                                >
                                  <IconButton>
                                    <ErrorOutlineIcon color="warning" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                          <div className="col-6 m-4">
                            <TextField
                              className="form-control mb-2"
                              label="رقم هاتف الاخر"
                              variant="standard"
                              color="secondary"
                              onChange={formik.handleChange}
                              value={formik.values.clientPhones[1]}
                              name="clientPhones[1]"
                              id="clientPhones[1]"
                              placeholder="رقم هاتف اخر"
                              type="text"
                            />
                            {formik.errors.clientPhones &&
                              formik.errors.clientPhones[1] &&
                              formik.errors.clientPhones[1].value && (
                                <Tooltip
                                  title={formik.errors.clientPhones[1].value}
                                >
                                  <IconButton>
                                    <ErrorOutlineIcon color="warning" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <FormControl className="m-4 w-25" required variant="standard">
                    <InputLabel htmlFor="gov-required">
                      اختر المحافظة
                    </InputLabel>
                    <Select
                      xs={12}
                      labelId="govern-required"
                      id="governate_Id"
                      name="governate_Id"
                      value={formik.values.governate_Id}
                      label="المحافظة"
                      onChange={(e) => {
                        changeGovernrate(e.target.value);
                        formik.handleChange(e);
                      }}
                      sx={{ minWidth: 100 }}
                    >
                      {orderDependecies.governates.map((governate, index) => (
                        <MenuItem key={index} value={governate.id}>
                          {governate.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.governate_Id && (
                      <Tooltip title={formik.errors.governate_Id}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </FormControl>

                  {ShowCities && (
                    <FormControl
                      className="m-4 w-25"
                      required
                      variant="standard"
                    >
                      <InputLabel htmlFor="gov-required">
                        اختر المدينة
                      </InputLabel>
                      <Select
                        xs={12}
                        labelId="city-required"
                        id="city_Id"
                        name="city_Id"
                        label="المدينه"
                        onChange={formik.handleChange}
                        sx={{ minWidth: 100 }}
                      >
                        {selectCities.map((city, index) => (
                          <MenuItem key={index} value={city.id}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.city_Id && (
                        <Tooltip title={formik.errors.city_Id}>
                          <IconButton>
                            <ErrorOutlineIcon color="warning" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </FormControl>
                  )}
                  <div className="m-4 w-25">
                    <TextField
                      className="form-control mb-2"
                      label="القرية و الشارع "
                      variant="standard"
                      color="secondary"
                      id="street"
                      name="street"
                      onChange={formik.handleChange}
                      value={formik.values.street}
                    />
                    {formik.errors.street && (
                      <Tooltip title={formik.errors.street}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                  <FormControl className="m-4 w-25" required variant="standard">
                    <InputLabel htmlFor="typeship-required">
                      اختر نوع الشحن{" "}
                    </InputLabel>
                    <Select
                      xs={12}
                      labelId="typeship-required"
                      value={formik.values.shipment_Id}
                      id="shipment_Id"
                      name="shipment_Id"
                      label="نوع الشحن"
                      onChange={formik.handleChange}
                      sx={{ minWidth: 100 }}
                    >
                      {orderDependecies.shipments.map((shipment, index) => {
                        return (
                          <MenuItem key={index} value={shipment.id}>
                            {shipment.type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formik.errors.shipment_Id && (
                      <Tooltip title={formik.errors.shipment_Id}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </FormControl>
                  <FormControl className="m-4 w-25" required variant="standard">
                    <InputLabel htmlFor="typepayment-required">
                      اختر نوع الدفع{" "}
                    </InputLabel>
                    <Select
                      xs={12}
                      labelId="typepayment-required"
                      value={formik.values.payment_Id}
                      id="payment_Id"
                      name="payment_Id"
                      label="نوع الدفع"
                      onChange={formik.handleChange}
                      sx={{ minWidth: 100 }}
                    >
                      {orderDependecies.payments.map((payment, index) => (
                        <MenuItem key={index} value={payment.id}>
                          {payment.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.payment_Id && (
                      <Tooltip title={formik.errors.payment_Id}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </FormControl>
                  <FormControl className="m-4 w-25" required variant="standard">
                    <InputLabel htmlFor="branch-required">
                      اختر الفرع{" "}
                    </InputLabel>

                    <Select
                      xs={12}
                      labelId="branch-required"
                      value={formik.values.branch_Id}
                      id="branch_Id"
                      name="branch_Id"
                      label=" الفرع"
                      onChange={formik.handleChange}
                      sx={{ minWidth: 100 }}
                    >
                      {orderDependecies.branches.map((branch, index) => (
                        <MenuItem key={index} value={branch.id}>
                          {branch.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.branch_Id && (
                      <Tooltip title={formik.errors.branch_Id}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </FormControl>
                  <div className="m-4">
                    <FormLabel component="legend">التوصيل للقرية ؟</FormLabel>
                    <Stack direction="row" spacing={1}>
                      <FormLabel component="legend">غير مفعلة</FormLabel>
                      <Switch
                        color="primary"
                        id="villageDelivery"
                        name="villageDelivery"
                        onChange={formik.handleChange}
                        checked={formik.values.villageDelivery}
                      />
                      <FormLabel component="legend">مفعلة</FormLabel>
                    </Stack>
                  </div>
                  <Paper className="col-12">
                    <div className="p-4 ">
                      <FieldArray name="products">
                        {({ remove, push }) => (
                          <div>
                            {formik.values.products.length > 0 &&
                              formik.values.products.map((product, index) => {
                                // console.log(formik.errors);
                                return (
                                  <div
                                    className="flex-row justify-content-between d-flex"
                                    key={index}
                                  >
                                    <div className="col-3 mt-2 mb-2 ">
                                      <TextField
                                        className="col-8"
                                        id={`products[${index}].name`}
                                        name={`products[${index}].name`}
                                        value={
                                          formik.values.products[index].name
                                        }
                                        onChange={formik.handleChange}
                                        label="اسم المنتج"
                                        type="text"
                                        variant="standard"
                                      />
                                      <span>
                                        {formik.errors.products &&
                                          formik.errors.products[index] &&
                                          formik.errors.products[index]
                                            .name && (
                                            <Tooltip
                                              title={
                                                formik.errors.products[index]
                                                  .name
                                              }
                                            >
                                              <IconButton>
                                                <ErrorOutlineIcon color="warning" />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                      </span>
                                    </div>
                                    <div className="col-3 mt-2 mb-2 ">
                                      <span>
                                        <TextField
                                          id={`products[${index}].quantity`}
                                          name={`products[${index}].quantity`}
                                          value={
                                            formik.values.products[index]
                                              .quantity
                                          }
                                          onChange={formik.handleChange}
                                          label="الكمية"
                                          type="number"
                                          InputProps={{
                                            inputProps: { min: 1 },
                                          }}
                                          variant="standard"
                                        />
                                      </span>
                                      {formik.errors.products &&
                                        formik.errors.products[index] &&
                                        formik.errors.products[index]
                                          .quantity && (
                                          <Tooltip
                                            title={
                                              formik.errors.products[index]
                                                .quantity
                                            }
                                          >
                                            <IconButton>
                                              <ErrorOutlineIcon color="warning" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                    </div>
                                    <div className="col-3 mt-2 mb-2 ">
                                      <span>
                                        <TextField
                                          id={`products[${index}].weight`}
                                          name={`products[${index}].weight`}
                                          value={
                                            formik.values.products[index].weight
                                          }
                                          onChange={formik.handleChange}
                                          label="الوزن (كجم)"
                                          type="number"
                                          InputProps={{
                                            inputProps: { min: 1 },
                                          }}
                                          variant="standard"
                                        />
                                      </span>
                                      <span>
                                        {formik.errors.products &&
                                          formik.errors.products[index] &&
                                          formik.errors.products[index]
                                            .weight && (
                                            <Tooltip
                                              title={
                                                formik.errors.products[index]
                                                  .weight
                                              }
                                            >
                                              <IconButton>
                                                <ErrorOutlineIcon color="warning" />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                      </span>
                                    </div>
                                    <div className="co-1 mt-3">
                                      <button
                                        type="button"
                                        className="btn btn-danger d-flex mt-2 justify-content-start"
                                        onClick={() => remove(index)}
                                      >
                                        حذف
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            {formik.errors.productsList && (
                              <Tooltip title={formik.errors.productsList}>
                                <IconButton>
                                  <ErrorOutlineIcon color="warning" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <button
                              type="button"
                              className="btn btn-primary justify-content-start d-flex mt-4 "
                              onClick={() =>
                                push({
                                  name: "",
                                  quantity: 0,
                                  weight: 0,
                                })
                              }
                            >
                              اضافة منتج
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </Paper>
                  <div className="row d-flex justify-content-center mt-4 col-12">
                    <TextField
                      className="mb-2 col-6"
                      id="productsCost"
                      name="productsCost"
                      value={formik.values.productsCost}
                      onChange={formik.handleChange}
                      label="التكلفة الكلية للمنتجات"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      variant="standard"
                    />
                    {formik.errors.productsCost && (
                      <Tooltip title={formik.errors.productsCost}>
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </Grid>
                <div className="mt-5 text-center">
                  <Button type="submit" variant="contained" color="primary">
                    حفظ
                  </Button>
                  {Object.keys(formik.errors).length !== 0 ? (
                    <>
                      <Tooltip title="هناك خطا فى البيانات المعطاه">
                        <IconButton>
                          <ErrorOutlineIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </>
  );
}

export default OrderForm;
