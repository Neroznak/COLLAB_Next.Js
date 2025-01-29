"use client"

import styles from "@/app/collab/[collabId]/Collab.module.scss";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import * as React from "react";
import {Zain} from "@next/font/google";
import {useEffect, useState} from "react";
import {CollabInterface, CollabProps} from "@/shared/types/collab.interface";
import {collabService} from "@/services/collab.service";
import {useParams} from "next/navigation";
import {io} from "socket.io-client";
import {IMessage} from "@/shared/types/message.interface";
import {messageService} from "@/services/message.service";


export const Chat: React.FC<CollabProps> = ({collab}) => {
    const socket = io('http://192.168.18.3:5006/messages'); // Замените это убожество


    const [messages, setMessages] = useState<IMessage[]>([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await messageService.getMessagesByCollab(collab.id);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error);
            }
        };
        fetchMessages();
    }, []);

    //Сокет для мгновенного отображения сообщений в чате
    useEffect(() => {
        // Обработка получения нового сообщения
        socket.on('sendMessage', (newMessage: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Очистка обработчика при размонтировании
        return () => {
            socket.off('sendMessage');
        };
    }, []);

    // const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (socket && content.trim()) {
    //         const messageData = {
    //             content,
    //             userId: user.id,
    //             collabId: collab.id
    //         };
    //         socket.emit('newMessage', messageData);
    //         updateMessage (content);
    //         setContent('');
    //     }
    // };
    // <form className={styles.send_field} onSubmit={handleSendMessage}>


        return (
        <div className={styles.chat}>


            <div className={styles.chat_header}>
                <p className={"text-2xl font-bold"}>Collab</p>
                <button className={"mt-2 w-24 h-8"}>Пригласить</button>
            </div>
            <div className={styles.message_field}>
                {messages.length <= 0 ? (
                    <p>Отправьте первое сообщение</p>
                ) : (messages.map(message => (

                    <div className={styles.message_block}>
                        {message.content}
                    </div>
                )))}
            </div>
            <form className={styles.send_field} >
                <input
                    className={styles.input}
                    placeholder="Type a message"
                    contentEditable
                />
            </form>
        </div>
        )
        }