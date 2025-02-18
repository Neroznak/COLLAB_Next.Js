import {Sidebar} from "./sidebar";
import {Card} from "@/components/ui/Card";
import styles from "./Dashboard.module.scss";
import {Header} from "./header";

export default function Dashboard() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
            <div className={"flex flex-col w-full h-full"}>
                <div className={"flex w-full h-12 border-b-2"}>
                    <Header/>
                </div>
                <main className={"flex flex-row w-full h-full "}>
                    <section className={styles.main_board}>
                        <div className={"ml-6 mt-6 bg-white h-52 rounded-3xl p-2"}>
                            <p className={"font-semibold text-2xl"}>Hello, Dmitrii!</p>
                        </div>
                        <div className={"flex h-2/3 "}>
                            <div className={styles.achievement}>
                                <div className={"ml-6 mt-2 mr-2 bg-white h-52 rounded-3xl p-2"}>Your achievements</div>
                                <div className={"ml-6 mt-2 mr-2 bg-white h-20 rounded-3xl p-2"}>Your mentor</div>
                                <div className={"ml-6 mt-2 mr-2 bg-white h-20 rounded-3xl p-2"}>Your mentee</div>
                            </div>
                            <div className={"flex w-1/2 "}>
                                <div className={"flex mb-6 ml-2 w-full mt-2 bg-white  rounded-3xl p-2"}>Collab's rating</div>
                            </div>
                        </div>
                    </section>
                    <section className={"flex flex-col h-full"}>
                            <div className={"ml-6 mt-6 w-96 bg-white h-2/3 rounded-3xl p-2"}>Calendar</div>
                            <p className={"ml-6 mt-4 mb-2 font-bold text-xl"}>Upcoming events</p>
                            <div className={"ml-6 mt-2 mr-2 bg-white h-10 rounded-3xl p-2"}>Event #1</div>
                            <div className={"ml-6 mt-2 mr-2 bg-white h-10 rounded-3xl p-2"}>Event #2</div>
                    </section>
                </main>
            </div>
        </div>
    )
};

