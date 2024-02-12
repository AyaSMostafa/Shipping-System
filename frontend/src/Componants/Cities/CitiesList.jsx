import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { cityApi } from "../../Services/CityServices";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StorageHandler } from "../../Services/SessionStorage";
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

function CitiesList() {
  const [cities, setcities] = useState([]);

  const [deletedID, setDeletedID] = useState(-1);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setDeletedID(-1);
    setShow(false);
  };

  const preDelete = (cid) => {
    console.log(cid);
    setDeletedID(cid);
    handleShow();
  };

  const handleDelete = async () => {
    try {
      console.log(deletedID);
      await cityApi.deleteCity(deletedID);
      setShow(false);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getcitiesList = async () => {
    try {
      const res = await cityApi.getAllCities();
      setcities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [ShowContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (StorageHandler.HavePermission("BranchesDisplay")) {
      setShowContent(true);
      getcitiesList();
    } else {
      swal({
        title: "صلاحيات  !",
        text: `فشل في الصلاحية `,
        icon: "error",
        buttons: "حسنا  !",
      });
      navigate(`/Forbidden`, { state: { backPath: `/` } });
    }
  }, []);

  return (
    <>
      {ShowContent && (
        <div className="mt-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> المحافظة </StyledTableCell>
                  <StyledTableCell align="center"> المدينة</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    تكلفة الشحن العادية
                  </StyledTableCell>
                  {(StorageHandler.HavePermission("CitiesUpdate") ||
                    StorageHandler.HavePermission("CitiesDelete")) && (
                    <StyledTableCell align="center">الاعدادات </StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {cities &&
                  cities.map((City) => (
                    <StyledTableRow key={City.id}>
                      <StyledTableCell align="center">
                        {City.governate_Name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {City.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {City.shippingCost}
                      </StyledTableCell>
                      {(StorageHandler.HavePermission("CitiesUpdate") ||
                        StorageHandler.HavePermission("CitiesDelete")) && (
                        <StyledTableCell align="center">
                          {StorageHandler.HavePermission("CitiesUpdate") && (
                            <Link to={`Edit/${City.id}`}>
                              <EditIcon color="primary" />
                            </Link>
                          )}
                          {StorageHandler.HavePermission("CitiesDelete") && (
                            <>
                              {" | "}
                              <DeleteIcon
                                color="primary"
                                onClick={() => preDelete(City.id)}
                                sx={{
                                  cursor: "pointer",
                                }}
                              />
                            </>
                          )}
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Link to={`New`}>
            <Button variant="secondary">إضافة مدينة</Button>
          </Link>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>تأكيد</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              انت على وشك مسح أحد المدن، هل تود الاستمرار؟
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                مسح
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default CitiesList;
