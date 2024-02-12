import * as React from "react";
import { governateApi } from "../../Services/GovernateService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
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

function GovernList() {
  let [govern, setgovern] = useState([]);

  let getgoverns = async () => {
    try {
      let response = await governateApi.getAllGovernates();
      setgovern(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [ShowContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (StorageHandler.HavePermission("GovernatesDisplay")) {
      setShowContent(true);
      getgoverns();
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
                <StyledTableCell> # </StyledTableCell>
                <StyledTableCell align="center"> الاسم </StyledTableCell>
                <StyledTableCell align="center"> الحالة</StyledTableCell>

                {StorageHandler.HavePermission("GovernatesUpdate") && (
                  <StyledTableCell align="center"> الاعدادات</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {govern &&
                govern.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Switch checked={row.status} color="primary" />{" "}
                    </StyledTableCell>
                    {StorageHandler.HavePermission("GovernatesUpdate") && (
                      <StyledTableCell align="center">
                        <Link to={`Edit/${row.id}`}>
                          <EditIcon
                            color="primary"
                            sx={{
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
  
      )}
    </>
  );
}

export default GovernList;
