import axios from "axios";
import { useState } from "react";

export const baseURL = "https://192.168.1.101:1443/admin/realms/SSOPortal/";

type Props = {
    endpoint: string
};

export const useDelete = () => {
    const [deleteResponse, setResponse] = useState<any>(null);
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    const remove = async (props: Props) => {
        try {
            const res = await axios.delete(`${baseURL}${props.endpoint}`, config);
            setResponse(res);
            return res;
        } catch (error: any) {
            console.log(error);
            setResponse(error.message);
            return null;
        }
    };

    return { remove, deleteResponse };
};
