import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function DashboardCard({ Status, OrderNumber, Percentage }) {
  let { eid, mid } = useParams();

  return (
    <div className="container mt-5 mb-3 col-md-6">
      <div className="col-md-12">
        <div className="card p-3 mb-2">
          <div className="d-flex justify-content-between flex-row-reverse">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <div className="icon">
                  <LibraryBooksIcon />
                </div>
              </div>
            </div>
            <div className="badge mt-1">
              {" "}
              <span>الطلبات</span>{" "}
            </div>
          </div>
          <div className="row m-4">
            <div className="col-6">
              <div className="badge mt-1">
                {" "}
                <span>حالة الطلب</span>{" "}
              </div>
              <h4 className="heading">{Status}</h4>
            </div>
            <div className="col-6">
              <div className="badge mt-1">
                {" "}
                <span>عدد الطلبات</span>{" "}
              </div>

              <h4 className="heading">{OrderNumber}</h4>
            </div>
          </div>
          <div className="container d-flex justify-content-between mt-1"></div>

          <LinearProgressWithLabel value={Percentage} />

          <div className="mt-3">
            {" "}
            {eid && (
              <span className="text1">
                {" "}
                البيانات المتاحة <span className="text2">للموظف</span>
              </span>
            )}
            {mid && (
              <span className="text1">
                البيانات المتاحة<span className="text2">للتاجر</span>
              </span>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
