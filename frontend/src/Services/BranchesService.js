import axios from 'axios';
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

let getAllBranches = () => {
  // console.log(`${baseURL}/Branch`);
  return axios.get(`${baseURL}/Branch`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

let getBranchByID = (BranchID) => {
  // console.log(`${baseURL}/Branch/${BranchID}`);
  return axios.get(`${baseURL}/Branch/${BranchID}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

let addBranch = (Branch) => {
  // console.log(`${baseURL}/Branch`, Branch);
  return axios.post(`${baseURL}/Branch`, Branch, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

let editBranch = (BranchID, Branch) => {
  // console.log(`${baseURL}/Branch/${BranchID}`, Branch);
  return axios.put(`${baseURL}/Branch/${BranchID}`, Branch, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

let deleteBranch = (BranchID) => {
  // console.log(`${baseURL}/Branch/${BranchID}`);
  return axios.delete(`${baseURL}/Branch/${BranchID}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export let BranchApi = {
  getAllBranches,
  getBranchByID,
  addBranch,
  editBranch,
  deleteBranch,
};
