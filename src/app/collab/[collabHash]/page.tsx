'use client';

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import {useEffect, useRef, useState} from "react";
import * as React from "react"
import {useParams, useSearchParams} from "next/navigation";
import {CollabInterface} from "@/shared/types/collab.interface";
import {IUser} from "@/shared/types/user.interface";
import {useProfile} from "@/hooks/useProfile";
import {UserColorProvider} from "@/app/collab/[collabHash]/UserColorContext";
import {Sidebar} from "@/app/collab/[collabHash]/sidebar";
import {Content} from "@/app/collab/[collabHash]/content";
import {Chat} from "@/app/collab/[collabHash]/chat";
import {CreateAndAddGuestToCollab, getCollab} from "@/services/collab.service";
import {userService} from "@/services/user.service";

export default function Collab() {
    const [nickName, setNickName] = useState("");
    const [isLooading, setIsLoading] = useState(true);
    const [authUser, setAuthUser] = useState<IUser>();
    const collab = useRef<CollabInterface>();
    const [userLoaded, setUserLoaded] = useState(false);  // Флаг для отслеживания состояния загрузки пользователя

    const {collabHash} = useParams() as { collabHash: string };
    const {user, isLoading} = useProfile() as { user: IUser, isLoading: boolean };
    const referal = useSearchParams().get("referal") ?? "";


    // Код срабатывает если в collab подключился неавторизированный user
    useEffect(() => {
        if (userLoaded) return; // Проверка. Если user уже загружен - не нужно выполнять эту функцию
        (async () => {
            if (!user && referal) { // авторизированного user'а нет, но есть referal ссылка
                setAuthUser(await CreateAndAddGuestToCollab(referal, collabHash));
            }
            setUserLoaded(true);
        })();
    }, []);

    useEffect(() => {
        if (!userLoaded) return; // Не загружать collab пока не получен user
        (async () => {
            collab.current = await getCollab(collabHash, setIsLoading);
        })();
    }, [userLoaded]);

    if (isLooading) return <p>Loading...</p>;
    if (isLoading) return <div>Loading...</div>;
    if (!collab.current) return <p>Ошибка загрузки данных.</p>;

    return (
        <UserColorProvider>
            <main className={styles.wrapper}>
                <Sidebar collab={collab.current} user={user}/>
                <Content collab={collab.current} user={user}/>
                <Chat collab={collab.current} user={user}/>
                {authUser?.userName == "User" &&
                (<div className="fixed inset-0 flex items-center justify-center bg-white border-b bg-opacity-50 z-50">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-lg font-bold mb-4">Введите имя для входа</h2>
                        <input
                            type="text"
                            className="border p-2 rounded w-64"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)} // Передаем правильное значение
                        />
                        <button
                            onClick={() => userService.updateUserName(user.id, nickName, setAuthUser)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Войти
                        </button>
                    </div>
                </div>)}
            </main>
        </UserColorProvider>
    )
}
