import {axiosClassic, axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/api/api.config'
import {TaskInterface} from "@/shared/types/task.interface";


class TaskService {

    async getTask(taskId: number) {
        const { data: task } = await axiosClassic<TaskInterface>({
            url: API_URL.task(`/${taskId}`),
            method: 'GET'
        })
        return task
    }




}

export const taskService = new TaskService()
