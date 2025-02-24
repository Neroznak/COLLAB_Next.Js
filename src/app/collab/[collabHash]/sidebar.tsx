"use client"

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";
import {Zain} from "@next/font/google";
import {CollabProps} from "@/shared/types/collab.interface";
import {useUserColor} from "@/app/collab/[collabHash]/UserColorContext";
import {useEffect, useState} from "react";
import {collabService} from "@/services/collab.service";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import {IUser} from "@/shared/types/user.interface";
import {io} from "socket.io-client";


const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});

export const Sidebar: React.FC<CollabProps> = ({collab, user}) => {
    const {getUserColor} = useUserColor();
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const socket = io('ws://localhost:5006/collab');         // Подключаемся к socket'у только один раз


    // EMIT - отправка события
    // ON - прослушивание события

    useEffect(() => {
        const socket = io('ws://localhost:5006/collab');         // Подключаемся к socket'у только один раз
        socket.emit('joinToCollab', collab.hash);
        socket.on('updateUsers', (updatedUsers) => {
            setUsers(updatedUsers);
        });
        return () => {
            socket.emit('leaveCollab', collab.hash);
            socket.disconnect();
        };
    }, [collab.hash]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        collabService.leaveFromCollab(collab.hash, user.id);
        localStorage.removeItem("accessToken");
        window.location.href = `/`; // Редирект
    }     // Функция срабатывает при попытке user'а выйти из collab'а


    console.log("users: ", JSON.stringify(users));


    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo_font}>
                <p className={zain.className}>Collabster</p>
            </div>
            <div className={styles.avatar_container}>
                {users.map((user) => {
                    return (
                        <div className={styles.avatar_block} key={user.id}>
                            <Avatar>
                                <AvatarImage src={user.profilePictureUrl}/>
                            </Avatar>
                            <p className={styles.over_text} style={{color: getUserColor(user.id)}}>
                                {user.userName}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className={" flex justify-center mb-2"}>
                <button onClick={() => setIsOpen(true)} className={"bg-transparent text-black justify-items-center"}>
                    <ArrowRightOnRectangleIcon className="w-6 h-6 "/>
                </button>
            </div>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="mb-4">Черчилль учил не сдаваться — ни в большом, ни в малом.</p>
                        <div className="flex justify-between gap-2 ml-10 mr-10">
                            <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-green-500 rounded">
                                Ты прав, у меня получится!
                            </button>
                            <button onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Не, без вариантов
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    )
}