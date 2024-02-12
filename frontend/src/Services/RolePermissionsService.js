import axios from "axios";
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

let getAllRoles = () => {
  // console.log(`${baseURL}/RolePermissions`);
  return axios.get(`${baseURL}/RolePermissions/GetAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let getRolePermissionsByID = (RolePermissionsID) => {
  // console.log(`${baseURL}/RolePermissions/${RolePermissionsID}`);
  return axios.get(`${baseURL}/RolePermissions/${RolePermissionsID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let addRolePermissions = (RolePermissions) => {
  // console.log(`${baseURL}/RolePermissions`, RolePermissions);
  return axios.post(`${baseURL}/RolePermissions`, RolePermissions, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

let editRolePermissions = (RolePermissionsID, RolePermissions) => {
  // console.log(`${baseURL}/RolePermissions/${RolePermissionsID}`, RolePermissions);
  return axios.put(
    `${baseURL}/RolePermissions/${RolePermissionsID}`,
    RolePermissions,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

let deleteRolePermissions = (RolePermissionsID) => {
  // console.log(`${baseURL}/RolePermissions/${RolePermissionsID}`);
  return axios.delete(`${baseURL}/RolePermissions/${RolePermissionsID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export let RolePermissionsApi = {
  getAllRoles,
  getRolePermissionsByID,
  addRolePermissions,
  editRolePermissions,
  deleteRolePermissions,
};
