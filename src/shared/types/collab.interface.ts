import {IUser} from "@/shared/types/user.interface";

export interface CollabInterface {
    id: number
    name: string
    language: string
    isPassed: boolean
    taskId: number
    user: ICollabUser[]
}

export interface ICollabUser {
    id: number;
    userId: number;
    collabId: number;
    User: IUser; // Ссылка на объект пользователя
}


export interface CollabProps {
    collab: CollabInterface; // Пропс должен быть объектом типа CollabInterface
}


