import {Sidebar} from "@/app/dashboard/sidebar";
import {Card} from "@/components/ui/Card";
import styles from "@/app/dashboard/Dashboard.module.scss";
import {Header} from "@/app/dashboard/header";

export default function Dashboard() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
            <div className={"flex flex-col w-full h-full"}>
                <div className={"flex w-full h-12 bg-blue-500"}>
                    <Header/>
                </div>
                <main className={"flex flex-row w-full h-full "}>
                    COURSES PAGE
                </main>
            </div>
        </div>
    )
};

