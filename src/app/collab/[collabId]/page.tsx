'use client';

import styles from "@/app/collab/[collabId]/Collab.module.scss";
import {useEffect, useState} from "react";
import * as React from "react"
import {useParams} from "next/navigation";
import {CollabInterface} from "@/shared/types/collab.interface";
import {collabService} from "@/services/collab.service";
import {Sidebar} from "@/app/collab/[collabId]/sidebar";
import {Content} from "@/app/collab/[collabId]/content";
import {Chat} from "@/app/collab/[collabId]/chat";


export default function Collab() {
    const {collabId} = useParams(); // Извлекаем параметр collabId
    const [collab, setCollab] = useState<CollabInterface>();
    useEffect(() => {
        const fetchCollab = async () => {
            try {
                const fetchedCollab = await collabService.getCollab(+collabId);

                if (fetchedCollab) {
                    setCollab(fetchedCollab); // Убедитесь, что объект загружен
                } else {
                    console.error("Ошибка: fetchedCollab вернул undefined или null.");
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchCollab();
    }, [collabId]);
    if (!collab) {
        return <p>Loading...</p>; // Показываем заглушку, если данные ещё не загружены
    }

    return (
        <main className={styles.wrapper}>
            <Sidebar collab={collab}/>
            <Content collab={collab}/>
            <Chat collab={collab} />
        </main>

    )
}
