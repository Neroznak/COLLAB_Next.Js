import styles from "@/app/collab/Collab.module.scss";
import {Zain} from "@next/font/google";

const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});

export default function Collab() {
    return (
        <main className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <div className={styles.logo_font}>
                    <p className={zain.className}>Collabster</p>
                </div>
                <div className={"flex flex-col justify-center h-full gap-8 items-center"}>
                    <div className={styles.image_field}>Я</div>
                    <div className={styles.image_field}>Хуила</div>
                    <div className={styles.image_field}>Громила</div>
                    <div className={styles.image_field}>Пидрила</div>
                    <div className={styles.image_field}>Леонид</div>

                </div>
            </aside>
            <div className={styles.content}>
                <div className={"flex flex-col border-r bg-white w-full"}>
                    <div className={"flex flex-row justify-between w-full p-6 text-2xl font-bold"}>
                        <p>Задание №478329</p>
                        <button className={"h-8"}>К теории</button>
                    </div>
                    <div className={styles.task}>
                        <p>Напиши функцию, которая принимает строку и подсчитывает количество гласных и согласных букв в
                            ней. Возвращай объект с результатами.</p>

                    </div>
                    <div className={styles.black_field}>
                        <p className={"text-2xl font-bold"}>Черновик</p>
                        <form action="">
                            <input type="text" className={styles.input_black}/>
                        </form>
                    </div>
                    <div className={styles.result}>
                        <p className={"text-2xl font-bold"}>Решение</p>
                        <form action="">
                            <input type="text" className={styles.input_result}/>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.chat}>
                <div className={"flex bg-white w-full flex-col"}>
                    <div className={styles.message_field}>
                        Отправьте сообщение первыми!
                    </div>
                    <form action="" className={styles.send_field}>
                        <input type="text" className={styles.send_input} placeholder={"Напиши своему collab'у!"}/>
                    </form>

                </div>
            </div>
        </main>

    )
}
