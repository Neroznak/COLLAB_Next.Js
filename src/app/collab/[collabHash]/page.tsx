"use client";

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import {useEffect, useState} from "react";
import * as React from "react";
import {useParams} from "next/navigation";
import {IUser} from "@/shared/types/user.interface";
import {useProfile} from "@/hooks/useProfile";
import {UserColorProvider} from "@/app/collab/[collabHash]/UserColorContext";
import {Sidebar} from "@/app/collab/[collabHash]/sidebar";
import {Content} from "@/app/collab/[collabHash]/content";
import {Chat} from "@/app/collab/[collabHash]/chat";
import {collabService, handleRequestError} from "@/services/collab.service";
import {userService} from "@/services/user.service";
import {CollabInterface} from "@/shared/types/collab.interface";
import Loading from "@/app/collab/[collabHash]/loading";
import ErrorComponent from "@/components/ErrorComponent";

export default function Collab() {
    const [nickName, setNickName] = useState("");
    const {user, isLoading} = useProfile() as { user: IUser | null, isLoading: boolean };
    const [collab, setCollab] = useState<CollabInterface>();
    const params = useParams();
    const collabHash = Array.isArray(params?.collabHash) ? params.collabHash[0] : params?.collabHash || "";
    const [isUserNew, setIsUserNew] = useState(false);
    const [isClient, setIsClient] = useState(false);  // Флаг для проверки клиента
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    // Проверяем, что мы на клиенте
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Загружаем данные из localStorage только на клиенте
    useEffect(() => {
        if (isClient) {
            setIsUserNew(localStorage.getItem('isUserNew') === "true");
        }
    }, [isClient]);

    // Получение данных страницы
    useEffect(() => {
        const getCollabData = async () => {
            try {
                const collab = await collabService.getCollab(collabHash);
                setCollab(collab);
            } catch (error) {
                const {errorCode, errorMessage400} = handleRequestError(error)
                setErrorCode(errorCode);
                setErrorMessage(errorMessage400);
            }
        };
        if (!isLoading) getCollabData();
    }, [isLoading]);

    // Обновление имени пользователя
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (user) {
            e.preventDefault();
            try {
                await userService.updateUserName(user.id, nickName);
                localStorage.setItem('isUserNew', "false");
                setIsUserNew(false);
            } catch (error) {
                const {errorCode, errorMessage400} = handleRequestError(error)
                setErrorCode(errorCode);
                setErrorMessage(errorMessage400);
            }
        }
    }

    if (!isClient) {
        return null; // Пока не клиент, не рендерим компонент
    }

    if (errorCode && errorMessage) {
        return <ErrorComponent code={errorCode} message400={errorMessage} />;
    }

    return (

        <UserColorProvider>
            <main className={styles.wrapper}>
                {collab && user ? (
                    <>
                        <Sidebar collab={collab} user={user}/>
                        <Content collab={collab} user={user}/>
                        <Chat collab={collab} user={user}/>
                    </>
                ) : (
                    <Loading/>
                )}
                {isUserNew &&
                    (<div
                        className="fixed inset-0 flex items-center justify-center bg-white border-b bg-opacity-50 z-50">
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-lg font-bold mb-4">Введите имя для входа</h2>
                            <input
                                type="text"
                                className="border p-2 rounded w-64"
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)} // Передаем правильное значение
                            />
                            <button
                                onClick={handleSubmit}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Войти
                            </button>
                        </div>
                    </div>)}
            </main>
        </UserColorProvider>

    );
}
