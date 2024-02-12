import axios from 'axios';
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

let getAllCities = () => {
    return axios.get(`${baseURL}/City`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

let getCityByID = (cityID) => {
    return axios.get(`${baseURL}/City/${cityID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let addCity = (city) => {
    return axios.post(`${baseURL}/City`, city, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let editCity = (cityID, city) => {
    return axios.put(`${baseURL}/City/${cityID}`, city, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

let deleteCity = (cityID) => {
    return axios.delete(`${baseURL}/City/${cityID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export let cityApi = {
    getAllCities,
    getCityByID,
    addCity,
    editCity,
    deleteCity
}