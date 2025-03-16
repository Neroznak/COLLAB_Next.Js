"use client"

import styles from "@/app/Main.module.scss";
import React, {useEffect, useState} from "react";
import {collabService, handleRequestError} from "@/services/collab.service";
import abstr from "../../public/assets/images/collabster2.png"
import Image from 'next/image';
import {FaTelegram, FaPatreon} from "react-icons/fa";
import ErrorComponent from "@/components/ErrorComponent";


export default function Home() {
    const [userName, setUserName] = useState("");
    const [referal, setReferal] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    // Проверка есть ли referal, если есть -> установили ref
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("referal");
        setReferal(ref);
    }, []);

    // Если есть ref -> делаем запрос на сервер
    useEffect(() => {
        const isReferalExist = async () => {
            if (referal) {
                try {
                    const response = await collabService.invite(referal);
                    const accessToken = response.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('isUserNew', "true");
                    window.location.href = `/collab/${response.collab.hash}`;
                } catch (error) {
                    const {errorCode, errorMessage400} = handleRequestError(error)
                    setErrorCode(errorCode);
                    setErrorMessage(errorMessage400);
                }
            }
        };
        isReferalExist();
    }, [referal]);



// Функция кнопки "Начать занятие
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!userName.trim()) {
            setError('Введите ник');
            return;
        }
        try {
            const response = await collabService.joinToCollab(userName);
            const accessToken = response.accessToken;
            localStorage.setItem('accessToken', accessToken);
            window.location.href = `/collab/${response.collabHash}`; // Редирект
        } catch (error) {
            const {errorCode, errorMessage400} = handleRequestError(error)
            setErrorCode(errorCode);
            setErrorMessage(errorMessage400);
        }
    }



    if (errorCode && errorMessage) {
        return <ErrorComponent code={errorCode} message400={errorMessage}/>;
    }


    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.logo}>Collabster</p>
                    <strong className={"ml-32 mt-4 text-sm"}>Предложить задание</strong>
                    <strong className={"ml-12 mt-4 text-sm"}>Идеи развития</strong>
                </div>
                <div className={styles.content}>
                    <div>
                        <span className={styles.big_text_black}>Интерактивный тренажёр по </span>
                        <span className={styles.big_text_blue}>TypeScript</span>
                        <span className={styles.big_text_black}> в команде</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={"w-full flex flex-col mt-2"}>
                            <input className={styles.input} placeholder={"Введите Ваше имя"} type="text"
                                   onChange={(e) => setUserName(e.target.value)}/>
                            <button type="submit"
                                    className={"mt-4 text-sm pt-2 w-44 pb-2 pl-8 pr-8 rounded-xl"}>Начать
                                занятие
                            </button>
                            {/* Сообщение об ошибке */}
                            {error && (
                                <p className="text-red-500 mt-2">{error}</p>
                            )}
                        </div>
                    </form>
                </div>
                <div className={styles.services}>
                    <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                        <FaTelegram size={40} className="text-blue-500"/>
                    </a>
                    <a href="https://www.patreon.com/yourpage" target="_blank" rel="noopener noreferrer"
                       className={"ml-16"}>
                        <FaPatreon size={40} className="text-red-500"/>
                    </a>
                </div>
            </div>
            <div className={styles.container}>
                <div className={"flex justify-center items-center mt-16"}>
                    <Image
                        src={abstr}
                        alt={"Collabster"}
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </main>
    )
}
;



