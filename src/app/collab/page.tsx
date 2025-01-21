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
                    <div className={"flex mt-auto mb-4 justify-center w-full text-black text-sm "}><p>04:24</p></div>
                    <div className={"flex mt-auto mb-4 justify-center w-full text-black text-sm "}><p>Сдаться</p></div>
                </Link>
            </aside>
            <div className={styles.content}>
                <div className={"flex flex-col border-r w-full"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex"}>
                            <p className={"pl-4 font-bold  pt-2 text-xs text-gray-400"}>TypeScript / Junior / </p>
                            <p className={"pl-1  font-bold  pt-2 text-xs"}>Циклы</p>
                        </div>
                        <button className={"h-8 font-light mr-2 mt-2"}>К теории</button>
                    </div>
                    <div className={"flex flex-col pl-4"}>
                        <p className={"flex flex-wrap text-2xl font-bold"}>Task №46432</p>
                        <p className={"flex text-gray-500 text-xs"}>Автор задания: Google interview, Develop department</p>
                    </div>
                    <div className={styles.task}>
                        <p className={"flex"}>Цель: Написать программу на TypeScript, которая использует различные типы циклов для решения практических задач.
                            Описание:
                            Создайте массив из 10 случайных чисел (в диапазоне от 1 до 100).
                            Используя циклы for, while, и do...while, выполните следующие действия:
                            Суммируйте все числа в массиве.

                        </p>
                    </div>
                    <div className={styles.result}>
                        <p className={"text-2xl font-bold mb-2 "}>Answer</p>
                        <CodeMirror
                            value="console.log('hello world!');"
                            className={"overflow-x-auto border bg-violet-200 rounded-2xl "}
                            minHeight="300px"
                            maxHeight="450px"
                            extensions={[javascript({jsx: true})]}
                            onChange={(value, viewUpdate) => {
                                console.log("value:", value);
                            }}
                        />
                        <button className={"mt-2 w-16 text-sm h-8 font-light"}>Go</button>
                    </div>

                </div>
            </div>
            <div className={styles.chat}>
                <div className={"flex w-full flex-col"}>
                    <div className={styles.chat_header}>
                        <p className={"text-2xl font-bold"}>Collab</p>
                        <button className={"mt-2 w-24 h-8"}>Пригласить</button>
                    </div>
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
