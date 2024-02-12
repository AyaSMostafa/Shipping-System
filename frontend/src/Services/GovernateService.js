import axios from 'axios';
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

let getAllGovernates = () => {
    // console.log(`${baseURL}/Governate`);
    return axios.get(`${baseURL}/Governate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

let getGovernateByID = (governateID) => {
    console.log(`${baseURL}/Governate/${governateID}`);
    return axios.get(`${baseURL}/Governate/${governateID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let addGovernate = (governate) => {
    console.log(`${baseURL}/Governate`, governate, token);
    return axios.post(`${baseURL}/Governate`, governate, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let editGovernate = (governateID, governate) => {
    // console.log(`${baseURL}/Governate/${governateID}`, governate);
    return axios.put(`${baseURL}/Governate/${governateID}`, governate, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let deleteGovernate = (governateID) => {
    // console.log(`${baseURL}/Governate/${governateID}`);
    return axios.delete(`${baseURL}/Governate/${governateID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export let governateApi = {
    getAllGovernates,
    getGovernateByID,
    addGovernate,
    editGovernate,
    deleteGovernate
}