'use client';

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import {useEffect, useState} from "react";
import * as React from "react"
import {useParams, useSearchParams} from "next/navigation";
import {IUser} from "@/shared/types/user.interface";
import {useProfile} from "@/hooks/useProfile";
import {UserColorProvider} from "@/app/collab/[collabHash]/UserColorContext";
import {Sidebar} from "@/app/collab/[collabHash]/sidebar";
import {Content} from "@/app/collab/[collabHash]/content";
import {Chat} from "@/app/collab/[collabHash]/chat";
import {collabService} from "@/services/collab.service";
import {userService} from "@/services/user.service";
import {CollabInterface} from "@/shared/types/collab.interface";
import Loading from "@/app/collab/[collabHash]/loading";

export default function Collab() {
    const [nickName, setNickName] = useState("");
    const {oldUser, isLoading} = useProfile() as { oldUser: IUser | null, isLoading: boolean };
    const {collabHash} = useParams() as { collabHash: string };
    const referal = useSearchParams().get("referal");
    const [isUserNewUse, setIsUserNew] = useState<boolean>(false);
    const [collab, setCollab] = useState<CollabInterface>();
    const [user, setUser] = useState<IUser>();



    // Получение данных страницы
    useEffect(() => {
        const getPageData = async () => {
            try {
                const {
                    collab,
                    user,
                    isUserNew,
                    accessToken
                } = await collabService.getCollabForUsers(collabHash, oldUser?.id, referal);
                if (isUserNew) localStorage.setItem("accessToken", accessToken);
                setIsUserNew(isUserNew);
                setCollab(collab);
                setUser(user);
            } catch (error) {
                console.error("Error fetching collab data:", error);
            } finally {
            }
        };
        if (!isLoading) getPageData();
    }, [isLoading]);

    if (!collab || !user) return Loading();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await userService.updateUserName(user.id, nickName);
        setIsUserNew(false);
    }


    return (
        <UserColorProvider>
            <main className={styles.wrapper}>
                <Sidebar collab={collab} user={user}/>
                <Content collab={collab} user={user}/>
                <Chat collab={collab} user={user}/>
                {isUserNewUse &&
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
    )
}
