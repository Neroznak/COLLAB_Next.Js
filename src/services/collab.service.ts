import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {CollabInterface} from "@/shared/types/collab.interface";
import {referalService} from "@/services/referal.service";
import {userService} from "@/services/user.service";

class CollabService {

    // Нужно получить информацию о collab'е с сервера при входе
    async getCollabByHash(collabHash: string, accessToken:string): Promise<CollabInterface> {
        const {data: collab} = await axiosWithAuth<CollabInterface>({
            url: API_URL.collab(`/${collabHash}`),
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })
        return collab
    }

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

    // User зашёл по пригласительной ссылке, он зарегистрирован, нужно добавить его в collab
    async addUserToCollab(userId: number, collabHash: string) {
        const accessToken = localStorage.getItem("accessToken");
        const {data: collab} = await axiosWithAuth<CollabInterface>({
            url: API_URL.collab(`/add`),
            method: 'POST',
            data: {
                userId: userId,
                collabHash: collabHash,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
        })
        return collab
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

// Функция получает collab по collabHash из параметра
export const getCollab = async (collabHash: string, setIsLoading: (isLoading: boolean) => void) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        console.error("Нет accessToken, невозможно загрузить collab");
        return;
    }
    try {
        setIsLoading(true);
        return await collabService.getCollabByHash(collabHash, accessToken);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    } finally {
        setIsLoading(false);
    }
};

//Функция проверит что ref ссылка правильная, зарегает user'а и добавит в collab
export const
    CreateAndAddGuestToCollab = async (referal: string, collabHash: string) => {
    try {
        const isReferal = await referalService.isReferal(referal);
        if (isReferal && collabHash) {
            const {user, accessToken} = await userService.register();
            localStorage.setItem('accessToken', accessToken);
            await collabService.addUserToCollab(user.id, collabHash);
            return user;
        } else console.error("Ссылка не подтверждена")
    } catch (err) {
        console.error("Ошибка проверки реферальной ссылки", err);
    }
};



export const collabService = new CollabService()
