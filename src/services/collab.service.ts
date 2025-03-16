import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import axios from "axios";
import {CollabInterface} from "@/shared/types/collab.interface";


class CollabService {


    async joinToCollab(userName: string) {
        const createUserDto = {
            userName: userName,
        };
        const {data: collab} = await axiosClassic({
            url: API_URL.collab(`/join`),
            method: "POST",
            data: createUserDto,
        });
        return collab;
    }

    async invite(referal: string) {
        const {data} = await axiosClassic({
            url: API_URL.collab("/invite"),
            method: 'POST',
            data: {
                referal: referal
            }
        })
        return data;
    }

    async getCollab(collabHash: string): Promise<CollabInterface> {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosWithAuth<CollabInterface>({
            url: API_URL.collab(`/${collabHash}`),
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`},
        });
        return response.data;

    }


    // User желает покинуть collab
    async leaveFromCollab(collabHash: string, userId: number) {
        const accessToken = localStorage.getItem("accessToken");
        await axiosWithAuth<void>({
            url: API_URL.collab(`/${collabHash}/leave`),
            method: 'DELETE',
            data: {
                collabHash: collabHash,
                userId: userId,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })
    }




}

export const collabService = new CollabService()

export function handleRequestError(error: unknown) {
    let errorCode;
    let errorMessage400;
    if (axios.isAxiosError(error)) {
        if (error.response) {
         errorCode =     error.response.status;
            errorMessage400 =    error.response.data.message;
        } else {
            errorCode =  500;
            errorMessage400 = "";

        }
    } else if (error instanceof Error) {
        errorCode =  Number(error.message);
        errorMessage400 = "";

    } else {
        errorCode =  500;
        errorMessage400 = "";
    }
    return {errorCode, errorMessage400};
}
