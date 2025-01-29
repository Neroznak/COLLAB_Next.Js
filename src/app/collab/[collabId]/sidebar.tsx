"use client"

import styles from "@/app/collab/[collabId]/Collab.module.scss";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import * as React from "react";
import {Zain} from "@next/font/google";
import {CollabProps} from "@/shared/types/collab.interface";

const zain = Zain({
    subsets: ['latin'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
    weight: ['400', '700'], // Укажите нужные веса шрифта
});



export const Sidebar: React.FC<CollabProps> = ({collab}) => {

    // const [micActive, setMicActive] = useState(false); // Изначально микрофон выключен
    // useEffect(() => {
    //     // Проверка, что код выполняется только на клиенте
    //     if (typeof window !== "undefined") {
    //         const micIcon = document.getElementById("mic-icon");
    //         if (micIcon) {
    //             micIcon.addEventListener("click", () => setMicActive(prevState => !prevState));
    //         }
    //         return () => {
    //             if (micIcon) {
    //                 micIcon.removeEventListener("click", () => setMicActive(prevState => !prevState));
    //             }
    //         };
    //     }
    // }, []);
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo_font}>
                <p className={zain.className}>Collabster</p>
            </div>
            <div className={styles.avatar_container}>
                {collab?.user.map((collabUser) => (
                    <div className={styles.avatar_block}>
                        <Avatar>
                            <AvatarImage src={collabUser.User.profilePictureUrl}/>
                        </Avatar>
                        <p className={styles.over_text}>{collabUser.User.userName}</p>
                    </div>
                ))}
                {/*<AvatarWithMic avatarUrl="../../../public/assets/images/avatar.png"/>*/}
            </div>
            <div className={"flex mt-auto mb-4 justify-center w-full text-black text-sm "}><p>04:24</p></div>
            <Link href={"/"}>
                <div className={"flex mt-auto mb-4 justify-center w-full text-black text-sm "}><p>Сдаться</p></div>
            </Link>
        </aside>
    )
}