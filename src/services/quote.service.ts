import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {QuoteInterface} from "@/shared/types/quote.interface";


class QuoteService {

    async createQuote(data:QuoteInterface) {
        const { data: quote } = await axiosClassic<QuoteInterface>({
            url: API_URL.quote(``),
            method: 'POST'
        })
        return quote
    }

    async findRandom() {
        const { data: quote } = await axiosClassic<QuoteInterface>({
            url: API_URL.quote(),
            method: 'GET'
        })
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




}

export const quoteService = new QuoteService()
