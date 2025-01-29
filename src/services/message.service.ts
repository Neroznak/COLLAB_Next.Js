import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {IMessage} from "@/shared/types/message.interface";

// Нужно прописать функцию для каждой функции в контроллере backend'а
class MessageService {

    async getMessagesByCollab(collabId:number) {
        const { data: messages } = await axiosClassic<IMessage[]>({
            url: API_URL.messages(`/${collabId}`),
            method: 'GET'
        })
        console.log(messages)
        return messages || []
    }
}

export const messageService = new MessageService()
