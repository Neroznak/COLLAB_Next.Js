export interface IUser {
    id: number,
    userName: string,
    profilePictureUrl: string,
}


export interface CollabUserInterface {
    id: number,
    collabHash: string,
    userId: number,
    User: IUser[],
}