"use client"

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {CollabProps} from "@/shared/types/collab.interface";
import {IMessage} from "@/shared/types/message.interface";
import {io, Socket} from "socket.io-client";
import {messageService} from "@/services/message.service";
import {useUserColor} from "@/app/collab/[collabHash]/UserColorContext";
import {referalService} from "@/services/referal.service";
import {API_URL} from "@/api/api.config";

export const Chat: React.FC<CollabProps> = ({collab, user}) => {
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [referalLink, setReferalLink]  = useState("")

    const {getUserColor} = useUserColor();

    // Подключение к сокету и прослушка сообщений
    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io('ws://localhost:5006/messages');

            // Обработка получения нового сообщения
            socketRef.current.on('sendMessage', (sendMessage: IMessage) => {
                setMessages((prevMessages) => [...prevMessages, sendMessage]);
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    // Отмотка сообщения вниз
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'auto'});
        }
    }, [messages]);

    // Отправка сообщения через socket.io
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socketRef.current && content.trim()) {
            const messageData = {
                content,
                userId: user.id,
                collabHash: collab.hash
            };
            socketRef.current.emit('newMessage', messageData);
            setContent('');
        }
    };

    // Загрузка сообщений collab'а
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await messageService.getMessagesByCollab(collab.hash);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error);
            }
        };
        fetchMessages();
    }, []);

    const handleInvite = async () => {
        console.log("Доходим до открытия")
        setIsOpen(true)
        const referal = await referalService.create(collab.hash, user.id);
        const generatedReferal = referal.referal;
        setReferalLink(`http://localhost:3001/collab/${collab.hash}?referal=${generatedReferal}`);
    }


    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referalLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Ошибка копирования", err);
        }
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chat_header}>
                <p className={"text-2xl font-bold"}>Collab</p>
                <button onClick={() => handleInvite()} className={"mt-2 w-24 h-8"}>Пригласить</button>
            </div>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                     onClick={() => setIsOpen(false)}>
                    <div className="bg-white p-6 rounded shadow-lg"
                         onClick={(e) => e.stopPropagation()}
                    >
                        <p className="mb-4">Скопируйте ссылку ниже и отправьте её другу</p>
                        <div className="flex flex-col justify-between gap-2 ml-10 mr-10">
                            <input
                                type="text"
                                value={referalLink}
                                readOnly
                                className="border-none bg-transparent outline-none w-full"
                            />
                            <button onClick={copyToClipboard} className="px-4 py-2 bg-green-500 rounded">
                                {copied ? "Скопировано!" : "Копировать"}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className={styles.message_field}>
                {messages.length <= 0 ? (
                    <div className={"flex w-full h-full items-center justify-center text-center"}>
                        <p>Начните диалог!</p>
                    </div>
                ) : (messages.map(message => (

                    <div className={styles.message_block}>
                        <p className={"font-bold"}
                           style={{color: getUserColor(message.userId)}}>{message.user.userName}</p>
                        <p>{message.content}</p>
                    </div>


                )))}
                <div ref={messagesEndRef}/>
            </div>
            <form className={styles.send_field} onSubmit={handleSendMessage}>
                <input
                    className={styles.input}
                    placeholder="Type a message"
                    value={content}
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                />
            </form>
        </div>
    )
}