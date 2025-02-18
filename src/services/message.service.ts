import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {IMessage} from "@/shared/types/message.interface";

// Нужно прописать функцию для каждой функции в контроллере backend'а
class MessageService {

    async getMessagesByCollab(collabHash:string) {
        const accessToken = localStorage.getItem("accessToken")
        const { data: messages } = await axiosClassic<IMessage[]>({
            url: API_URL.messages(`/${collabHash}`),
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })
        return messages || []
    }
}

export const messageService = new MessageService()
