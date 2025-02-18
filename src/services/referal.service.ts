import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {CollabInterface} from "@/shared/types/collab.interface";
import {IUser} from "@/shared/types/user.interface";
import {ReferalInterface} from "@/shared/types/referal.interface";

class ReferalService {

    // Надо убедиться что пригласительная ссылка действительна
    async isReferal(referal: string) {
        const { data: isReferal } = await axiosClassic<Boolean>({
            url: API_URL.referal(`/${referal}`),
            method: 'GET'
        })
        return isReferal;
    }

    async create(collabHash: string, userId: number) {
        const accessToken = localStorage.getItem("accessToken");
        const { data: referal } = await axiosWithAuth<ReferalInterface>({
            url: API_URL.referal(``),
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
            },
            data: {
                collabHash: collabHash,
                userId: userId
            }
        })
        return referal;
    }




}

export const referalService = new ReferalService()
