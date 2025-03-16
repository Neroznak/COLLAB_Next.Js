"use client"

import styles from "@/app/collab/[collabHash]/Collab.module.scss";
import * as React from "react";
import {useEffect,  useState} from "react";
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
import {TaskInterface} from "@/shared/types/task.interface";
import {taskService} from "@/services/task.service";
import {AttemptInterface} from "@/shared/types/attempt.interface";
import {Socket} from "socket.io-client";
import {attemptService} from "@/services/attempt.service";

export const Content: React.FC<CollabProps> = ({collab, user}) => {

    const [task, setTask] = useState<TaskInterface | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>(task?.initial_data || "");
    const [attempt, setAttempt] = useState<AttemptInterface>();


    // Получаем Task
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

    // Отправляет запрос попытки выполнить задание
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Предотвращаем перезагрузку страницы
        try {
            // Отправляем данные на сервер
            const response = await attemptService.execute(userAnswer, collab.hash, user.id)
            setAttempt(response);
        } catch (error) {
            console.error("Произошла ошибка:", error);
        }
    };

    // Когда initial_data прогружается - вставляет в поле ответа к заданию
    useEffect(() => {
        if (task?.initial_data) {
            setUserAnswer(task.initial_data);
        }
    }, [task]);


    return (
        <div className={styles.content} id="container">
            <div className={"flex justify-between"}>
                <div className={"flex pt-2 pl-4"}>
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
            </div>
            <div className={"flex flex-col pl-4"}>
                <div className={"flex flex-wrap text-2xl font-bold"}>{task?.name}
                </div>
                <p className={"flex text-gray-500 text-xs"}>Автор задания: {task?.author}</p>
            </div>
            <div>
                <div className={styles.task} dangerouslySetInnerHTML={{__html: task?.content || ''}}>
                </div>
                <div className={styles.result}>
                    {/*<p className={"text-2xl font-bold mb-2 "}>Answer</p>*/}
                    <form onSubmit={handleSubmit}>
                        <CodeMirror
                            value={userAnswer}
                            className={"overflow-x-auto border bg-violet-200 rounded-2xl "}
                            minHeight="100px"
                            extensions={[javascript({jsx: true})]}
                            onChange={(userAnswer) => {
                                setUserAnswer(userAnswer);
                            }}
                        />
                        <button type="submit" className={"mt-2 w-16 text-sm h-8 font-light"}>Go</button>
                    </form>

                    {(attempt) ? (
                        <div className="result">
                            <p>
                                <strong>Output:</strong> {attempt?.output}
                            </p>
                            <p style={{color: attempt?.isPassed ? "green" : "red"}}>
                                <strong>{attempt?.isPassed ? "Passed" : "Failed"}</strong>
                            </p>
                        </div>
                    ) : (<div></div>)}
                </div>
            </div>
        </div>
    )
}