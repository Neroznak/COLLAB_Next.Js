import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import axios from "axios";
import {CollabInterface} from "@/shared/types/collab.interface";


class CollabService {
    // Зачисляет нового пользователя в collab
    async joinToCollab(userName: string, getTaskDto: any) {
        const requestBody = {
            createUserDto: {userName},
            getTaskDto: getTaskDto,
        };
        const {data: collab} = await axiosClassic({
            url: API_URL.collab(`/join`),
            method: "POST",
            data: JSON.stringify(requestBody),
        });
        return collab;
    }


    // async getCollabForUsers(collabHash: string, userId: number | undefined, referal: string | null) {
    //     try {
    //         const {data} = await axiosClassic({
    //             url: API_URL.collab("/get"),
    //             method: 'POST',
    //             data: {
    //                 collabHash: collabHash,
    //                 userId: userId,
    //                 referal: referal
    //             }
    //         })
    //         return data;
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             const status = error.response?.status;
    //             if (status === 403) {
    //                 // Обработка 403 Forbidden
    //                return 403;
    //             } else if (status === 404) {
    //                 // Обработка 404 Not Found
    //                 return 404;
    //             }  else if (status === 400) {
    //                 return error.response?.statusText;
    //             } else if (status === 401) {
    //                 return error.response?.statusText;
    //             }
    //
    //         }
    //         throw error; // Пробрасываем ошибку, если она другая
    //     }
    // }


    async invite(referal: string) {
        try {
            const {data} = await axiosClassic({
                url: API_URL.collab("/invite"),
                method: 'POST',
                data: {
                    referal: referal
                }
            })
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                if (status === 403) {
                    // Обработка 403 Forbidden
                    return 403;
                } else if (status === 404) {
                    // Обработка 404 Not Found
                    return 404;
                } else if (status === 400) {
                    return error.response?.statusText;
                } else if (status === 401) {
                    return error.response?.statusText;
                }
            }
            throw error; // Пробрасываем ошибку, если она другая
        }
    }

    async getCollab(collabHash: string): Promise<CollabInterface> {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axiosWithAuth<CollabInterface>({
                url: API_URL.collab(`/${collabHash}`),
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error.response?.status || new Error("Unknown error"); // Пробрасываем статус ошибки
            }
            throw new Error("Unexpected error");
        }
    }


    // User желает покинуть collab
    async leaveFromCollab(collabHash: string, userId: number) {
        const accessToken = localStorage.getItem("accessToken");
        await axiosWithAuth<void>({
            url: API_URL.collab(`/leave`),
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
