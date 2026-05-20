import axios from "axios"
import { useState } from "react"

export const baseURL = "https://192.168.1.101:1443/admin/realms/SSOPortal/"


type Props = {
    data: any,
    endpoint: string
}


export const useUpdate = () => {
    const [updateResponse, setResponse] = useState<any>(null)
    const token = localStorage.getItem('token')


    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'

        },
    }
    const update = async (props: Props) => {
        axios.put(`${baseURL}${props.endpoint}`, JSON.stringify(props.data), config).then((res) => {
            setResponse(res)
        }).catch((error: any) => {
            console.log(error);
            setResponse(error.message)
        })
    }

    return { update, updateResponse }
}