import axios from "axios";
import { useState } from "react";

const baseURL = "https://192.168.1.101:1443";

export const useUpdate = () => {
    const [updateResponse, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const update = async ({ data, endpoint }: { data: any, endpoint: string }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const result = await axios.put(`${baseURL}${endpoint}`, JSON.stringify(data), config);
            setResponse(result.data);
        } catch (err: any) {
            setError(err.message || "Failed to update user information");
        }
    };

    return { update, updateResponse, error };
};
