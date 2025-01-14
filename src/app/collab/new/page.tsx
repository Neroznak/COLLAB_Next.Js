import styles from "@/app/collab/new/Collab-New.module.scss";

export default function Courses() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.block}>
                <p className={"mb-8"}>New collab</p>
                <form action="" className={"flex flex-col w-full gap-4"}>
                    <div className={"border-b-2"}>
                        <label htmlFor="">Name</label>
                        <input type="text"/>
                    </div>
                    <div className={"border-b-2"}>
                        <label htmlFor="">Language</label>
                        <input type="text"/>
                    </div>
                    <div className={"border-b-2"}>
                        <label htmlFor="">Category</label>
                        <input type="text"/>
                    </div>
                    <div className={"border-b-2"}>
                        <label htmlFor="">Topic</label>
                        <input type="text"/>
                    </div>
                    <button className={"w-36 mt-8"}>Go!</button>
                </form>
            </div>
        </main>
    )
};

