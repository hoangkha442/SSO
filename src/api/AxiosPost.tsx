import axios from "axios"
import { stringify } from "querystring"
import { useState } from "react"

export const baseURL = "https://192.168.1.101:1443/realms/SSOPortal/"
const adminBaseURL = "https://192.168.1.101:1443/admin/realms/SSOPortal/"
type Props = {
    data: any,
    endpoint: string
}


const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

}


export const useLogin = () => {
    const [response, setResponse] = useState<any>(null)
    const login = async (props: Props) => {
        await axios.post(`${baseURL}${props.endpoint}`, stringify(props.data), config).then((res) => {
            setResponse(res)
        }).catch((error) => {
            console.log('error: ', error);
        })
    }

    return { login, response }
}

export const useCreateGroup = () => {
    const [createResponse, setResponse] = useState<any>(null);
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const create = async (props: Props) => {
        try {
            const res = await axios.post(`${adminBaseURL}${props.endpoint}`, JSON.stringify(props.data), config);
            setResponse(res);
            return res;
        } catch (error: any) {
            console.log(error);
            setResponse(error.message);
            return error.response;
        }
    }

    return { create, createResponse };
}

