import {Sidebar} from "../dashboard/sidebar";
import styles from "./Courses.module.scss";
import {Header} from "../dashboard/header";

export default function Courses() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
            <div className={"flex flex-col w-full h-full"}>
                <div className={"flex w-full h-12"}>
                    <Header/>
                </div>
                <main className={"flex flex-row w-full h-full "}>
                    <div className={"flex w-full bg-red-500"}>
                        <div className={"flex bg-green-500"}>
                            <div className={styles.search}></div>
                        </div>
                        <div className={styles.courses}>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>
                            <div className={styles.course}></div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
};

