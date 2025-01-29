export interface IMessage {
    messageId: number;
    userId: number;
    content: string;
}

export interface MessagesProps {
    collabId: number;
    userId: number
}

// export interface IUserChatCreate extends Pick <IUserChat, 'User'> {} Если надо выбрать только одно поле
// export interface IUserChatCreate extends Omit <IUserChat, 'id | 'User'> {} Если надо исключить только одно поле