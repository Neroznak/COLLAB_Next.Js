import { useState } from "react";
import styles from "./AvatarWithMic.module.scss";

type AvatarWithMicProps = {
    avatarUrl: string; // URL изображения аватарки
};

const AvatarWithMic: React.FC<AvatarWithMicProps> = ({ avatarUrl }) => {
    const [micActive, setMicActive] = useState(true); // true — зелёный, false — красный

    const toggleMic = () => {
        setMicActive((prevState) => !prevState);
    };

    return (
        <div className={styles.avatarContainer}>
            <div  className={styles.avatar}>User</div>
            <div
                className={`${styles.micIcon} ${
                    micActive ? styles.micGreen : styles.micRed
                }`}
                onClick={toggleMic}
            >Цыц</div>
        </div>
    );
};

export default AvatarWithMic;
