import {Sidebar} from "@/app/dashboard/sidebar";
import {Card} from "@/components/ui/Card";
import styles from "@/app/main/Main.module.scss";
import {Header} from "@/app/dashboard/header";
import {Zain} from '@next/font/google';
import {Button} from "@/components/ui/Button";
import Link from "next/link";

const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});


export default function Main() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.logo}>
                <p className={zain.className}>Collabster</p>
            </div>
            <div className={styles.container}>
                <form action="" className={styles.search}>
                    <input type={"text"} className={styles.input_searh}/>
                    <input type={"text"} className={styles.input_searh}/>
                    <button className={styles.go}>Go!</button>
                    <Link href={"/collab/new"}>
                        <button className={styles.create_collab}>Create new Collab</button>
                    </Link>
                </form>
                <div className={styles.collabs_fields}>
                    <p className={"mt-6 font-bold text-2xl"}>Free collabs</p>
                    <Link href={"/collab"}>
                        <div className={styles.collab}>
                            <p>Collab name</p>
                            <p>Category:</p>
                            <p>Topic:</p>
                            <p>Collabers:</p>
                        </div>
                    </Link>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                    <div className={styles.collab}>
                        <p>Collab name</p>
                        <p>Category:</p>
                        <p>Topic:</p>
                        <p>Collabers:</p>
                    </div>
                </div>
            </div>
        </main>
    )
};

