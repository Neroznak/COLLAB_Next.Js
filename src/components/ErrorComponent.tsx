import React from "react";

interface ErrorComponentProps {
    code: number;
    message400: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ code, message400 }) => {
    let message;
    switch (code) {
        case 400:
            message = message400;
            break;
        case 401:
            message = "Вы не авторизированы.";
            break;
        case 403:
            message = "У вас нет доступа к этому ресурсу.";
            break;
        case 404:
            message = "Страница не найдена.";
            break;
        case 500:
            message = "Ошибка сервера. Попробуйте позже.";
            break;
        default:
            message = "Что-то пошло не так.";
    }

    return (
        <div className="flex h-screen w-screen justify-items-center ">
            <div className="bg-white rounded flex w-full h-full flex-col justify-center items-center">
                <h1 className={"text-3xl"}>Упс....</h1>
                <h3 className="text-lg font-bold ">Ошибка {code}</h3>
                <p>{message}</p>

            </div>
        </div>
    );
};

export default ErrorComponent;
