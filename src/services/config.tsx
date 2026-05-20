import axios from "axios";
import { userLocalStorage } from "./LocalService";

export const BASE_URL_IMG = "http://localhost:8080/public/img/prds/";
export const BASE_URL_USER_IMG = "http://localhost:8080/public/img/avatar/";

export const https = axios.create(
    {
        baseURL: 'https://192.168.1.101:1443/admin/realms/SSOPortal/',
        headers:{
            Authorization: `Bearer ` + userLocalStorage?.get()?.token
        }
    }   
)