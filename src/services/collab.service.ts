import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {getCollabResponse} from "@/shared/types/collab.interface";
import axios from "axios";


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

    // Нужно получить информацию о collab'е с сервера при входе

    async getCollabForUsers(collabHash: string, userId: number | undefined, referal: string | null) {
        try {
            const {data} = await axiosClassic({
                url: API_URL.collab("/get"),
                method: 'POST',
                data: {
                    collabHash: collabHash,
                    userId: userId,
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
                }  else if (status === 400) {
                    return error.response?.statusText;
                } else if (status === 401) {
                    return error.response?.statusText;
                }

            }
            throw error; // Пробрасываем ошибку, если она другая
        }
    }

    // User желает покинуть collab
    async leaveFromCollab(collabHash: string, userId: number) {
        const accessToken = localStorage.getItem("accessToken");
        await axiosWithAuth<void>({
            url: API_URL.collab(`/leave`),
            method: 'POST',
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
