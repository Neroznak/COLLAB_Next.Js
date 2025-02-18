import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import { API_URL } from '@/api/api.config'

import { IUser } from '@/shared/types/user.interface'

// Нужно прописать функцию для каждой функции в контроллере backend'а
class UserService {


     async getProfile() {
        const accessToken = localStorage.getItem('accessToken')
        const {data:user} = await axiosWithAuth<IUser>({
            url: API_URL.users('/profile'),
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })

        return user
    }

     async register() {
        const {data} = await axiosClassic<{ user: IUser, accessToken: string }>({
            url: API_URL.auth('/register'),
            method: 'POST'
        })

        return data
    }

}

export const userService = new UserService()
