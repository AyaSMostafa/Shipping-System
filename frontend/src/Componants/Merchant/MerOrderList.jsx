import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { OrderApi } from "../../Services/OrdersService.js";
import { Button } from "react-bootstrap";

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

function MerOrderList() {
  const [Orders, setOrders] = useState([]);
  const [AllOrders, setAllOrders] = useState([]);

  const [ShowContent, setShowContent] = useState(false);
  useEffect(() => {
    getOrdersList();
    setShowContent(true);
  }, []);

  const getOrdersList = async () => {
    try {
      const res = await OrderApi.getAllOrdersTable();
      // console.log(res.data);
      setAllOrders(res.data);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterOrders = (state) => {
    if (state) {
      setOrders(
        AllOrders.filter((order) => {
          return order.orderStateName === state;
        })
      );
    } else {
      setOrders(AllOrders);
    }
  };

  return (
    <>
      {ShowContent && (
        <Paper
          elevation={3}
          sx={{
            marginY: 10,
            marginX: "auto",
            padding: 5,
            textAlign: "center",
          }}
        >
          <div>
            <h2 className="mb-4 text-primary">اختر الحالة لعرض الطلبات : </h2>

            <div className="mt-5 mb-5 d-flex gx-1 flex-wrap justify-content-around">
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders()}
              >
                الكل
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("جديد")}
              >
                جديد
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("قيد الانتظار")}
              >
                قيد
                <br />
                الانتظار
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم التسليم للمندوب")}
              >
                تم التسليم <br />
                للمندوب
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم التسليم")}
              >
                تم التسليم
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("لا يمكن الوصول")}
              >
                لا يمكن <br />
                الوصول
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم التاجيل")}
              >
                تم التاجيل
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم التسليم جزئيا")}
              >
                تم التسليم <br />
                جزئيا
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم الالغاء من قبل المستلم")}
              >
                تم الالغاء <br />
                من قبل المستلم
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("تم الرفض مع الدفع")}
              >
                تم الرفض <br />
                مع الدفع
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("رفض مع سداد جزء")}
              >
                رفض مع
                <br /> سداد جزء
              </Button>
              <Button
                variant="outline-primary"
                className="fw-bold m-1"
                onClick={() => filterOrders("رفض و لم يتم الدفع")}
              >
                رفض ولم يتم <br />
                الدفع
              </Button>
              <hr></hr>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      {" "}
                      الرقم التسلسلي{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center"> التاريخ</StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      بيانات العميل
                    </StyledTableCell>
                    <StyledTableCell align="center"> المحافظة</StyledTableCell>
                    <StyledTableCell align="center"> المدينة </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      تكلفة الطلب{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center"> الحالة </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Orders &&
                    Orders.map((order, index) => {
                      console.log(order);
                      return (
                        <StyledTableRow key={order.id}>
                          <StyledTableCell align="center">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.orderDate.toString().substring(0, 10)}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.clientName} {order.clientPhones[0]}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.governrateName}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.cityName}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.productsCost + order.shippingCost}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {" "}
                            {order.orderStateName}{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      )}
    </>
  );
}

export default MerOrderList;
