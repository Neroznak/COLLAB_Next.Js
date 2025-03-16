import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {AttemptInterface} from "@/shared/types/attempt.interface";

class AttemptService {

    async execute(userAnswer:string, collabHash: string, userId: number): Promise<AttemptInterface> {
        const accessToken = localStorage.getItem('accessToken')
        const { data: attempt } = await axiosWithAuth<AttemptInterface>({
            url: API_URL.attempt(`/`),
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
            data: {
                userAnswer: userAnswer,
                collabHash: collabHash,
                userId: userId,
            }
        })
        return attempt
    }

}

export const attemptService = new AttemptService()
