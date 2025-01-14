import styles from "@/app/collab/Collab.module.scss";
import {Zain} from "@next/font/google";
import {Header} from "@/app/dashboard/header";

const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});

export default function Collab() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.sidebar}>
                <p className={zain.className}>Collabster</p>
            </div>
            <section>
                <Header />
                <div className={"flex w-full h-full"}>
                    <div className={styles.theory}>
                        <div className={"flex bg-white h-full rounded-2xl p-4 ml-8 mt-4"}>Писька-банга</div>
                    </div>
                    <div className={styles.chat}>2</div>
                </div>
            </section>
        </main>

    )
}
