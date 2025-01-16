"use client"

import styles from "@/app/main/Main.module.scss";
import {Zain} from '@next/font/google';
import Link from "next/link";
import React, {useState} from "react";


const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['800'], // Укажите нужные веса шрифта
});


export default function Main() {
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [activeButton2, setActiveButton2] = useState<number | null>(null);
    const handleButtonClick = (index: number) => {
        setActiveButton(index); // Устанавливаем индекс активной кнопки
    };
    const handleButtonClick2 = (index2: number) => {
        setActiveButton2(index2); // Устанавливаем индекс активной кнопки
    };
    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                <p className={"mt-16 text-sm"}>Тот, кто делает всё сам, и получает всё сам. Но тот, кто делится, выигрывает
                    вдвойне.</p>
                <div className={styles.header}>
                    <p className={zain.className}>Collabster</p>
                </div>
                <p className={"text-xs"}>Выбери направление и свой уровень подготовки и начни заниматься с новыми друзьями! </p>
                <div className={styles.categories}>
                    {["Typescript", "Python", "Математика", "Физика", "Логика"].map((buttonText, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={` ${
                                activeButton === index ? styles.category_active : styles.category
                            }`}
                        >
                            {buttonText}
                        </button>
                    ))}
                </div>
                <div className={"flex flex-row justify-between"}>
                    <div className={styles.hardness}>
                        {["Простые", "Средние", "Сложные"].map((buttonText, index2) => (
                            <button
                                key={index2}
                                onClick={() => handleButtonClick2(index2)}
                                className={` ${
                                    activeButton2 === index2 ? styles.category_active : styles.category
                                }`}
                            >
                                {buttonText}
                            </button>
                        ))}
                    </div>


                </div>
                <form action="">
                    <input className={styles.input} placeholder={"Введите Ваше имя"}
                           type="text"/>
                </form>
                <Link href={"/collab"}>
                    <button className={"mt-4 pt-1 pb-1 pl-2 pr-2"}>Начать занятие</button>
                </Link>
                <div className={"flex mt-auto mb-4 gap-4"}>
                    <p>Telegram</p>
                    <p>Boosty</p>
                    <p>Patreon</p>
                </div>
            </div>
        </main>
    )
};

