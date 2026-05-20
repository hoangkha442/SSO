import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "https://192.168.1.101:1443";

export const useFetchUserInfo = () => {
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const result = await axios.get(`${baseURL}/realms/SSOPortal/protocol/openid-connect/userinfo`, config);
            setResponse(result.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch user information");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error, loading, fetchData };
};
