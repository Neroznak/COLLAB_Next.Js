import {axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'

import {IUser} from '@/shared/types/user.interface'

class UserService {

    async getProfile() {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) return null;
        const {data: user} = await axiosWithAuth<IUser>({
            url: API_URL.users('/profile'),
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })

        return user
    }


    async updateUserName(userId: number, userName: string) {
        const accessToken = localStorage.getItem('accessToken');
        const {data} = await axiosWithAuth<{ user: IUser }>({
            url: API_URL.users(`/${userId}`),
            method: 'PATCH',
            data: {
                userName: userName
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })
        return data.user
    }

}

export const userService = new UserService();
