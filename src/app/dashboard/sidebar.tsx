"use client"
import styles from "@/app/dashboard/Dashboard.module.scss";
import {FC} from 'react';
import Link from "next/link";

export const Sidebar: FC = () => {
    return (
         <div className={"flex w-full"}>
             <div className={styles.iconField}></div>
             <div className={"flex flex-col w-full h-full"}>
                 <div className={"flex font-bold text-white h-20 text-2xl w-full items-center justify-center"}>Collabster</div>
                 <nav className={"flex flex-col w-full "}>
                     <Link href="/dashboard"><div className={styles.active_sidebar}>Dashboard</div></Link>
                     <Link href="/courses"><div className={styles.passive_sidebar}>Courses</div></Link>
                     <Link href="/collab"><div className={styles.passive_sidebar}>Collab</div></Link>
                     <Link href="/settings"><div className={styles.passive_sidebar}>Settings</div></Link>
                 </nav>
                <div className={"flex mt-auto w-full h-20 text-white justify-center items-center"}>Log Out</div>
             </div>

         </div>
    )};


