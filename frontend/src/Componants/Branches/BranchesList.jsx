import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BranchApi } from "../../Services/BranchesService.js";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

function BranchesList() {
  const [Branches, setBranches] = useState([]);
  const [deletedID, setDeletedID] = useState(-1);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setDeletedID(-1);
    setShow(false);
  };

  const preDelete = (bid) => {
    console.log(bid);
    setDeletedID(bid);
    handleShow();
  };

  const handleDelete = async () => {
    try {
      console.log(deletedID);
      await BranchApi.deleteBranch(deletedID);
      setShow(false);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getBranchesList = async () => {
    try {
      const res = await BranchApi.getAllBranches();
      setBranches(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [ShowContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (StorageHandler.HavePermission("BranchesDisplay")) {
      setShowContent(true);
      getBranchesList();
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
                  <StyledTableCell align="center"> الاسم </StyledTableCell>
                  <StyledTableCell align="center"> الحالة</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    تاريخ الإضافة
                  </StyledTableCell>
                  {(StorageHandler.HavePermission("BranchesUpdate") ||
                    StorageHandler.HavePermission("BranchesDelete")) && (
                    <StyledTableCell align="center"> الاعدادات</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Branches &&
                  Branches.map((Branch) => (
                    <StyledTableRow key={Branch.id}>
                      <StyledTableCell align="center">
                        {Branch.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Switch checked={Branch.status} color="primary" />{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Branch.creationDate.toString().substring(0,10)}
                      </StyledTableCell>
                      {(StorageHandler.HavePermission("BranchesUpdate") ||
                        StorageHandler.HavePermission("BranchesDelete")) && (
                        <StyledTableCell align="center">
                          {StorageHandler.HavePermission("BranchesUpdate") && (
                            <Link to={`Edit/${Branch.id}`}>
                              <EditIcon color="primary" />
                            </Link>
                          )}
                          {StorageHandler.HavePermission("BranchesDelete") && (
                            <>
                              {" | "}
                              <DeleteIcon
                                color="primary"
                                onClick={() => preDelete(Branch.id)}
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
              انت على وشك مسح أحد الأفرع، هل تود الاستمرار؟
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

export default BranchesList;
