import styles from "./Collab-New.module.scss";
import {Zain} from '@next/font/google';
import Link from "next/link";


const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['800'], // Укажите нужные веса шрифта
});


export default function NewCollab() {

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Link href={"/main"}><p className={zain.className}>Collabster</p></Link>

                    </div>

                    <div className={styles.collabs_fields}>
                        <div className={"flex justify-between"}>
                            <p className={"font-bold text-2xl"}>New collab</p>
                            <Link href={"/collab/new"}>
                                <button className={"mr-8 pt-1 pb-1 pl-2 pr-2"}>Создать</button>
                            </Link>
                        </div>
                        <form action="" className={"flex flex-col gap-2"}>
                            <div className={"flex items-center"}>
                                <label htmlFor="" className={styles.label}>Категория</label>
                                <input type="text" className={styles.input}/>
                            </div>
                            <div className={"flex "}>
                                <label htmlFor="" className={styles.label}>Тема</label>
                                <input type="text" className={styles.input}/>
                            </div>
                            <div className={"flex "}>
                                <label htmlFor="" className={styles.label}>Сложность</label>
                                <input type="text" className={styles.input}/>
                            </div>
                            <div className={"flex "}>
                                <label htmlFor="" className={styles.label}>Max кол-во студентов</label>
                                <input type="text" className={styles.input}/>
                            </div>
                            <label htmlFor="">Условие задания</label>
                            <input type="text" className={styles.input_uslov}/>
                            <label htmlFor="">Теория</label>
                            <input type="text" className={styles.input_teor}/>
                            <label htmlFor="">Решение (необязательно)</label>
                            <input type="text" className={styles.input_answer}/>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
};

