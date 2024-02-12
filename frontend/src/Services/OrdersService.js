import axios from "axios";
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

console.log(token);

let getAllOrders = () => {
  // console.log(`${baseURL}/Order`);
  return axios.get(`${baseURL}/Order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getAllOrdersTable = () => {
  // console.log(`${baseURL}/Order/Table`);
  return axios.get(`${baseURL}/Order/Table`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let editOrderState = (OrderID, stateID) => {
  console.log(typeof (stateID));
  console.log(`${baseURL}/Order/${OrderID}/Status`);
  return axios.put(`${baseURL}/Order/${OrderID}/Status/${stateID}`, { hi: 'j' }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getDashboardData = () => {
  return axios.get(`${baseURL}/Order/GetByStatus`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getOrderByID = (OrderID) => {
  //console.log(`${baseURL}/Order/${OrderID}`);
  return axios.get(`${baseURL}/Order/${OrderID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let addOrder = (Order) => {
  // console.log(`${baseURL}/Order`, Order);
  return axios.post(`${baseURL}/Order`, Order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let editOrder = (OrderID, Order) => {
  // console.log(`${baseURL}/Order/${OrderID}`, Order);
  return axios.put(`${baseURL}/Order/${OrderID}`, Order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let deleteOrder = (OrderID) => {
  // console.log(`${baseURL}/Order/${OrderID}`);
  return axios.delete(`${baseURL}/Order/${OrderID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getAllOrderStates = () => {
  // console.log(`${baseURL}/OrderState`);
  return axios.get(`${baseURL}/OrderState`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


let getOrderReport = (values) => {
  console.log(`${baseURL}/report/`);
  console.log(values);
  return axios.post(`${baseURL}/Order/Report`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getOrderDependencies = () => {
  // console.log(`${baseURL}/report/`);
  return axios.get(`${baseURL}/Order/Dependencies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export let OrderApi = {
  getAllOrders,
  getAllOrdersTable,
  getOrderByID,
  addOrder,
  editOrder,
  deleteOrder,
  getAllOrderStates,
  editOrderState,
  getOrderReport,
  getOrderDependencies,
  getDashboardData,
};
