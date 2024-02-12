import axios from 'axios';
import { StorageHandler } from "./SessionStorage";

let baseURL = "http://localhost:5264/api";
let token = StorageHandler.GetToken();

let CreateWeightSettings = (values) => {
    return axios.post(`${baseURL}/WeightSettings`,values , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


export let weightApi = {
    CreateWeightSettings

}