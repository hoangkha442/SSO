import axios from "axios";
import { useEffect, useState } from "react";

export const baseURL = "https://192.168.1.101:1443/admin/realms/SSOPortal/";
export const HOSTNAME = "https://192.168.1.101:1443";
export const getData = ({ endpoint, url }: { endpoint: string, url: string }) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    const fetchData = async (endpoint: string) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            await axios.get(`${url !== "" ? url : baseURL}${endpoint}`, config).then((res) => {
                setResponse(res.data);
            });
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData(endpoint);
    }, [endpoint]);

    return { response, error, fetchData };
};

export const getGroups = ({ endpoint, url }: { endpoint: string, url: string }) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            await axios.get(`${url !== "" ? url : baseURL}${endpoint}`, config).then((res) => {
                setResponse(res.data);
            });
        } catch (error) {
            setError(error);
        }
    };

    return { response, error, fetchData };
};

export const getUsers = ({ endpoint, url }: { endpoint: string, url: string }) => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            await axios.get(`${url !== "" ? url : baseURL}${endpoint}`, config).then((res) => {
                setResponse(res.data);
            });
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { response, error, fetchData };
};

export const useCreateGroup = () => {
    const [res, setRes] = useState(null);
    const [error, setError] = useState(null);

    const createGroup = async ({ data }: { data: any }) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        await axios.post(`${baseURL}/groups`, JSON.stringify(data), config).then((res) => {
            setRes(res.data);
        }).catch((error) => {
            setError(error);
        });
    };

    return { res, error, createGroup };
};


export const useFetchUserInfo = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const result = await axios.get('https://192.168.1.101:1443/realms/SSOPortal/protocol/openid-connect/userinfo', config);
        setResponse(result.data);
      } catch (err:any) {
        setError(err);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { response, error, fetchData };
  };