import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {QuoteInterface} from "@/shared/types/quote.interface";
import {CollabInterface} from "@/shared/types/collab.interface";


class CollabService {

    async getCollab(collabId: number) {
        const { data: collab } = await axiosClassic<CollabInterface>({
            url: API_URL.collab(`/${collabId}`),
            method: 'GET'
        })
        console.log(collab.user[0].User.userName)
        return collab
    }

    async findRandom() {
        const { data: quote } = await axiosClassic<QuoteInterface>({
            url: API_URL.quote(),
            method: 'GET'
        })
        console.log(quote);
        return quote
    }

    // async delete(chatId:number) {
    //     const { data: deletedChat } = await axiosWithAuth<IChat[]>({
    //         url: API_URL.chats(`/${chatId}/delete`),
    //         method: 'Patch'
    //     })
    //     return deletedChat || []
    // }
    //
    // async createDirectChat(friendId:number) {
    //     const { data: newDirectChat } = await axiosWithAuth<IChat[]>({
    //         url: API_URL.chats(`/create-direct/${friendId}`),
    //         method: 'Post'
    //     })
    //     return newDirectChat || []
    // }
    //
    // async createGroupChat(data:ICreateGroupChat) {
    //     const { data: newGroupChat } = await axiosWithAuth<ICreateGroupChat>({
    //         url: API_URL.chats(`/create-group`),
    //         method: 'Post'
    //     })
    //     return newGroupChat || []
    // }
    //
    // async addUserToChat(chatId: number,  data:IChangeMembersChat) {
    //     const { data: updatedChat } = await axiosWithAuth<IChangeMembersChat>({
    //         url: API_URL.chats(`/${chatId}/add`),
    //         method: 'Patch'
    //     })
    //     return updatedChat || []
    // }
    //
    // async removeUserToChat(chatId: number,  data:IChangeMembersChat) {
    //     const { data: updatedChat } = await axiosWithAuth<IChangeMembersChat>({
    //         url: API_URL.chats(`/${chatId}/remove`),
    //         method: 'Patch'
    //     })
    //     return updatedChat || []
    // }
    //
    // async updateLastMessage(chatId: number, lastMessage:string ) {
    //     const { data:  updatedChat} = await axiosWithAuth<IUpdateLastMessageChat>({
    //         url: API_URL.chats(`/${chatId}/lastMessage`),
    //         method: 'Put',
    //         data: { lastMessage } // Добавляем lastMessage в тело запроса
    //
    //     })
    //     return updatedChat || []
    // }



}

export const collabService = new CollabService()
