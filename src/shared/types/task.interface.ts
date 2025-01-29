export interface TaskInterface {
    id: number
    title: string
    content: string
    isDeleted: boolean
    category: string
    difficulty:string
    answer:string
    author:string
    name: string
    TaskTheory: ITaskTheory[];
}

export interface ITaskTheory {
    Theory: ITheory
}

export interface ITheory {
    id: number
    content: string
}



