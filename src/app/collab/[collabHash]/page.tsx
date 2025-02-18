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
import {checkReferal, fetchCollab, handleSaveNickname} from "@/services/collab.service";

export default function Collab() {
    const [nickName, setNickName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [authUser, setAuthUser] = useState<IUser>();
    const collab = useRef<CollabInterface>();
    const [userLoaded, setUserLoaded] = useState(false);  // Флаг для отслеживания состояния загрузки пользователя
    const {collabHash} = useParams() as { collabHash: string };
    const {user} = useProfile() as { user: IUser };
    const searchParams = useSearchParams();
    const referal = searchParams.get("referal") ?? "";

    // Код срабатывает если в collab подключился неавторизированный user
    useEffect(() => {
        const verifyReferal = async () => {
            if (!user && referal) {
                const newUser = await checkReferal(referal, collabHash);
                setAuthUser(newUser);
                console.log("Новый user - ", newUser)
            }
        }
        verifyReferal();
    }, []);


    // Функция для получения данных о collab'е
    useEffect(() => {
        const getCollab = async () => {
            const newCollab = await fetchCollab(collabHash, setIsLoading);
            console.log("Мы валидировали user'а и выводим collab - ", JSON.stringify(newCollab));
            collab.current = newCollab;

        }
        getCollab();
    }, []);


    // Показываем заглушку, если данные ещё не загружены
    if (isLoading) return <p>Loading...</p>;
    if (!collab.current) return <p>Ошибка загрузки данных.</p>;

    return (
        <UserColorProvider>
            <main className={styles.wrapper}>
                <Sidebar collab={collab.current} user={user}/>
                <Content collab={collab.current} user={user}/>
                <Chat collab={collab.current} user={user}/>

                {user.userName == "" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-lg font-bold mb-4">Введите имя для входа</h2>
                            <input
                                type="text"
                                className="border p-2 rounded w-64"
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)} // Передаем правильное значение
                            />
                            <button
                                onClick={() => handleSaveNickname(nickName, user, setAuthUser)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Войти
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </UserColorProvider>
    )
}
