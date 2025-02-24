import {CollabUserInterface, IUser} from "@/shared/types/user.interface";

export interface CollabInterface {
    id: number
    createdAt: Date
    name: string
    language: string
    isPassed: boolean
    taskId: number
    hash: string
    user: ICollabUser[]
}

export interface ICollabUser {
    id: number;
    userId: number;
    collabId: number;
    User: IUser; // Ссылка на объект пользователя
}


export interface CollabProps {
    collab: CollabInterface;
    user: IUser
}

export interface CollabPropsSidebar {
    collab: CollabInterface;
    user: IUser;
    users: CollabUserInterface[]
}

export interface getCollabResponse {
    collab: CollabInterface;
    isUserNew: boolean;
    user : IUser
}


