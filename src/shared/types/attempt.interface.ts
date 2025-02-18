export interface AttemptInterface {
    userAnswer: string,
    collabId: number,
    userId: number,
    isPassed: boolean,
    output: (number | string)[]; // input может быть массивом чисел или строк
}


