"use client"
import styles from "./Dashboard.module.scss";
import {FC} from 'react';

export const Header: FC = () => {
    return (
        <section className={"flex flex-row"}>
            <div className={"flex ml-6 mt-2 mb-2 bg-white w-48 rounded-lg text-gray-200 items-center pl-3"}>Search</div>
            <div className={"flex mt-2 ml-96"}>
                <p className={" mb-2  ml-96 mr-8"}>ENG</p>
                <p>DMITRII NEROZNAK</p>
            </div>
        </section>

    )};


