import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Container } from "@mui/system";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { OrderApi } from "../../Services/OrdersService.js";
import { useNavigate } from "react-router-dom";
import { StorageHandler } from "../../Services/SessionStorage.js";

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function OrderReport() {
  const [Orders, setOrders] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oState, setOState] = useState(1);
  const [Ostates, setOstates] = useState([]);

  const [ShowContent, setShowContent] = useState(false);
  const navigate = useNavigate;
  useEffect(() => {
    if (StorageHandler.HavePermission("OrdersDisplay")) {
      setShowContent(true);
      getOstatesList();
    } else {
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
  }, []);

  const getOstatesList = async () => {
    try {
      const res = await OrderApi.getAllOrderStates();
      setOstates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrdersList = async () => {
    try {
      const res = await OrderApi.getOrderReport({
        OrderState_Id: oState,
        StartDate: startDate,
        EndDate: endDate,
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {ShowContent && (
        <Container>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              marginY: 2,
              marginX: "auto",
              padding: 2,
              textAlign: "center",
              display: "flex",
            }}
          >
            <div className="d-flex justify-content-between">
              <InputLabel id="oState">حالة الطلب</InputLabel>
              <Select
                xs={12}
                labelId="oState"
                id="oState"
                name="oState"
                value={oState}
                label="حالة الطلب"
                onChange={(e) => setOState(e.target.value)}
                sx={{ minWidth: 100 }}
                variant="standard"
              >
                {Ostates.map((oState, index) => (
                  <MenuItem key={index} value={oState.id}>
                    {oState.name}
                  </MenuItem>
                ))}
              </Select>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField {...props} sx={{ width: 230, marginRight: 2 }} />
                  )}
                  label="من"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                />
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField {...props} sx={{ width: 230, marginRight: 2 }} />
                  )}
                  label="إلى"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <Button
                onClick={() => getOrdersList()}
                variant="contained"
                color="primary"
                sx={{ height: 35, marginTop: 1 }}
              >
                {" "}
                بحث
              </Button>
            </div>
          </Paper>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    {" "}
                    الرقم التسلسلي{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center"> الحالة</StyledTableCell>
                  <StyledTableCell align="center"> التاجر</StyledTableCell>
                  <StyledTableCell align="center"> العميل</StyledTableCell>
                  <StyledTableCell align="center"> رقم الهاتف</StyledTableCell>
                  <StyledTableCell align="center"> المحافظة</StyledTableCell>
                  <StyledTableCell align="center"> المدينة </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    تكلفة الطلب{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    تكلفة الشحن{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center"> التاريخ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Orders &&
                  Orders.map((order, index) => (
                    <StyledTableRow key={order.id}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.orderStateName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.merchantName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.clientName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.clientPhones[0]} / {order.clientPhones[1] || ""}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.governrateName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.cityName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.productsCost}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.shippingCost}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.orderDate.toString().substring(0, 10)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

export default OrderReport;
