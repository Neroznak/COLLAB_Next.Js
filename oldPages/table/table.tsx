"use client"

import styles from "@/app/Main.module.scss";
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
                <div className={styles.header}>
                    <p className={zain.className}>Collabster</p>
                    <form action="">
                        <input className={styles.input} placeholder={"освой сложную тему с новой командой!"}
                               type="text"/>
                    </form>
                </div>
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
                    <Link href={"/collab/new"}>
                        <button className={" pt-1 pb-1 pl-2 pr-2"}>Создать collab</button>
                    </Link>
                </div>
                <div className={styles.collabs_fields}>
                    <Link href={"/collab"}>
                        <div className={styles.collab_first}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>



                    <Link href={"/collab"}>
                        <div className={styles.collab_last}>
                            <div className={"flex flex-col w-1/3"}>
                                <p className={styles.collab_name}>Анализ массива чисел</p>
                                <p className={"text-sm font-bold"}>Category: Typescript</p>
                            </div>
                            <div className={"flex flex-col w-1/4 text-xs"}>
                                <p className={"text-xs font-semibold"}>Сложность: High</p>
                                <p className={"text-xs font-semibold"}>Студентов: 4</p>
                                <p className={"text-xs font-semibold"}>Задача решается: 1 hour+</p>
                            </div>
                            <div className={"flex items-center text-xs"}>
                                <p className={"text-gray-500"}>Напиши функцию, которая принимает строку и
                                    подсчитывает количество гласных и
                                    согласных букв в ней. Возвращай объект с результатами.</p></div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
};

