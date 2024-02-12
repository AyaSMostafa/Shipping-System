import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { OrderApi } from "../../Services/OrdersService";
import { StorageHandler } from "../../Services/SessionStorage";

function Dashboard() {
  const [Data, setData] = useState();
  const [refresh, setrefresh] = useState(true);
  let getData = async () => {
    let result = await OrderApi.getDashboardData();
    console.log(result.data);
    setData(result.data);
  };
  useEffect(() => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    getData();
  }, []);
  return (
    <>
      {Data && (
        <Paper
          elevation={10}
          sx={{
            marginY: 10,
            padding: 1,
            textAlign: "left",
          }}
        >
          <div className="row">
            {Data &&
              Data.statusNums.map((row, index) => (
                <DashboardCard
                  key={index}
                  Status={row.statusName}
                  OrderNumber={row.ordersNumbers}
                  Percentage={row.percentage}
                ></DashboardCard>
              ))}
          </div>
        </Paper>
      )}
    </>
  );
}

export default Dashboard;
