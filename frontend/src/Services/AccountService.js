import axios from 'axios';
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";

let Login = (loginInfo) => {
    // console.log(`${baseURL}/Account`);
    return axios.post(`${baseURL}/Account/login`, loginInfo);
};

let MerchantRegister = (merchantInfo) => {
    // console.log(`${baseURL}/Account`);
    return axios.post(`${baseURL}/Account/RegisterMerchant`, merchantInfo);
}

let Logout = async () => {
    await StorageHandler.RemoveStoredData();
};
export let AccountApi = {
    Login,
    MerchantRegister,
    Logout
};