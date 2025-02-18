import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {CollabInterface} from "@/shared/types/collab.interface";
import {IUser} from "@/shared/types/user.interface";
import {referalService} from "@/services/referal.service";
import {userService} from "@/services/user.service";
import {BiMessageError} from "react-icons/bi";

class CollabService {

    // Нужно получить информацию о collab'е с сервера при входе
    async getCollabByHash(collabHash: string): Promise<CollabInterface> {
        const accessToken = localStorage.getItem('accessToken');
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
        const {data: isReferal} = await axiosWithAuth<void>({
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
export const fetchCollab = async (collabHash: string, setIsLoading: (isLoading: boolean) => void) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("в нужной функции accesstoken такой: - ", accessToken)
    if (!accessToken) {
        console.error("Нет accessToken, невозможно загрузить collab");
        return;
    }
    try {
        setIsLoading(true);
        return await collabService.getCollabByHash(collabHash);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    } finally {
        setIsLoading(false);
    }
};

//Функция проверит что ref ссылка правильная, зарегает user'а и добавит в collab
export const checkReferal = async (referal: string, collabHash: string) => {
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

//После того как пользователь введёт имя - оно изменится на сервере
export const handleSaveNickname = async (nickName: string, authUser: IUser,
                                         setAuthUser: (user: IUser) => void) => {
    try {
        if (nickName && authUser) {
            const response = await fetch(API_URL.users(`/${authUser.id}`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userName: nickName}),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthUser(data);
            } else {
                console.error("Ошибка отправки формы");
            }
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
};

export const collabService = new CollabService()
