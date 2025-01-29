"use client"

import styles from "@/app/collab/[collabId]/Collab.module.scss";
import * as React from "react";
import {Zain} from "@next/font/google";
import {useEffect, useState} from "react";
import {CollabProps} from "@/shared/types/collab.interface";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {ITheory, TaskInterface} from "@/shared/types/task.interface";
import {taskService} from "@/services/task.service";
import PerfectScrollbar from 'perfect-scrollbar';



export const Content: React.FC<CollabProps> = ({collab}) => {
    const [task, setTask] = useState<TaskInterface | null>(null);
    useEffect(() => {
        const fetchTask = async () => {
            try {
                if (collab?.taskId) { // Убедимся, что collab и taskId не равны null или undefined
                    const fetchedTask = await taskService.getTask(+collab.taskId);
                    setTask(fetchedTask);
                }
            } catch (error) {
                console.error("Ошибка при загрузке задачи:", error);
            }
        };
        fetchTask();
    }, [collab]);
    const [isTheory, setIsTheory] = useState<Boolean>(false);
    const toggleTheory = () => {
        setIsTheory(!isTheory);
    };

    // const container =
    //     document.querySelector('#container');
    // const ps = new PerfectScrollbar(container, {
    //     wheelSpeed: 2,        // Скорость прокрутки колесом
    //     wheelPropagation: true,  // Прокачка колеса мыши
    //     minScrollbarLength: 20  // Минимальная длина полосы прокрутки
    // });
    return (
        <div className={styles.content} id="container">
            <div className={"flex justify-between"}>
                <div className={"flex pt-2 pl-4"}>
                    {/*<p className={"pl-4 font-bold  pt-2 text-xs text-gray-400"}>TypeScript / Junior / </p>*/}
                    {/*<p className={"pl-1  font-bold  pt-2 text-xs"}>Циклы</p>*/}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>{task?.category}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink>{task?.difficulty}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{task?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <button className={"h-8 font-light mr-2 mt-2"}
                        onClick={toggleTheory}>{isTheory ? 'К заданию' : 'К теории'}</button>
            </div>
            <div className={"flex flex-col pl-4"}>
                <div className={"flex flex-wrap text-2xl font-bold"}>{task?.name}

                </div>
                <p className={"flex text-gray-500 text-xs"}>Автор задания: {task?.author}</p>
            </div>
            {!isTheory && (
                <div>
                    <div className={styles.task} dangerouslySetInnerHTML={{__html: task?.content || ''}}>
                    </div>
                    <div className={styles.result}>
                        <p className={"text-2xl font-bold mb-2 "}>Answer</p>
                        <CodeMirror
                            value={task?.answer}
                            className={"overflow-x-auto border bg-violet-200 rounded-2xl "}
                            minHeight="300px"
                            extensions={[javascript({jsx: true})]}
                            onChange={(value, viewUpdate) => {
                                console.log(value);
                            }}
                        />
                        <button className={"mt-2 w-16 text-sm h-8 font-light"}>Go</button>
                    </div>
                </div>
            )}
            {isTheory && (
                <div>
                <div className={styles.theory} dangerouslySetInnerHTML={{__html: task?.TaskTheory[0].Theory.content || ''}}></div>
                </div>
            )}
        </div>
    )
}