'use client';

import styles from "@/app/collab/Collab.module.scss";
import {Zain} from "@next/font/google";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import Link from "next/link";
import AvatarWithMic from "@/components/ui/AvatarWithMic";
import {useEffect, useState} from "react";


const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});


export default function Collab() {

    const [micActive, setMicActive] = useState(false); // Изначально микрофон выключен

    useEffect(() => {
        // Проверка, что код выполняется только на клиенте
        if (typeof window !== "undefined") {
            const micIcon = document.getElementById("mic-icon");
            if (micIcon) {
                micIcon.addEventListener("click", () => setMicActive(prevState => !prevState));
            }
            return () => {
                if (micIcon) {
                    micIcon.removeEventListener("click", () => setMicActive(prevState => !prevState));
                }
            };
        }
    }, []);

    return (
        <main className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <div className={styles.logo_font}>
                    <p className={zain.className}>Collabster</p>
                </div>
                <div className={styles.avatar_container}>
                    <AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>
                    <AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>
                    <AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>
                    <AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>
                    <AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>
                </div>
                <Link href={"/"}>
                    <div className={"flex mt-auto mb-4 justify-center w-full text-white "}><p>Сдаться</p></div>
                </Link>
            </aside>
            <div className={styles.content}>
                <div className={"flex flex-col border-r w-full"}>
                    <div className={"flex flex-row justify-between w-full p-6 text-2xl font-bold"}>
                        <p>Задание №1</p>
                        <button className={"h-8"}>К теории</button>
                    </div>
                    <div className={styles.task}>
                        <p>Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое задание
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиев
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиевв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                            Здесь описано некое заданиеввв
                        </p>


                    </div>
                    <div className={styles.result}>
                        <p className={"text-2xl font-bold mb-2"}>Решение</p>
                        <CodeMirror
                            value="console.log('hello world!');"
                            className={"overflow-x-auto border rounded-2xl"}
                            minHeight="300px"
                            maxHeight="450px"
                            extensions={[javascript({jsx: true})]}
                            onChange={(value, viewUpdate) => {
                                console.log("value:", value);
                            }}
                        />
                        <button className={"mt-2 w-24"}>Go</button>
                    </div>

                </div>
            </div>
            <div className={styles.chat}>
                <div className={"flex bg-white w-full flex-col"}>
                    <div className={styles.message_field}>
                        Поделитесь идеями
                    </div>
                    <form action="" className={styles.send_field}>
                        <input type="text" className={styles.send_input} placeholder={"Напиши своему collab'у!"}/>
                    </form>

                </div>
            </div>
        </main>

    )
}
