import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {QuoteInterface} from "@/shared/types/quote.interface";
import {CollabInterface} from "@/shared/types/collab.interface";
import {TaskInterface} from "@/shared/types/task.interface";


class TaskService {

    async getTask(taskId: number) {
        const { data: task } = await axiosClassic<TaskInterface>({
            url: API_URL.task(`/${taskId}`),
            method: 'GET'
        })
        console.log(task)
        return task
    }




}

export const taskService = new TaskService()
